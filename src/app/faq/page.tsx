import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ContactForm from "@/components/contact-form";

const faqs = [
  {
    question: "What is non-emergency medical transportation?",
    answer:
      "Non-emergency medical transportation (NEMT) is a service for individuals who need assistance getting to and from medical appointments but do not require emergency medical services. This includes transport for those in wheelchairs, on stretchers, or who are ambulatory but need assistance.",
  },
  {
    question: "How do I book a ride?",
    answer:
      "You can book a ride by filling out our online booking form on the 'Booking' page, or by calling us directly at +1 617 991 0839. We recommend booking at least 24-48 hours in advance.",
  },
  {
    question: "What areas do you service?",
    answer:
      "We primarily service the Medtown metropolitan area and surrounding counties. We also offer long-distance transportation services. Please contact us to confirm if we service your specific location.",
  },
  {
    question: "Do you accept insurance?",
    answer:
      "We work with a variety of insurance providers, including Medicaid and private insurance plans. Please contact us with your insurance information so we can verify coverage for our services.",
  },
  {
    question: "What are your operating hours?",
    answer:
      "Our standard operating hours are Monday - Friday, 6:00 AM to 8:00 PM, and Saturday - Sunday, 8:00 AM to 6:00 PM. We can sometimes accommodate requests outside these hours with advance notice.",
  },
  {
    question: "Can a family member or caregiver ride along?",
    answer:
      "Yes, in most cases, we can accommodate one additional passenger, such as a family member or caregiver, at no extra cost. Please let us know when you book your ride.",
  },
  {
    question: "Do you provide transportation for non-medical appointments?",
    answer:
      "Yes, in addition to medical appointments, we provide transportation for a variety of needs, including social outings, airport transfers, prescription pick-ups, and more. Our goal is to ensure you have reliable transportation for all important occasions.",
  },
  {
    question: "Can I request a specific driver?",
    answer:
      "While we cannot guarantee a specific driver for every trip due to scheduling and availability, you can certainly make a request. We will do our best to accommodate your preference whenever possible to ensure your comfort and familiarity.",
  },
];

export default function FaqPage() {
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Find answers to common questions about our services, booking, and more.
          </p>
        </div>
        <div className="max-w-6xl mx-auto">
           <Accordion type="single" collapsible className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-background rounded-lg px-4 shadow-sm">
                 <AccordionItem value={`item-${index}`} className="border-b-0">
                    <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                 </AccordionItem>
              </div>
            ))}
          </Accordion>
        </div>
        <div className="max-w-3xl mx-auto mt-24">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                    Still have questions?
                </h2>
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
                    Contact us and we will be happy to help you.
                </p>
            </div>
            <ContactForm />
        </div>
      </div>
    </div>
  );
}
