import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CodeXml, User, Briefcase, Layers3, Mail } from "lucide-react"; // Corrected import

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <CodeXml className="h-6 w-6 text-primary transition-transform group-hover:rotate-[15deg]" />
          <span className="font-bold text-foreground hidden sm:inline-block">
            Elegant Folio
          </span>
        </Link>
        <nav className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              <User className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">About</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="#skills" className="text-muted-foreground hover:text-foreground transition-colors">
              <Layers3 className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">Skills</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="#experience" className="text-muted-foreground hover:text-foreground transition-colors">
              <Briefcase className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">Experience</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
                {/* Placeholder icon as Layers3 is used for Skills */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lightbulb sm:mr-1"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
              <span className="hidden sm:inline">Projects</span>
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild className="ml-2 border-accent text-accent hover:bg-accent/10 hover:text-accent">
            <Link href="mailto:your.email@example.com">
              <Mail className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">Contact</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
