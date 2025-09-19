
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function WheelchairTransportPage() {
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-4">
              Wheelchair Transport
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              We specialize in providing safe, reliable, and comfortable transportation for clients who use wheelchairs. Our vehicles are fully equipped with ADA-compliant hydraulic lifts and securement systems to ensure a dignified and stress-free travel experience.
            </p>
            <h2 className="text-2xl font-bold text-foreground mb-3">Service Features:</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-8">
              <li>Hydraulic lifts and ramps</li>
              <li>Q'Straint securement systems for safety</li>
              <li>Transport for standard, bariatric, and electric wheelchairs</li>
              <li>Door-to-door service with driver assistance</li>
              <li>Spacious vehicles with room for a caregiver</li>
            </ul>
            <Link href="/booking">
              <Button size="lg">Book Wheelchair Transport</Button>
            </Link>
          </div>
          <div className="space-y-4">
            <div className="relative h-80 lg:h-96 w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/wheelchair-transport-vehicle.jpg"
                alt="Stamerck Enterprise wheelchair accessible vehicle interior showing hydraulic ramp and wheelchair securement area"
                fill
                className="object-contain bg-gray-50"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-48 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/wheelchair-transport-chair.jpg"
                  alt="Professional wheelchair positioned next to Stamerck Enterprise accessible transport vehicle"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/wheelchair-transport-setup.jpg"
                  alt="Close-up view of wheelchair and accessible vehicle setup showing professional equipment"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
