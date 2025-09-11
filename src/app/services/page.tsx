
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accessibility, StretchVertical, Car, Users, Clock, HeartHandshake, ArrowRight, CheckCircle2, Ambulance } from "lucide-react";
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
    icon: <Ambulance className="h-10 w-10 text-primary" />,
    title: "Non-Medical Occasions",
    description: "Reliable transport for various non-medical needs, from social outings to airport trips.",
    href: "/services/non-medical-occasions",
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

const specializations = [
  'Case Management Services',
  'Insurance Claims Services',
  'Workers Compensation Claims',
  'Medical Logistical Coordination',
  'Risk Management Firms',
  'Law Firm Clients',
  'Physical Therapy Centers',
  'Dialysis Patients',
  'Senior Care Facilities',
  'Hospitals',
  'Senior Citizens and Families',
];

export default function ServicesPage() {
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
            Medical Transportation Services
          </h1>
          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto text-lg">
            We are dedicated to providing a comprehensive range of non-emergency medical transportation services to meet the diverse needs of our clients.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {services.map((service, index) => (
            <Link href={service.href} key={index} className="flex">
              <Card className="w-full flex flex-col shadow-lg hover:shadow-xl hover:border-primary/50 transition-all duration-300">
                <CardHeader className="flex flex-col items-center text-center">
                  {service.icon}
                  <CardTitle className="mt-4 text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow text-center">
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
                <div className="p-6 pt-0 text-center">
                   <p className="text-primary font-semibold group-hover:underline">
                    Learn More <ArrowRight className="inline h-4 w-4 transition-transform group-hover:translate-x-1"/>
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
              We Specialize in Transportation For:
            </h2>
          </div>
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {specializations.map((item, index) => (
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
      </div>
    </div>
  );
}

