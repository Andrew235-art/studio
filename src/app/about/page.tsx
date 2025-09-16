import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Quote } from "lucide-react";

const aboutImage = PlaceHolderImages.find(img => img.id === 'about-us-team');

// CEO information - awaiting details to be provided
const ceo = {
  name: 'CEO Name', // To be updated with actual name
  role: 'Chief Executive Officer',
  image: '/ceo-photo.jpg',
  description: 'Professional description to be added based on provided inspiration text.'
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
            About Stamerck Enterprise
          </h1>
          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto text-lg">
            Connecting our community to healthcare with compassion, one ride at a time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="prose lg:prose-lg max-w-none text-muted-foreground">
            <h2 className="text-3xl font-headline font-bold text-foreground">Our Mission & Vision</h2>
            <p>
              Our mission is to provide safe, reliable, and compassionate non-emergency medical transportation. We strive to ensure that all members of our community have access to their necessary medical care with dignity and comfort.
            </p>
            <p>
              We envision a community where transportation is never a barrier to health and well-being, where every individual feels supported and cared for during their journey.
            </p>
             <Card className="bg-muted border-l-4 border-primary mt-6">
                <CardContent className="pt-6">
                  <Quote className="h-8 w-8 text-primary mb-2" />
                  <p className="font-semibold italic text-foreground">
                    "We started Stamerck Enterprise with a simple goal: to treat every client like family. That means being on time, ensuring safety, and offering a friendly face."
                  </p>
                  <p className="text-right mt-2 text-sm">- John Doe, Founder</p>
                </CardContent>
            </Card>
          </div>
          {aboutImage &&
            <div className="relative h-80 lg:h-full w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                fill
                className="object-cover"
                data-ai-hint={aboutImage.imageHint}
              />
            </div>
          }
        </div>

        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground mb-4">
            Meet Our CEO
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Leadership driven by experience, compassion, and commitment to excellence.
          </p>
          
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden shadow-xl bg-gradient-to-br from-white to-gray-50">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-80 lg:h-96 w-full">
                  <Image
                    src={ceo.image}
                    alt={`${ceo.name}, ${ceo.role}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-8 lg:p-12 flex flex-col justify-center text-left">
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">{ceo.name}</h3>
                  <p className="text-primary font-semibold text-lg mb-6">{ceo.role}</p>
                  <p className="text-muted-foreground leading-relaxed">
                    {ceo.description}
                  </p>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
