import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import ContactForm from "@/components/contact-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const mapSrc = "https://maps.google.com/maps?q=527%20Ellison%20Ct%20Frederick,%20Md&t=&z=15&ie=UTF8&iwloc=&output=embed";

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
              <a href="tel:+1-617-991-0839" className="text-lg font-semibold text-primary hover:underline">+1 617 991 0839</a>
            </CardContent>
          </Card>
           <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex-row items-center gap-4">
              <Mail className="h-8 w-8 text-primary" />
              <CardTitle>Email</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">For general questions:</p>
              <a href="mailto:bookings@stamerck.com" className="text-lg font-semibold text-primary hover:underline">bookings@stamerck.com</a>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="lg:order-2 space-y-8">
                 <Card className="shadow-lg overflow-hidden">
                    <CardHeader>
                         <CardTitle className="flex items-center gap-3 text-2xl">
                            <MapPin className="h-7 w-7 text-primary" />
                            Our Location
                         </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-1">
                            <h3 className="font-semibold text-lg mb-2">Stamerck HQ</h3>
                            <p className="text-muted-foreground">527 Ellison Ct Frederick, Md</p>
                        </div>
                        <div className="md:col-span-2 relative min-h-[300px] rounded-lg overflow-hidden border">
                          <iframe
                            width="100%"
                            height="100%"
                            className="absolute inset-0"
                            title="Stamerck Location"
                            src={mapSrc}
                          ></iframe>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl">
                           <Send className="h-7 w-7 text-primary" />
                           Subscribe to Our Newsletter
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">Stay up-to-date with our latest news, services, and special offers.</p>
                        <div className="flex w-full items-center space-x-2">
                            <Input type="email" placeholder="Enter your email" />
                            <Button type="submit">Subscribe</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:order-1">
                <ContactForm />
            </div>
        </div>

      </div>
    </div>
  );
}
