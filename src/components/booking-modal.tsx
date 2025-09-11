'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BookingForm from "@/components/booking-form";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from './ui/button';

interface BookingModalProps {
    children: React.ReactNode;
}

export function BookingModal({ children }: BookingModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-bold font-headline">Request a Quote</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh] pr-6">
            <BookingForm onSuccess={() => setIsOpen(false)} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
