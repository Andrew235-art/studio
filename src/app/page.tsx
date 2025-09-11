import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, HeartHandshake, ShieldCheck, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-transport-van');

const featureCards = [
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'Safety First',
    description: 'Our top priority is the safety and well-being of our clients. All vehicles are regularly inspected and equipped for safety.',
  },
  {
    icon: <HeartHandshake className="h-10 w-10 text-primary" />,
    title: 'Compassionate Care',
    description: 'We treat every client with the dignity, respect, and compassion they deserve. Our team is trained to provide supportive care.',
  },
  {
    icon: <Car className="h-10 w-10 text-primary" />,
    title: 'Reliable & On-Time',
    description: 'Punctuality is key in medical transport. We pride ourselves on being on time, every time, ensuring you never miss an appointment.',
  },
];

const services = [
    { name: 'Wheelchair Transport', href: '/services' },
    { name: 'Ambulatory Transport', href: '/services' },
    { name: 'Stretcher Services', href: '/services' },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] min-h-[400px] w-full">
        {heroImage &&
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        }
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 animate-fade-in-down">
            Stamerck Transport
          </h1>
          <p className="text-lg md:text-2xl max-w-3xl mb-8 animate-fade-in-up">
            Reliable & Compassionate Non-Emergency Medical Transportation.
          </p>
          <Link href="/booking">
            <Button size="lg" className="animate-fade-in-up">
              Book Your Ride Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
              Your Trusted Partner in Medical Transport
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              We provide safe, comfortable, and reliable non-emergency medical transportation services tailored to your needs.
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

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            We offer a range of transportation solutions to ensure you get to your appointments safely and comfortably.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <div key={index} className="p-6 border rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <Link href={service.href} className="text-primary font-semibold hover:underline">
                  Learn More <ArrowRight className="inline h-4 w-4"/>
                </Link>
              </div>
            ))}
          </div>
          <Link href="/services">
            <Button variant="outline">View All Services</Button>
          </Link>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
            Ready to Schedule Your Transport?
          </h2>
          <p className="max-w-3xl mx-auto mb-8 text-lg">
            Our team is ready to assist you. Book your ride online or contact us for any inquiries.
          </p>
          <div className="flex justify-center gap-4">
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
