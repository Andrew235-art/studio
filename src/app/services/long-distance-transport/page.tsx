
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function LongDistanceTransportPage() {
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-4">
              Long Distance Transport
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Stamerck Enterprise provides safe and comfortable non-emergency medical transportation for long-distance and out-of-state trips. Whether you're relocating, visiting a specialist, or need to travel for any medical reason, we ensure a smooth journey from start to finish.
            </p>
            <h2 className="text-2xl font-bold text-foreground mb-3">Service Features:</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-8">
              <li>State-to-state transportation</li>
              <li>Spacious and comfortable vehicles for long journeys</li>
              <li>Coordination with medical facilities</li>
              <li>Highly trained and experienced drivers</li>
              <li>Accommodation for caregivers or family members</li>
            </ul>
            <Link href="/booking">
              <Button size="lg">Book Long Distance Trip</Button>
            </Link>
          </div>
          <div className="relative h-80 lg:h-96 w-full rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
              alt="Comfortable and spacious vehicle for long distance medical transportation"
              fill
              className="object-cover"
              data-ai-hint="long distance medical transport"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
