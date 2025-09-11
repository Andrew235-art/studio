
'use client';

import Link from 'next/link';
import { Ambulance, Phone, Mail, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

const footerLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About Us', href: '/about' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'Careers', href: '/careers' },
  { name: 'Book Now', href: '/booking' },
  { name: 'FAQ', href: '/faq' },
];

export default function Footer() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start">
            <Link href="/" className="flex items-center gap-2 mb-2">
              <Ambulance className="h-8 w-8 text-primary" />
              <div>
                <span className="font-headline text-xl font-bold">Stamerck</span>
                <p className="text-xs text-primary font-medium -mt-1">Reliable Medical Transport</p>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs px-4 sm:px-0">
              Providing reliable and compassionate non-emergency medical transportation.
            </p>
          </div>
          <div className="sm:text-center lg:text-left">
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
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-semibold mb-4 w-full">Contact Us</h3>
            <ul className="space-y-3 text-sm flex flex-col items-center sm:items-start">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                <a href="tel:+1-617-991-0839" className="text-muted-foreground hover:text-primary">+1 617 991 0839</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                <a href="mailto:bookings@stamerck.com" className="text-muted-foreground hover:text-primary">bookings@stamerck.com</a>
              </li>
              <li className="flex items-start gap-3 max-w-xs mx-auto sm:mx-0">
                <MapPin className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                <p className="text-muted-foreground">527 Ellison Ct Frederick, Md</p>
              </li>
            </ul>
          </div>
          <div className="sm:text-center lg:text-left">
            <h3 className="font-semibold mb-4">Operating Hours</h3>
            <p className="text-sm text-muted-foreground">
              Monday - Friday: 6:00 AM - 8:00 PM
              <br />
              Saturday - Sunday: 8:00 AM - 6:00 PM
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
           {isMounted && <p>&copy; {currentYear} Stamerck. All rights reserved.</p>}
        </div>
      </div>
    </footer>
  );
}
