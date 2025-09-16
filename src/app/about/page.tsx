import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Quote } from "lucide-react";

const aboutImage = PlaceHolderImages.find(img => img.id === 'about-us-team');

// CEO information
const ceo = {
  name: 'Solomon Byaruhanga',
  role: 'Chief Executive Officer & Founder',
  image: '/ceo-photo.jpg',
  description: 'With over 10 years of experience in transportation services and 9 years dedicated to serving people with disabilities, Solomon brings unparalleled expertise and compassion to medical transport. As an immigrant who has built his life through resilience and determination, he understands the challenges people face in accessing essential services. His deep commitment to safe, reliable, and courteous service stems from a genuine love for serving others and ensuring that transportation is never a barrier to healthcare. Solomon\'s background as a community leader and author reflects his passion for making meaningful connections and sharing perspectives that matter. At Stamerck Enterprise, he has created more than a transportation company—he has built a bridge to healthcare access, driven by empathy and anchored in excellence.'
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
          
          <div className="max-w-6xl mx-auto">
            {/* CEO Information */}
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">{ceo.name}</h3>
              <p className="text-primary font-semibold text-lg sm:text-xl mb-6">{ceo.role}</p>
              <div className="max-w-4xl mx-auto">
                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                  {ceo.description}
                </p>
              </div>
            </div>
            
            {/* CEO Images Flexbox Layout - First Image Larger */}
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
              {/* Main Featured Image - Larger */}
              <div className="flex-1 lg:flex-[2]">
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <div className="relative h-80 sm:h-96 lg:h-[500px] w-full bg-white">
                    <Image
                      src={ceo.image}
                      alt={`${ceo.name} - Professional Portrait`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority
                    />
                  </div>
                </Card>
              </div>
              
              {/* Smaller Images Container */}
              <div className="flex flex-col gap-4 lg:gap-6 flex-1">
                {/* Portrait Image 2 */}
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex-1">
                  <div className="relative h-60 sm:h-72 lg:h-60 w-full bg-white">
                    <Image
                      src="/ceo-portrait2.jpg"
                      alt={`${ceo.name} - Professional Event Portrait`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                </Card>
                
                {/* Vehicle Image */}
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex-1">
                  <div className="relative h-60 sm:h-72 lg:h-[228px] w-full bg-white">
                    <Image
                      src="/ceo-vehicle.jpg"
                      alt={`${ceo.name} - CEO with Transportation Vehicle`}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
