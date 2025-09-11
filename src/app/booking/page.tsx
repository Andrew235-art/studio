import BookingForm from '@/components/booking-form';

export default function BookingPage() {
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
              Book Your Transport
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              Fill out the form below to request a ride or make an inquiry. Our AI assistant can help answer your questions and suggest services.
            </p>
          </div>
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
