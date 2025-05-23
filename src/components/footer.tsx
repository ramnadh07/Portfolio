
"use client"; // Needed for useState and useEffect

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Linkedin, Mail, Lightbulb } from "lucide-react"; // Import Mail, removed Github/Twitter
import { Button } from "@/components/ui/button";
import AnimatedSection from "./animated-section"; // Import AnimatedSection

const interestingTips = [
  "Continuous learning is key: dedicate time each week to explore new tools, techniques, or industry trends.",
  "Effective communication bridges the gap between business needs and technical solutions. Practice active listening.",
  "Understanding the 'why' behind a requirement is often more important than the 'what'.",
  "Don't underestimate the power of visualization. Process maps and diagrams clarify complexity.",
  "Stakeholder analysis isn't a one-time task; revisit it as the project evolves.",
  "Embrace ambiguity; it's often where the most valuable analysis begins.",
  "Prioritization is crucial. Focus on delivering the highest value features first.",
  "Seek feedback early and often. It's cheaper to fix a misunderstanding on paper than in code.",
  "Document decisions, not just requirements. This provides context for future changes.",
  "Build strong relationships with your technical team; collaboration is essential for success.",
];

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const [randomTip, setRandomTip] = useState<string | null>(null);

     useEffect(() => {
        // Select a random tip only on the client-side after hydration
        const randomIndex = Math.floor(Math.random() * interestingTips.length);
        setRandomTip(interestingTips[randomIndex]);
    }, []); // Empty dependency array ensures this runs once on mount


    return (
        <footer className="border-t border-border/40 bg-background/95 mt-16">
            {/* Tip Section - Moved above main footer content */}
            {randomTip && ( // Only render if a tip has been selected on the client
                <AnimatedSection animationClass="animate-fade-in" delay="delay-0">
                    {/* Container for the tip, ensuring transparent background and no borders */}
                    <div className="container max-w-screen-md mx-auto text-center py-4 bg-transparent"> {/* Ensured transparent background */}
                        {/* Ensured flex items-start for top alignment */}
                        <div className="p-3 text-sm text-muted-foreground flex items-start justify-center gap-2">
                            <Lightbulb className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /> {/* Keeps icon aligned with first line */}
                            <span><strong>Tip of the Hour:</strong> {randomTip}</span> {/* Renamed from "Quick Tip" */}
                        </div>
                    </div>
                </AnimatedSection>
            )}

            {/* Main Footer Content - Added top border */}
            <div className="container flex flex-col items-center justify-between gap-4 py-6 sm:flex-row px-4 border-t border-border/30">
                <p className="text-sm text-muted-foreground text-center sm:text-left">
                    &copy; {currentYear} Ramalingeswara Nadh | Business Analyst & Strategist.
                </p>
                <div className="flex space-x-2">
                     <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-foreground transition-all duration-300 ease-out hover:scale-110 hover:bg-muted/50">
                        <Link href="https://www.linkedin.com/in/ramnadh2002" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                             <Linkedin className="h-5 w-5" />
                        </Link>
                    </Button>
                    {/* Added Mail icon/link */}
                    <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-foreground transition-all duration-300 ease-out hover:scale-110 hover:bg-muted/50">
                        <Link
                            href="mailto:ramnadh2002@gmail.com"
                            aria-label="Email"
                            onClick={() => window.location.href = 'mailto:ramnadh2002@gmail.com'}

                        >
 <Mail className="h-5 w-5" />
                        </Link>
                    </Button>
                    {/* Removed GitHub and Twitter icons */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
