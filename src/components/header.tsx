
'use client'; // Required for other potential client-side interactions

import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { User, Briefcase, Layers3, Mail, Shapes, GraduationCap, HeartHandshake, Diamond } from 'lucide-react';
import { ThemeToggleButton } from '@/components/theme-toggle-button';


const Header: React.FC = () => {
  const [rating, setRating] = useState<string | null>(null); // Add state for rating
  // Removed date/time state

  // Removed useEffect for date/time updates


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/85">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4">
        {/* Logo and Name Section */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="group">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full focus-visible:ring-1 focus-visible:ring-ring hover:bg-accent/10 p-0 border border-transparent hover:border-accent/30 transition-all duration-300" // Adjusted size and added padding 0
              aria-label="Home"
            >
              {/* Blue Circle Outline */}
              <div className="h-7 w-7 rounded-full border-2 border-accent/50 group-hover:border-accent flex items-center justify-center transition-colors">
                  <Diamond className="h-4 w-4 text-primary transition-all duration-300 group-hover:text-accent group-hover:scale-110 group-hover:rotate-[10deg]" />
              </div>
            </Button>
          </Link>
          {/* Name - Not part of the dropdown */}
          <Link href="/" className="group">
            <span className="font-bold text-foreground hidden sm:inline-block transition-colors duration-300 group-hover:text-accent">
              Ram Nadh
            </span>
          </Link>
        </div>

        {/* Navigation Links & Theme Toggle */}
        <div className="flex items-center space-x-2"> {/* Wrapper for nav and theme toggle */}
            <nav className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground transition-colors duration-200 px-2 sm:px-3">
                <Link href="#about">
                <>
                    <User className="h-4 w-4 sm:mr-1.5" />
                    <span className="hidden sm:inline">About</span>
                </>
                </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground transition-colors duration-200 px-2 sm:px-3">
                <Link href="#skills">
                <>
                    <Layers3 className="h-4 w-4 sm:mr-1.5" />
                    <span className="hidden sm:inline">Skills</span>
                </>
                </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground transition-colors duration-200 px-2 sm:px-3">
                <Link href="#domain-expertise">
                <>
                    <Shapes className="h-4 w-4 sm:mr-1.5" />
                    <span className="hidden sm:inline">Domains</span>
                </>
                </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground transition-colors duration-200 px-2 sm:px-3">
                <Link href="#experience">
                <>
                    <Briefcase className="h-4 w-4 sm:mr-1.5" />
                    <span className="hidden sm:inline">Experience</span>
                </>
                </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground transition-colors duration-200 px-2 sm:px-3">
                <Link href="#education">
                <>
                    <GraduationCap className="h-4 w-4 sm:mr-1.5" />
                    <span className="hidden sm:inline">Education</span>
                </>
                </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground transition-colors duration-200 px-2 sm:px-3">
                <Link href="#projects">
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-grid sm:mr-1.5"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/></svg>
                    <span className="hidden sm:inline">Projects</span>
                </>
                </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground transition-colors duration-200 px-2 sm:px-3">
                <Link href="#social-impact">
                <>
                    <HeartHandshake className="h-4 w-4 sm:mr-1.5" />
                    <span className="hidden sm:inline">Impact</span>
                </>
                </Link>
            </Button>

            {/* Contact Button */}
            <Button variant="outline" size="sm" asChild className="border-accent text-accent hover:bg-accent/10 hover:text-accent transition-colors duration-200 px-3 group">
                <Link href="mailto:brucewyn09@gmail.com">
                <>
                    <Mail className="h-4 w-4 sm:mr-1.5 transition-transform duration-200 group-hover:scale-110" />
                    <span className="hidden sm:inline">Contact</span>
                </>
                </Link>
            </Button>
            </nav>
             <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
};

export default Header;

