import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is non-emergency medical transportation?",
    answer:
      "Non-emergency medical transportation (NEMT) is a service for individuals who need assistance getting to and from medical appointments but do not require emergency medical services. This includes transport for those in wheelchairs, on stretchers, or who are ambulatory but need assistance.",
  },
  {
    question: "How do I book a ride?",
    answer:
      "You can book a ride by filling out our online booking form on the 'Booking' page, or by calling us directly at 1-800-123-4567. We recommend booking at least 24-48 hours in advance.",
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
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-background rounded-lg mb-4 px-4 shadow-sm">
                <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
