
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
            {/* Tip Section */}
            {randomTip && ( // Only render if a tip has been selected on the client
                <AnimatedSection animationClass="animate-fade-in" delay="delay-0"> {/* Added fade-in animation */}
                    <div className="py-4 border-b border-border/30">
                        {/* Removed Card for transparency, applied centering directly */}
                        <div className="container max-w-screen-md mx-auto text-center">
                            {/* Adjusted flex alignment to items-start */}
                            <div className="p-3 text-sm text-muted-foreground flex items-start justify-center gap-2">
                                <Lightbulb className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /> {/* Added margin-top for better alignment */}
                                <span><strong>Quick Tip:</strong> {randomTip}</span>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            )}

            <div className="container flex flex-col items-center justify-between gap-4 py-6 sm:flex-row px-4">
                <p className="text-sm text-muted-foreground text-center sm:text-left">
                    &copy; {currentYear} Ramalingeswara Nadh | Business Analyst & Strategist. Built with Next.js & Tailwind CSS.
                </p>
                <div className="flex space-x-2">
                     <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-foreground transition-all duration-300 ease-out hover:scale-110 hover:bg-muted/50">
                        <Link href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                             <Linkedin className="h-5 w-5" />
                        </Link>
                    </Button>
                    {/* Added Mail icon/link */}
                    <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-foreground transition-all duration-300 ease-out hover:scale-110 hover:bg-muted/50">
                        <Link href="mailto:your.email@example.com" aria-label="Email">
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

