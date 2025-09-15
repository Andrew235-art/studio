
'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import Logo from '../logo';

const footerLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About Us', href: '/about' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'Careers', href: '/careers' },
  { name: 'Book Now', href: '/booking' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Make a Payment', href: '/payment'},
];

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-primary text-primary-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start space-y-4">
             <Link href="/">
                <Logo />
             </Link>
            <p className="text-primary-foreground/80 text-sm max-w-xs px-4 sm:px-0">
              Providing reliable and compassionate non-emergency medical transportation.
            </p>
          </div>
          <div className="sm:text-center lg:text-left">
            <h3 className="font-semibold text-primary-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-primary-foreground mb-4 w-full">Contact Us</h3>
            <ul className="space-y-3 text-sm flex flex-col items-center md:items-start">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-0.5 text-primary-foreground flex-shrink-0" />
                <a href="tel:+1-617-991-0839" className="text-primary-foreground/80 hover:text-primary-foreground">+1 617 991 0839</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-0.5 text-primary-foreground flex-shrink-0" />
                <a href="mailto:bookings@stamerck.com" className="text-primary-foreground/80 hover:text-primary-foreground">bookings@stamerck.com</a>
              </li>
              <li className="flex items-start gap-3 max-w-xs mx-auto sm:mx-0">
                <MapPin className="h-5 w-5 mt-0.5 text-primary-foreground flex-shrink-0" />
                <p className="text-primary-foreground/80">527 Ellison Ct Frederick, Md</p>
              </li>
            </ul>
          </div>
          <div className="sm:text-center lg:text-left">
            <h3 className="font-semibold text-primary-foreground mb-4">Operating Hours</h3>
            <p className="text-sm text-primary-foreground/80">
              Monday - Friday: 6:00 AM - 8:00 PM
              <br />
              Saturday - Sunday: 8:00 AM - 6:00 PM
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/80">
           <p suppressHydrationWarning>&copy; {currentYear || new Date().getFullYear()} Stamerck Enterprise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
