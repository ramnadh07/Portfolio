
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar, Linkedin, Mail, Lightbulb, Users, Briefcase, Sparkles } from "lucide-react"; // Replaced SquareAsterisk with Sparkles
import { cn } from "@/lib/utils";

const FloatingActions: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    // Show button if user scrolls down more than 300px
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 transition-opacity duration-300 ease-in-out",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="lg" // Larger main button
            className="rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 w-16 h-16 flex items-center justify-center animate-pulse hover:animate-none" // Circular and pulsing
            aria-label="Quick Actions"
          >
            <Sparkles className="h-6 w-6" /> {/* Changed icon to Sparkles */}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2 rounded-lg shadow-xl bg-popover border border-border/50 mr-4 mb-1">
          <div className="flex flex-col space-y-2">
             {/* Schedule a Call Options */}
             <Popover>
                 <PopoverTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start px-3 py-2 text-sm hover:bg-accent/50">
                        <Calendar className="mr-2 h-4 w-4 text-accent" />
                        Schedule Call
                    </Button>
                 </PopoverTrigger>
                 <PopoverContent side="left" align="start" className="w-auto p-2 rounded-md shadow-lg bg-popover border border-border/40 ml-2">
                    <div className="flex flex-col space-y-1">
                        <Button variant="ghost" size="sm" asChild className="w-full justify-start text-xs px-2 py-1 hover:bg-accent/40">
                            <Link href="https://calendly.com/your-link/mentoring" target="_blank" rel="noopener noreferrer">
                                <Users className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                                Mentoring Session
                            </Link>
                        </Button>
                         <Button variant="ghost" size="sm" asChild className="w-full justify-start text-xs px-2 py-1 hover:bg-accent/40">
                            <Link href="https://calendly.com/your-link/consulting" target="_blank" rel="noopener noreferrer">
                                <Briefcase className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                                Consulting Inquiry
                            </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild className="w-full justify-start text-xs px-2 py-1 hover:bg-accent/40">
                            <Link href="https://calendly.com/your-link/general" target="_blank" rel="noopener noreferrer">
                                <Lightbulb className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                                General Discussion
                            </Link>
                        </Button>
                    </div>
                 </PopoverContent>
             </Popover>


            {/* Other Actions */}
            <Button variant="ghost" asChild className="w-full justify-start px-3 py-2 text-sm hover:bg-accent/50">
              <Link href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-4 w-4 text-accent" />
                Connect on LinkedIn
              </Link>
            </Button>
            <Button variant="ghost" asChild className="w-full justify-start px-3 py-2 text-sm hover:bg-accent/50">
              <Link href="mailto:your.email@example.com">
                <Mail className="mr-2 h-4 w-4 text-accent" />
                Send an Email
              </Link>
            </Button>
             {/* Add more relevant buttons here if specified */}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FloatingActions;

    
