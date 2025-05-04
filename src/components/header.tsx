import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User, Briefcase, Layers3, Mail, Shapes, GraduationCap, HeartHandshake, Diamond } from "lucide-react"; // Added GraduationCap, HeartHandshake, Diamond

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/85"> {/* Increased opacity */}
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2 group transition-transform duration-300 ease-out hover:scale-105">
          {/* Replace RNLogo with Diamond Icon */}
          <Diamond className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[5deg]" />
          <span className="font-bold text-foreground hidden sm:inline-block">
            {/* Change text to Ram Nadh */}
            Ram Nadh
          </span>
        </Link>
        <nav className="flex items-center space-x-1"> {/* Adjusted spacing */}
          {/* Navigation Buttons - Wrap Link children in Fragment */}
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

          {/* Contact Button - Wrap Link children in Fragment */}
          <Button variant="outline" size="sm" asChild className="ml-2 border-accent text-accent hover:bg-accent/10 hover:text-accent transition-colors duration-200 px-3 group">
            <Link href="mailto:your.email@example.com"> {/* Updated email */}
              <>
                <Mail className="h-4 w-4 sm:mr-1.5 transition-transform duration-200 group-hover:scale-110" />
                <span className="hidden sm:inline">Contact</span>
              </>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
