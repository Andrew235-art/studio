'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '../hooks/use-toast';

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
});

type FormData = z.infer<typeof newsletterSchema>;

export default function NewsletterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to subscribe');
      }

      toast({
        title: 'Successfully Subscribed!',
        description: result.message || 'Thank you for subscribing to our newsletter.',
      });

      form.reset();
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to subscribe. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full items-center space-x-2">
      <Input
        type="email"
        placeholder="Enter your email"
        {...form.register('email')}
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Subscribing...' : 'Subscribe'}
      </Button>
    </form>
  );
}