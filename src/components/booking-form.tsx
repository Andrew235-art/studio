
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { DatePicker } from './date-picker';
import { TimePicker } from './time-picker';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';


const TransportationDetailSchema = z.object({
  id: z.string(),
  label: z.string(),
});

const transportationDetails = [
  { id: 'wheelchair-standard', label: 'Wheelchair-Standard' },
  { id: 'stretcher', label: 'Stretcher' },
  { id: 'ambulatory', label: 'Ambulatory' },
  { id: 'wheelchair-wide', label: 'Wheelchair-Wide' },
  { id: 'leg-extension', label: 'Leg Extension Needed' },
  { id: 'extra-attendant', label: 'Extra Attendant Needed' },
] as const;

const formSchema = z.object({
  contactName: z.string().min(1, 'Contact name is required.'),
  contactPhone: z.string().min(10, 'A valid phone number is required.'),
  tripType: z.string().min(1, 'Trip type is required.'),
  pickupDate: z.date({ required_error: "A pick-up date is required." }),
  pickupTime: z.string().min(1, 'Pick-up time is required.'),
  transportationDetails: z.array(z.string()).optional(),
  notes: z.string().optional(),
  patientName: z.string().min(1, 'Patient name is required.'),
  patientPhone: z.string().min(10, 'A valid patient phone number is required.'),
  pickupAddress: z.string().min(1, 'Pickup address is required.'),
  pickupCity: z.string().min(1, 'Pickup city is required.'),
  pickupZip: z.string().min(5, 'A valid zip code is required.'),
  pickupPhone: z.string().min(10, 'A valid phone number is required.'),
  destinationAddress: z.string().min(1, 'Destination address is required.'),
  destinationCity: z.string().min(1, 'Destination city is required.'),
  destinationZip: z.string().min(5, 'A valid zip code is required.'),
  confirmationEmail: z.string().email('A valid email is required.'),
});

type FormData = z.infer<typeof formSchema>;

const FormSectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="relative my-6">
        <Separator className="absolute inset-y-1/2" />
        <h2 className="relative text-center bg-white px-4 text-lg font-semibold text-foreground w-fit mx-auto">{children}</h2>
    </div>
);

export default function BookingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactName: '',
      contactPhone: '',
      tripType: '',
      notes: '',
      patientName: '',
      patientPhone: '',
      pickupAddress: '',
      pickupCity: '',
      pickupZip: '',
      pickupPhone: '',
      destinationAddress: '',
      destinationCity: '',
      destinationZip: '',
      confirmationEmail: '',
      transportationDetails: [],
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    console.log('Form submitted:', values);

    toast({
      title: 'Booking Request Sent!',
      description: 'Thank you for your request. We will review the details and get back to you with a quote shortly.',
    });
    
    form.reset();
    router.push('/');
  }

  return (
    <>
        <div className="text-center mb-8">
            <p className="font-bold text-destructive">*This form must be submitted 24 Hours in advance of the appointment for a quote and to be scheduled*</p>
            <p className="text-muted-foreground mt-2 text-sm">Please fill out the form completely. Please note that an extra attendant (two-man) is required if the customer weighs more than 180lbs or if there are more than two stairs involved.</p>
        </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormSectionTitle>TRIP INFORMATION</FormSectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="contactName" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Contact Name*</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="contactPhone" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Contact Phone</FormLabel>
                        <FormControl><Input type="tel" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="tripType" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Trip Type*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger><SelectValue placeholder="Select Trip Type" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="one-way">One-Way</SelectItem>
                                <SelectItem value="round-trip">Round-Trip</SelectItem>
                                <SelectItem value="multi-destination">Multi-Destination</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />
                <div></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <FormField control={form.control} name="pickupDate" render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel>Requested Pick-up Date*</FormLabel>
                        <DatePicker field={field} />
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="pickupTime" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Requested Pick-up Time*</FormLabel>
                        <FormControl><TimePicker field={field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>

            <FormSectionTitle>TRANSPORTATION DETAILS</FormSectionTitle>
            <FormField
              control={form.control}
              name="transportationDetails"
              render={() => (
                <FormItem>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {transportationDetails.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="transportationDetails"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), item.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField control={form.control} name="notes" render={({ field }) => (
              <FormItem>
                  <FormLabel>Notes/Special Needs/Et cetera:</FormLabel>
                  <FormControl><Textarea className="min-h-[100px]" {...field} /></FormControl>
                  <FormMessage />
              </FormItem>
          )} />
          
            <FormSectionTitle>PATIENT INFORMATION</FormSectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="patientName" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Patient Name*</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="patientPhone" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Patient Phone #*</FormLabel>
                        <FormControl><Input type="tel" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
          
            <FormSectionTitle>PICK UP ADDRESS</FormSectionTitle>
            <FormField control={form.control} name="pickupAddress" render={({ field }) => (
                <FormItem>
                    <FormLabel>Address*</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="pickupCity" render={({ field }) => (
                    <FormItem>
                        <FormLabel>City*</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="pickupZip" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Zip Code*</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
             <FormField control={form.control} name="pickupPhone" render={({ field }) => (
                <FormItem>
                    <FormLabel>Phone #*</FormLabel>
                    <FormControl><Input type="tel" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />

            <FormSectionTitle>DESTINATION ADDRESS</FormSectionTitle>
            <FormField control={form.control} name="destinationAddress" render={({ field }) => (
                <FormItem>
                    <FormLabel>Address*</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="destinationCity" render={({ field }) => (
                    <FormItem>
                        <FormLabel>City*</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="destinationZip" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Zip Code*</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>

            <FormField control={form.control} name="confirmationEmail" render={({ field }) => (
              <FormItem>
                  <FormLabel>Confirmation Email Address</FormLabel>
                  <FormControl><Input type="email" {...field} /></FormControl>
                  <FormMessage />
              </FormItem>
            )} />
          
            <div className="pt-6">
                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                    </>
                    ) : 'Submit Request'}
                </Button>
            </div>
            
             <div className="text-center pt-6">
                <h3 className="font-bold text-foreground">IMPORTANT: CANCELATION POLICY</h3>
                <p className="text-muted-foreground mt-2 text-sm max-w-2xl mx-auto">Passengers are encouraged to cancel scheduled rides at least 24 hours in advance if possible. Any cancellation received later than 24 hours prior to the scheduled pick-up will be considered a late cancellation</p>
            </div>
        </form>
      </Form>
    </>
  );
}
