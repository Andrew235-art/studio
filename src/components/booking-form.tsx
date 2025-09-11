'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { handleInquiry } from '@/app/booking/actions';
import type { AIInquiryAssistantOutput } from '@/ai/flows/ai-inquiry-assistant';
import { Loader2, Wand2 } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  pickupAddress: z.string().min(5, { message: 'Please enter a valid pickup address.' }),
  dropoffAddress: z.string().min(5, { message: 'Please enter a valid drop-off address.' }),
  appointmentDateTime: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  inquiry: z.string().min(10, { message: 'Please describe your needs in at least 10 characters.' }),
});

type FormData = z.infer<typeof formSchema>;

export default function BookingForm() {
  const [aiResponse, setAiResponse] = useState<AIInquiryAssistantOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      pickupAddress: '',
      dropoffAddress: '',
      appointmentDateTime: '',
      inquiry: '',
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setAiResponse(null);
    try {
      const response = await handleInquiry({ inquiry: values.inquiry });
      setAiResponse(response);
    } catch (error) {
      console.error('Error handling inquiry:', error);
      // Here you could use a toast notification to show an error to the user
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Card className="shadow-lg">
        <CardContent className="p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="(123) 456-7890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="pickupAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pickup Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St, Anytown" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dropoffAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Drop-off Address</FormLabel>
                      <FormControl>
                        <Input placeholder="456 Health Ave, Medcity" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="appointmentDateTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Appointment Date & Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="inquiry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Requirements & Inquiry</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'I need transport for a wheelchair user to a dialysis appointment. Are there any extra fees?'"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Getting AI Assistance...
                  </>
                ) : (
                  <>
                    Submit Request & Get AI Help
                    <Wand2 className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
         <Card className="mt-8 animate-pulse">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Wand2 className="mr-2 h-5 w-5" />
                    AI Assistant is thinking...
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-full mt-4"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
            </CardContent>
        </Card>
      )}

      {aiResponse && (
        <Card className="mt-8 bg-muted border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Wand2 className="mr-3 h-6 w-6 text-primary" />
              AI-Enhanced Response
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            <h3 className="font-semibold">Response to Your Inquiry:</h3>
            <p>{aiResponse.response}</p>
            <h3 className="font-semibold mt-6">Suggested Additional Services:</h3>
            <p>{aiResponse.suggestedServices}</p>
          </CardContent>
        </Card>
      )}
    </>
  );
}
