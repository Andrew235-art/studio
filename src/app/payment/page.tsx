
import PaymentForm from "@/components/payment-form";

export default function PaymentPage() {
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">Make a Payment</h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Please enter your payment details below. All transactions are secure.
            </p>
        </div>
        <PaymentForm />
      </div>
    </div>
  );
}
