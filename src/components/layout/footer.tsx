import Link from 'next/link';
import { Stethoscope, Phone, Mail, MapPin } from 'lucide-react';

const footerLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About Us', href: '/about' },
  { name: 'Book Now', href: '/booking' },
  { name: 'FAQ', href: '/faq' },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Stethoscope className="h-8 w-8 text-primary" />
              <span className="font-headline text-xl font-bold">Stamerck</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Providing reliable and compassionate non-emergency medical transportation.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                <a href="tel:1-800-123-4567" className="text-muted-foreground hover:text-primary">1-800-123-4567</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                <a href="mailto:contact@stamerck.com" className="text-muted-foreground hover:text-primary">contact@stamerck.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                <p className="text-muted-foreground">123 Health St, Medtown, USA</p>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Operating Hours</h3>
            <p className="text-sm text-muted-foreground">
              Monday - Friday: 6:00 AM - 8:00 PM
              <br />
              Saturday - Sunday: 8:00 AM - 6:00 PM
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Stamerck Transport. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
