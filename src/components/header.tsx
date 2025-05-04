import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CodeXml, User, Briefcase, Layers3, Mail, Shapes } from "lucide-react"; // Added Shapes icon

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
            <Link href="#domain-expertise" className="text-muted-foreground hover:text-foreground transition-colors">
              <Shapes className="h-4 w-4 sm:mr-1" /> {/* Added Domain Expertise Link */}
              <span className="hidden sm:inline">Domains</span>
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
                {/* Using Layers3 for Projects now as Shapes is taken */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layers-3 sm:mr-1"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>
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
