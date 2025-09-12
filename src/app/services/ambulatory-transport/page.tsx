
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function AmbulatoryTransportPage() {
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-4">
              Ambulatory Transport
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              For clients who are able to walk but may need assistance and support, our ambulatory transport service provides reliable, door-to-door transportation. We ensure you get to your appointments safely and without the stress of navigating traffic or parking.
            </p>
            <h2 className="text-2xl font-bold text-foreground mb-3">Service Features:</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-8">
              <li>Courteous, professional drivers</li>
              <li>Assistance from your door to the vehicle</li>
              <li>Support upon arrival at your destination</li>
              <li>Comfortable and clean vehicles</li>
              <li>Timely and reliable service</li>
            </ul>
            <Link href="/booking">
              <Button size="lg">Book Ambulatory Transport</Button>
            </Link>
          </div>
          <div className="relative h-80 lg:h-96 w-full rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1649495271672-7cc719c7ec55?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Caring driver assisting a client with ambulatory transport"
              fill
              className="object-cover"
              data-ai-hint="assisted walking patient"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
