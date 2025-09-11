import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ContactForm from "@/components/contact-form";

const faqs = [
  {
    question: "What is Non-Emergency Medical Transportation?",
    answer:
      "Non-emergency medical transportation (NEMT) is a service for individuals who need assistance getting to and from medical appointments but do not require emergency medical services. This includes transport for those in wheelchairs, on stretchers, or who are ambulatory but need assistance.",
  },
  {
    question: "How much advance notice do I need to provide before booking a transport?",
    answer:
      "You can book a ride by filling out our online booking form on the 'Booking' page, or by calling us directly. We recommend booking at least 24-48 hours in advance to ensure availability.",
  },
  {
    question: "Can I travel in my own wheelchair?",
    answer:
      "Yes, you can travel in your own wheelchair. Our vehicles are equipped to safely secure standard and bariatric wheelchairs. Please provide the dimensions of your wheelchair when booking.",
  },
  {
    question: "Do you accept insurance?",
    answer:
      "We work with a variety of insurance providers, including Medicaid and private insurance plans. Please contact us with your insurance information so we can verify coverage for our services.",
  },
  {
    question: "What forms of payment do you accept?",
    answer:
      "We accept all major credit cards, checks, and direct billing to insurance providers and facilities. Payment is typically required before the time of service unless other arrangements have been made.",
  },
  {
    question: "What are your hours of operation?",
    answer:
      "Our standard operating hours are Monday - Friday, 6:00 AM to 8:00 PM, and Saturday - Sunday, 8:00 AM to 6:00 PM. We can sometimes accommodate requests outside these hours with advance notice.",
  },
  {
    question: "How much do you charge for transportation?",
    answer:
      "Our rates vary depending on the level of service required (ambulatory, wheelchair, stretcher), the distance of the trip, and any special requirements. Please contact us for a detailed quote.",
  },
  {
    question: "Can my caregiver or a family member ride with me?",
    answer:
      "Yes, in most cases, we can accommodate one additional passenger, such as a family member or caregiver, at no extra cost. Please let us know when you book your ride so we can make the necessary arrangements.",
  },
  {
    question: "Will the driver take me inside? Will the driver stay with me during my appointment?",
    answer:
      "Our standard service is door-to-door. The driver will assist you from your point of origin to the check-in desk at your destination. We do offer a standby service where the driver can wait for you during your appointment for an additional fee.",
  },
];


export default function FaqPage() {
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Find answers to common questions about our services, booking, and more.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <div className="lg:col-span-3">
             <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-background rounded-lg px-4 shadow-sm border">
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
        </div>
      </div>
    </div>
  );
}
