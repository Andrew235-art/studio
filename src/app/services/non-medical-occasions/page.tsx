
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const occasions = [
  'Doctor Appointments',
  'Physical Therapy',
  'Dialysis Treatment',
  'Outpatient Surgery',
  'Treatment Centers',
  'Social Outings',
  'Airports',
  'Prescription Drug Pick Up',
  'Dental Appointments',
  'Optometrist Visits',
  'Hospital Checkout',
  'Emergency Room Pick Up',
  'Long Distance Transportation',
];

export default function NonMedicalOccasionsPage() {
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-4">
              Transportation for All Occasions
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Life doesn't stop for medical appointments. We provide reliable, safe transportation for a wide variety of non-medical needs, ensuring you or your loved ones can maintain independence and stay connected with the community.
            </p>
             <Link href="/booking">
              <Button size="lg">Book a Ride</Button>
            </Link>
          </div>
          <div className="relative h-80 lg:h-96 w-full rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://picsum.photos/seed/citydrive/800/600"
              alt="A car driving through a pleasant city scene"
              fill
              className="object-cover"
              data-ai-hint="city driving"
            />
          </div>
        </div>

        <Card className="max-w-4xl mx-auto shadow-lg">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-2xl font-bold text-center mb-8">Our Non-Medical Services Include:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
                {occasions.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle2 className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <p className="text-lg text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
      </div>
    </div>
  );
}
