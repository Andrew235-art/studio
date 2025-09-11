import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accessibility, StretchVertical, Car, Users, Clock, HeartHandshake, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: <Accessibility className="h-10 w-10 text-primary" />,
    title: "Wheelchair Accessible Transport",
    description: "Safe and comfortable transport for clients in wheelchairs, with hydraulic lifts and securement systems.",
    href: "/services/wheelchair-transport",
  },
  {
    icon: <StretchVertical className="h-10 w-10 text-primary" />,
    title: "Stretcher/Gurney Transport",
    description: "For clients who must remain in a supine position, ensuring a safe and smooth journey.",
    href: "/services/stretcher-transport",
  },
  {
    icon: <Car className="h-10 w-10 text-primary" />,
    title: "Ambulatory Transport",
    description: "Door-to-door support for clients who can walk but may need some assistance.",
    href: "/services/ambulatory-transport",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Bariatric Transport",
    description: "Specialized vehicles and equipment to safely and comfortably accommodate bariatric clients.",
    href: "/services/wheelchair-transport", // Or a dedicated page if needed
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: "Long-Distance Transport",
    description: "Comfortable and reliable transport for out-of-town and state-to-state medical needs.",
    href: "/services/long-distance-transport",
  },
  {
    icon: <HeartHandshake className="h-10 w-10 text-primary" />,
    title: "Standby Services",
    description: "Drivers can remain on standby during appointments for immediate return transport.",
    href: "/contact",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
            Our Services
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            We are dedicated to providing a comprehensive range of non-emergency medical transportation services to meet the diverse needs of our clients.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link href={service.href} key={index} className="flex">
              <Card className="w-full flex flex-col shadow-lg hover:shadow-xl hover:border-primary/50 transition-all duration-300">
                <CardHeader className="flex flex-col items-center text-center">
                  {service.icon}
                  <CardTitle className="mt-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow text-center">
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
                <div className="p-6 pt-0 text-center">
                   <p className="text-primary font-semibold hover:underline">
                    Learn More <ArrowRight className="inline h-4 w-4"/>
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
