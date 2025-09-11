import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const mapImage = PlaceHolderImages.find(img => img.id === 'contact-map');

export default function ContactPage() {
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
            Get in Touch
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            We're here to help with all your non-emergency medical transportation needs. Reach out to us anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex-row items-center gap-4">
              <Phone className="h-8 w-8 text-primary" />
              <CardTitle>Phone</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">For bookings and inquiries:</p>
              <a href="tel:1-800-123-4567" className="text-lg font-semibold text-primary hover:underline">1-800-123-4567</a>
            </CardContent>
          </Card>
           <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex-row items-center gap-4">
              <Mail className="h-8 w-8 text-primary" />
              <CardTitle>Email</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">For general questions:</p>
              <a href="mailto:contact@stamerck.com" className="text-lg font-semibold text-primary hover:underline">contact@stamerck.com</a>
            </CardContent>
          </Card>
           <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex-row items-center gap-4">
              <Clock className="h-8 w-8 text-primary" />
              <CardTitle>Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground font-medium">Mon - Fri: 6am - 8pm</p>
              <p className="text-muted-foreground font-medium">Sat - Sun: 8am - 6pm</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg overflow-hidden">
            <CardHeader>
                 <CardTitle className="flex items-center gap-3 text-2xl">
                    <MapPin className="h-7 w-7 text-primary" />
                    Our Location
                 </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <h3 className="font-semibold text-lg mb-2">Stamerck Transport HQ</h3>
                    <p className="text-muted-foreground">123 Health St,</p>
                    <p className="text-muted-foreground">Medtown, USA 12345</p>
                </div>
                <div className="md:col-span-2 relative min-h-[300px] rounded-lg overflow-hidden">
                    {mapImage &&
                        <Image
                            src={mapImage.imageUrl}
                            alt={mapImage.description}
                            fill
                            className="object-cover"
                            data-ai-hint={mapImage.imageHint}
                        />
                    }
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
