
import BookingForm from "@/components/booking-form";

export default function BookingPage() {
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">Request a Quote</h1>
        </div>
        <BookingForm />
      </div>
    </div>
  );
}
