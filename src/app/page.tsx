
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, HeartHandshake, ShieldCheck, ArrowRight, UserCheck, CalendarCheck, Map, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const featureCards = [
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'Safe & Secure',
    description: 'We prioritize your safety with rigorously maintained, fully equipped vehicles and trained professionals, ensuring a secure and comfortable journey every time.',
  },
  {
    icon: <HeartHandshake className="h-10 w-10 text-primary" />,
    title: 'Compassionate Care',
    description: 'Our team is dedicated to providing respectful, empathetic, and dignified transportation. We treat every client like family, offering supportive care tailored to your needs.',
  },
  {
    icon: <Car className="h-10 w-10 text-primary" />,
    title: 'Reliable & On-Time',
    description: 'Punctuality is crucial. We pride ourselves on timely service, ensuring you arrive at your important medical appointments without stress or delay.',
  },
];

const services = [
    { name: 'Wheelchair Transport', href: '/services/wheelchair-transport', description: 'Safe, comfortable transport for clients requiring wheelchairs.' },
    { name: 'Ambulatory Transport', href: '/services/ambulatory-transport', description: 'Door-to-door assistance for those who can walk but need a hand.' },
    { name: 'Stretcher Services', href: '/services/stretcher-transport', description: 'For clients who must remain in a supine position during transport.' },
    { name: 'Bariatric Transport', href: '/services/wheelchair-transport', description: 'Specialized vehicles to accommodate bariatric clients with dignity.' },
    { name: 'Long-Distance Trips', href: '/services/long-distance-transport', description: 'Comfortable and safe transport for out-of-town medical needs.' },
    { name: 'Standby Services', href: '/contact', description: 'We can wait on-site to provide immediate return transport.' },
];

const howItWorks = [
  {
    icon: <CalendarCheck className="h-10 w-10 text-primary" />,
    title: '1. Book Your Ride',
    description: 'Use our simple online form or call us to schedule your transport. Provide your details, and we\'ll handle the rest.'
  },
  {
    icon: <UserCheck className="h-10 w-10 text-primary" />,
    title: '2. Get Matched',
    description: 'We match your needs with the right vehicle and a trained, compassionate driver to ensure a perfect fit.'
  },
  {
    icon: <Map className="h-10 w-10 text-primary" />,
    title: '3. Ride with Confidence',
    description: 'Your driver arrives on time to provide safe, door-to-door service, getting you to your destination comfortably.'
  }
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

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] min-h-[400px] w-full">
        
          <Image
            src="https://picsum.photos/seed/van/2070/1380"
            alt="A fleet of modern ambulance vans ready for service."
            fill
            className="object-cover"
            data-ai-hint="ambulance van"
            priority
          />
        
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold mb-4 animate-fade-in-down">
            Beyond Transportation, We Deliver Care
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mb-8 animate-fade-in-up">
            Your trusted partner for safe, reliable, and compassionate non-emergency medical transportation.
          </p>
          <Link href="/booking">
            <Button size="lg" className="animate-fade-in-up">
              Book Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
              High-Quality Transportation for Every Community
            </h2>
            <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
              We are committed to removing transportation barriers, ensuring everyone has access to necessary healthcare with dignity and unparalleled support.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureCards.map((card, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex items-center justify-center">
                  {card.icon}
                  <CardTitle className="mt-4">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

       <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground mb-4">
            How It Works
          </h2>
           <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            A simple, streamlined process for your peace of mind.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <Card key={index} className="text-center p-6 bg-gray-50/50">
                  {step.icon}
                  <h3 className="text-xl font-bold mt-4 mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>


      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground mb-4">
            Our Diverse Transportation Services
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-12">
            We offer a comprehensive suite of transportation solutions to ensure you get to your appointments safely, comfortably, and on time.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <Card key={index} className="p-6 text-left hover:bg-white transition-colors shadow-sm hover:shadow-lg">
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <Link href={service.href} className="text-primary font-semibold hover:underline">
                  Learn More <ArrowRight className="inline h-4 w-4"/>
                </Link>
              </Card>
            ))}
          </div>
          <Link href="/services">
            <Button variant="outline" size="lg">Explore All Services</Button>
          </Link>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
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
      </section>

      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
              Transportation for All Occasions
            </h2>
            <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
              From critical medical appointments to social outings, we provide reliable transport for a variety of non-medical needs.
            </p>
          </div>
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardContent className="p-8 md:p-12">
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
      </section>

      <section className="bg-primary text-primary-foreground py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
            Ready to Schedule Your Ride?
          </h2>
          <p className="max-w-3xl mx-auto mb-8 text-lg">
            Our team is standing by to assist you. Book online in minutes or contact us for any inquiries. Let us provide the care you deserve.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/booking">
                <Button size="lg" variant="secondary">Book Now</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

    