
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Loader2, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  cardholderName: z.string().min(1, 'Cardholder name is required.'),
  cardNumber: z.string().regex(/^\d{16}$/, 'A valid 16-digit card number is required.'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry date must be in MM/YY format.'),
  cvv: z.string().regex(/^\d{3,4}$/, 'A valid 3 or 4-digit CVV is required.'),
  billingAddress: z.string().min(1, 'Billing address is required.'),
  billingCity: z.string().min(1, 'City is required.'),
  billingState: z.string().min(2, 'A valid state is required.').max(2, 'A valid state is required.'),
  billingZip: z.string().min(5, 'A valid zip code is required.'),
  amount: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().positive('Amount must be positive.')
  ),
});

type FormData = z.infer<typeof formSchema>;

const FormSectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="relative my-6">
        <Separator className="absolute inset-y-1/2" />
        <h2 className="relative text-center bg-white px-4 text-lg font-semibold text-foreground w-fit mx-auto">{children}</h2>
    </div>
);

const PaymentMethodIcons = () => (
  <div className="flex items-center justify-center space-x-2 my-4">
    <div className="w-12 h-8 rounded-md border flex items-center justify-center bg-gray-100">
      <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" width="30" height="24" aria-labelledby="pi-visa"><title id="pi-visa">Visa</title><g fill="none" fillRule="evenodd"><path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.3 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3z" fill="#E5E5E5" opacity=".07"></path><path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" fill="#FFF"></path><path d="M13.2 16.8c0-.6.3-1.1.9-1.4.6-.3 1.4-.5 2.5-.5.9 0 1.6.1 2.2.3.6.2.9.5 1.1.8.2.3.3.6.3 1 0 .6-.2 1.1-.7 1.4-.5.3-1.2.5-2.1.5-.8 0-1.5-.1-2.1-.3-.6-.2-1.1-.5-1.3-.9-.2-.4-.3-.8-.3-1.3zm-3.9.1c0 1.1.4 2 1.2 2.7.8.6 1.9 1 3.2 1 1.5 0 2.8-.4 3.9-1.1V13.2c-1.3-.8-2.6-1.2-4.1-1.2-1.3 0-2.3.4-3.1 1.1-.8.7-1.2 1.7-1.2 2.8zm11.4-.4c.3-.3.4-.6.4-1 0-.3-.1-.6-.3-.8-.2-.2-.5-.3-.9-.3-.4 0-.7.1-.9.3-.2.2-.3.5-.3.8 0 .4.1.7.4 1 .2.2.5.3.8.3.4 0 .7-.1.8-.3zm-1.8-8.6l-2.1 8.2h2.2l.4-1.8h2.4l.2 1.8h2.1l-2-8.2h-3.2zm11.3 6.9c.3-.3.5-.7.5-1.2 0-1.2-.8-1.8-2.3-1.8-.6 0-1.1.1-1.5.3l.6 3c.3.1.6.2.9.2.6 0 1-.2 1.2-.5zm-4.4.4l1.1-4.8c.4-.2.8-.3 1.3-.3 1.4 0 2.3.6 2.3 1.9 0 .6-.2 1.1-.6 1.4l-1.3.8c-.5.3-.8.6-1 .8l-.6 1.2h-1.2z" fill="#142688"></path></g></svg>
    </div>
    <div className="w-12 h-8 rounded-md border flex items-center justify-center bg-gray-100">
      <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" width="30" height="24" aria-labelledby="pi-mastercard"><title id="pi-mastercard">Mastercard</title><circle fill="#EB001B" cx="15" cy="12" r="7"></circle><circle fill="#F79E1B" cx="23" cy="12" r="7"></circle><path fill="#FF5F00" d="M22 12c0-3.9-3.1-7-7-7s-7 3.1-7 7 3.1 7 7 7 7-3.1 7-7z"></path></svg>
    </div>
    <div className="w-12 h-8 rounded-md border flex items-center justify-center bg-gray-100">
      <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" width="30" height="24" aria-labelledby="pi-amex"><title id="pi-amex">American Express</title><path fill="#0077C8" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.3 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3z"></path><path fill="#FFF" d="M11.9 15.7h2.9l2.2-7.3h-2.9L11.9 15.7zm1.3-4.5l-2 4.5h-2.1L12 8.4h5.2l2.4 7.3h-2.1L16 11.2h-2.8zM24.8 15.7h-2.5l-.9-2.5h-3.4l-.9 2.5h-2.5L18.1 8.4h3.2l3.5 7.3zm-3.4-3.8l-1-2.9-1 2.9h2z"></path></svg>
    </div>
    <div className="w-12 h-8 rounded-md border flex items-center justify-center bg-gray-100">
      <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" width="30" height="24" aria-labelledby="pi-discover"><title id="pi-discover">Discover</title><path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.3 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3z" fill="#F47B20"></path><path d="M12.4 12.1c0-1.2 1.1-2.2 2.5-2.2s2.5 1 2.5 2.2c0 1.2-1.1 2.2-2.5 2.2s-2.5-1-2.5-2.2m-3.2.1c0 2.9 2.6 5.2 5.7 5.2s5.7-2.3 5.7-5.2c0-2.9-2.6-5.2-5.7-5.2-3.1 0-5.7 2.3-5.7 5.2m19.6-5.2h-3.2v10.3h3.2V6.9z" fill="#FFF"></path></svg>
    </div>
  </div>
);

export default function PaymentForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardholderName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      billingAddress: '',
      billingCity: '',
      billingState: '',
      billingZip: '',
      amount: 0.00,
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    console.log('Form submitted:', values);

    toast({
      title: 'Payment Successful!',
      description: `Thank you for your payment of $${values.amount.toFixed(2)}.`,
    });
    
    form.reset();
    router.push('/');
  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
            <FormSectionTitle>PAYMENT DETAILS</FormSectionTitle>

            <PaymentMethodIcons />

            <FormField control={form.control} name="amount" render={({ field }) => (
                <FormItem>
                    <FormLabel>Amount <span className="text-red-500">*</span></FormLabel>
                    <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />

             <FormField control={form.control} name="cardholderName" render={({ field }) => (
                <FormItem>
                    <FormLabel>Cardholder Name <span className="text-red-500">*</span></FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />

            <FormField control={form.control} name="cardNumber" render={({ field }) => (
                <FormItem>
                    <FormLabel>Card Number <span className="text-red-500">*</span></FormLabel>
                    <div className="relative">
                        <FormControl><Input type="tel" maxLength={16} {...field} className="pr-12" /></FormControl>
                        <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                    <FormMessage />
                </FormItem>
            )} />

            <div className="grid grid-cols-2 gap-6">
                <FormField control={form.control} name="expiryDate" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Expiry Date (MM/YY) <span className="text-red-500">*</span></FormLabel>
                        <FormControl><Input placeholder="MM/YY" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="cvv" render={({ field }) => (
                    <FormItem>
                        <FormLabel>CVV <span className="text-red-500">*</span></FormLabel>
                        <FormControl><Input type="tel" maxLength={4} {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>

            <FormSectionTitle>BILLING ADDRESS</FormSectionTitle>

            <FormField control={form.control} name="billingAddress" render={({ field }) => (
                <FormItem>
                    <FormLabel>Address <span className="text-red-500">*</span></FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                 <FormField control={form.control} name="billingCity" render={({ field }) => (
                    <FormItem className="sm:col-span-1">
                        <FormLabel>City <span className="text-red-500">*</span></FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                 <FormField control={form.control} name="billingState" render={({ field }) => (
                    <FormItem>
                        <FormLabel>State <span className="text-red-500">*</span></FormLabel>
                        <FormControl><Input maxLength={2} {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                 <FormField control={form.control} name="billingZip" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Zip Code <span className="text-red-500">*</span></FormLabel>
                        <FormControl><Input type="tel" maxLength={5} {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>

            <div className="pt-6">
                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                    </>
                    ) : 'Submit Payment'}
                </Button>
            </div>
        </form>
      </Form>
  );
}
