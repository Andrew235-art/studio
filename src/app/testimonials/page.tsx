import { Card, CardContent } from "@/components/ui/card";
import { Star, StarHalf } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const testimonials = [
  {
    name: "Mary Johnson",
    role: "Client",
    testimonial: "Stamerck has been a lifesaver for my mother's appointments. They are always on time, professional, and so caring. I can't recommend them enough!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    name: "David Chen",
    role: "Son of Client",
    testimonial: "The drivers are incredibly patient and understanding. They make my father feel safe and comfortable on every trip. A truly first-class service.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=2"
  },
  {
    name: "Sarah Williams",
    role: "Client",
    testimonial: "Booking is so easy, and the team is always accommodating, even with last-minute schedule changes. Reliable and stress-free.",
    rating: 5,
     avatar: "https://i.pravatar.cc/150?img=3"
  },
  {
    name: "Robert Brown",
    role: "Dialysis Patient",
    testimonial: "I use Stamerck three times a week for my dialysis appointments. They've never once been late. The vehicles are clean and comfortable.",
    rating: 4.5,
     avatar: "https://i.pravatar.cc/150?img=4"
  },
  {
    name: "Emily Davis",
    role: "Daughter of Client",
    testimonial: "Finding reliable transport for my mom's wheelchair was a challenge until we found Stamerck. Their team is professional, and the vehicles are perfectly equipped.",
    rating: 5,
     avatar: "https://i.pravatar.cc/150?img=5"
  },
   {
    name: "Michael Rodriguez",
    role: "Client",
    testimonial: "Excellent service from start to finish. The booking process was simple, and the driver was friendly and professional. I felt very well taken care of.",
    rating: 5,
     avatar: "https://i.pravatar.cc/150?img=6"
  }
];

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />);
    } else if (i - 0.5 === rating) {
      stars.push(<StarHalf key={i} className="h-5 w-5 text-yellow-400 fill-current" />);
    } else {
      stars.push(<Star key={i} className="h-5 w-5 text-gray-300" />);
    }
  }
  return stars;
};

export default function TestimonialsPage() {
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
            What Our Clients Say
          </h1>
          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto text-lg">
            We are proud to serve our community and are grateful for the trust our clients place in us. Here's what they have to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{testimonial.testimonial}"</p>
              </CardContent>
               <div className="bg-muted p-4 flex items-center gap-4">
                 <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
