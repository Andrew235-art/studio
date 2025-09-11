import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accessibility, StretchVertical, Car, Users, Clock, HeartHandshake } from "lucide-react";

const services = [
  {
    icon: <Accessibility className="h-10 w-10 text-primary" />,
    title: "Wheelchair Accessible Transport",
    description: "Our vehicles are fully equipped with hydraulic lifts and securement systems to provide safe and comfortable transportation for clients in wheelchairs.",
  },
  {
    icon: <StretchVertical className="h-10 w-10 text-primary" />,
    title: "Stretcher/Gurney Transport",
    description: "For clients who are unable to sit upright, we offer stretcher services with trained personnel to ensure a smooth and safe journey.",
  },
  {
    icon: <Car className="h-10 w-10 text-primary" />,
    title: "Ambulatory Transport",
    description: "For clients who can walk but may need some assistance, our ambulatory service provides door-to-door support for appointments and errands.",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Bariatric Transport",
    description: "We have specialized vehicles and equipment to safely and comfortably accommodate bariatric clients with dignity and respect.",
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: "Long-Distance Transport",
    description: "We offer non-emergency medical transport for long-distance trips, ensuring comfort and care throughout the entire journey, state-to-state.",
  },
  {
    icon: <HeartHandshake className="h-10 w-10 text-primary" />,
    title: "Standby Services",
    description: "Our team can remain on standby during appointments or procedures to provide immediate transportation once the client is ready to return.",
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
            <Card key={index} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-col items-center text-center">
                {service.icon}
                <CardTitle className="mt-4">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow text-center">
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
