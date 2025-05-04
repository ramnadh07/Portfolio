
'use client'; // Required for useState, useEffect and DropdownMenu interaction

import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'; // Import Dropdown components
import { User, Briefcase, Layers3, Mail, Shapes, GraduationCap, HeartHandshake, Diamond, TrendingDown, TrendingUp, Calendar, Clock } from 'lucide-react'; // Added Calendar, Clock icons
import { format } from 'date-fns'; // Import date-fns for formatting

const Header: React.FC = () => {
  const [rating, setRating] = useState<string | null>(null); // Add state for rating
  const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);

  useEffect(() => {
    // Update date/time only on the client after mount
    setCurrentDateTime(new Date());
    // Optional: Set an interval to update time every second/minute
    const timerId = setInterval(() => setCurrentDateTime(new Date()), 60000); // Update every minute
    return () => clearInterval(timerId); // Cleanup interval on unmount
  }, []); // Empty dependency array ensures this runs once on mount


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/85">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4">
        {/* Logo and Name Section */}
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {/* Using a button as the trigger area around the icon */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full focus-visible:ring-1 focus-visible:ring-ring hover:bg-accent/10 p-0 border border-transparent hover:border-accent/30 transition-all duration-300" // Adjusted size and added padding 0
                aria-label="Rate Portfolio"
              >
                {/* Blue Circle Outline */}
                <div className="h-7 w-7 rounded-full border-2 border-accent/50 group-hover:border-accent flex items-center justify-center transition-colors">
                    <Diamond className="h-4 w-4 text-primary transition-all duration-300 group-hover:text-accent group-hover:scale-110 group-hover:rotate-[10deg]" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            {/* Adjusted Dropdown Width and Transparency */}
            <DropdownMenuContent align="start" className="w-40 bg-popover/90 backdrop-blur-sm"> {/* Reduced width, added transparency */}
              <DropdownMenuLabel className="text-sm font-medium">Rate this Portfolio</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* Radio group for rating */}
              <DropdownMenuRadioGroup value={rating ?? ""} onValueChange={setRating} className="px-1 py-1">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
                  <DropdownMenuRadioItem
                    key={value}
                    value={String(value)}
                    className={
                        `flex justify-between items-center cursor-pointer text-xs py-1 px-2 rounded-sm
                         ${rating === String(value) ? 'bg-accent/20 text-accent-foreground' : 'hover:bg-accent/10'}` // Highlight selected, adjusted padding/text size
                    }
                  >
                    <span>{value}</span>
                    {/* Icons for Low/High */}
                    {value === 1 && <TrendingDown className="h-3 w-3 text-muted-foreground ml-2" />}
                    {value === 10 && <TrendingUp className="h-3 w-3 text-muted-foreground ml-2" />}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
              {/* Optional: Add a submit button or handle rating state */}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Name - Not part of the dropdown */}
          <Link href="/" className="group">
            <span className="font-bold text-foreground hidden sm:inline-block transition-colors duration-300 group-hover:text-accent">
              Ram Nadh
            </span>
          </Link>
        </div>

        {/* Navigation Links & Date/Time */}
        <div className="flex items-center space-x-4"> {/* Wrapper for nav and date/time */}
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
            <Button variant="outline" size="sm" asChild className="ml-2 border-accent text-accent hover:bg-accent/10 hover:text-accent transition-colors duration-200 px-3 group">
                <Link href="mailto:your.email@example.com">
                <>
                    <Mail className="h-4 w-4 sm:mr-1.5 transition-transform duration-200 group-hover:scale-110" />
                    <span className="hidden sm:inline">Contact</span>
                </>
                </Link>
            </Button>
            </nav>

             {/* Date and Time Display */}
             <div className="hidden md:flex items-center space-x-2 text-xs text-muted-foreground">
                {currentDateTime ? (
                    <>
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{format(currentDateTime, 'PP')}</span>
                        <Clock className="h-3.5 w-3.5" />
                        <span>{format(currentDateTime, 'p')}</span>
                    </>
                ) : (
                    // Optional: Show loading state or placeholder
                    <span>Loading date...</span>
                )}
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
