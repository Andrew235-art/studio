import BookingForm from '@/components/booking-form';

export default function BookingPage() {
  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
