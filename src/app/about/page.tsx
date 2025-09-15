import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Quote } from "lucide-react";

const aboutImage = PlaceHolderImages.find(img => img.id === 'about-us-team');
const teamMember1 = PlaceHolderImages.find(img => img.id === 'team-member-1');
const teamMember2 = PlaceHolderImages.find(img => img.id === 'team-member-2');
const teamMember3 = PlaceHolderImages.find(img => img.id === 'team-member-3');

const team = [
  { name: 'John Doe', role: 'Founder & CEO', image: teamMember1 },
  { name: 'Jane Smith', role: 'Operations Manager', image: teamMember2 },
  { name: 'Samuel Green', role: 'Lead Driver', image: teamMember3 },
];

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
            Meet Our Team
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            The dedicated professionals behind our trusted services.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                {member.image &&
                  <div className="relative h-64 w-full">
                    <Image
                      src={member.image.imageUrl}
                      alt={member.image.description}
                      fill
                      className="object-cover"
                      data-ai-hint={member.image.imageHint}
                    />
                  </div>
                }
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
