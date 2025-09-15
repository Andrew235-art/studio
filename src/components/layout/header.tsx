
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import Logo from '../logo';


const navLinks = [
  { name: 'Home', href: '/' },
  {
    name: 'Services',
    href: '/services',
    sublinks: [
      { name: 'Wheelchair Transport', href: '/services/wheelchair-transport'},
      { name: 'Stretcher Transport', href: '/services/stretcher-transport'},
      { name: 'Ambulatory Transport', href: '/services/ambulatory-transport'},
      { name: 'Long Distance Transport', href: '/services/long-distance-transport'},
      { name: 'Non-Medical Occasions', href: '/services/non-medical-occasions'},
    ]
  },
  { name: 'About Us', href: '/about' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'Careers', href: '/careers' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-10 w-10 text-primary" />
          <div>
            <span className="font-headline text-xl font-bold tracking-tight">STAMERCK</span>
             <span className="font-headline text-xl font-bold text-primary">ENTERPRISE</span>
            <p className="text-xs text-muted-foreground font-medium -mt-1">...Safety Rides on Angels Wings</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            link.sublinks ? (
              <DropdownMenu key={link.href}>
                <DropdownMenuTrigger asChild>
                   <button className={cn(
                      'flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none',
                      pathname.startsWith(link.href) ? 'text-primary' : 'text-muted-foreground'
                    )}>
                      {link.name}
                      <ChevronDown className="h-4 w-4" />
                   </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                   <DropdownMenuItem asChild>
                      <Link href={link.href}>All Services</Link>
                    </DropdownMenuItem>
                  {link.sublinks.map((sublink) => (
                    <DropdownMenuItem key={sublink.href} asChild>
                      <Link href={sublink.href}>{sublink.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {link.name}
              </Link>
            )
          ))}
        </nav>

        <div className="flex items-center gap-4">
           <Link href="/booking">
             <Button className="hidden md:block">Book Now</Button>
           </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center gap-4 p-4">
            {navLinks.map((link) => (
               <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-lg font-medium transition-colors hover:text-primary w-full text-center py-2 rounded-md',
                  pathname === link.href ? 'bg-muted text-primary' : 'text-foreground'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
             <Link href="/booking" className="w-full">
                <Button className="w-full" onClick={() => setIsMenuOpen(false)}>Book Now</Button>
             </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
