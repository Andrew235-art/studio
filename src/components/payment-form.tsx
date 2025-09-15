
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
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    
    // Simulate API call to a payment processor
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
    console.log('Payment submitted:', values);

    toast({
      title: 'Payment Successful!',
      description: `Thank you for your payment of $${values.amount.toFixed(2)}. A confirmation has been sent to your email.`,
    });
    
    form.reset();
    router.push('/');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormSectionTitle>Payment Details</FormSectionTitle>

        <FormField control={form.control} name="amount" render={({ field }) => (
            <FormItem>
                <FormLabel>Payment Amount ($)</FormLabel>
                <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                <FormMessage />
            </FormItem>
        )} />
        
        <FormField control={form.control} name="cardholderName" render={({ field }) => (
            <FormItem>
                <FormLabel>Cardholder Name</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
            </FormItem>
        )} />
        
        <FormField control={form.control} name="cardNumber" render={({ field }) => (
            <FormItem>
                <FormLabel>Card Number</FormLabel>
                <div className="relative">
                    <FormControl><Input type="tel" placeholder="---- ---- ---- ----" {...field} className="pl-10" /></FormControl>
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                <FormMessage />
            </FormItem>
        )} />

        <div className="grid grid-cols-2 gap-6">
            <FormField control={form.control} name="expiryDate" render={({ field }) => (
                <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl><Input placeholder="MM/YY" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="cvv" render={({ field }) => (
                <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl><Input type="tel" placeholder="123" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
        </div>

        <FormSectionTitle>Billing Information</FormSectionTitle>

        <FormField control={form.control} name="billingAddress" render={({ field }) => (
            <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
            </FormItem>
        )} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField control={form.control} name="billingCity" render={({ field }) => (
                <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="billingState" render={({ field }) => (
                <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl><Input placeholder="e.g., MD" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="billingZip" render={({ field }) => (
                <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
        </div>
      
        <div className="pt-6">
            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                </>
                ) : 'Pay Now'}
            </Button>
        </div>
      </form>
    </Form>
  );
}
