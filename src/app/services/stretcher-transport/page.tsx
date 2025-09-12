
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function StretcherTransportPage() {
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-4">
              Stretcher Transport
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Our stretcher transport service is designed for clients who are bed-bound or must remain in a supine position during travel. We provide safe, comfortable, and professional transportation with highly trained personnel to ensure a smooth and secure journey.
            </p>
            <h2 className="text-2xl font-bold text-foreground mb-3">Service Features:</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-8">
              <li>Two-person teams for maximum safety</li>
              <li>Hydraulic lifts and secure stretcher systems</li>
              <li>Continuous monitoring during transport</li>
              <li>Coordination with hospitals and care facilities</li>
              <li>Comfort-focused amenities</li>
            </ul>
            <Link href="/booking">
              <Button size="lg">Book Stretcher Transport</Button>
            </Link>
          </div>
          <div className="relative h-80 lg:h-96 w-full rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://plus.unsplash.com/premium_photo-1663013286034-10e830784135?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Medical professionals safely transporting a patient on a stretcher"
              fill
              className="object-cover"
              data-ai-hint="stretcher transport"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
