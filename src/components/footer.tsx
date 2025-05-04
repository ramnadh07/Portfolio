
import React from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react"; // Example social icons
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border/40 bg-background/95 mt-16"> {/* Added margin-top */}
            <div className="container flex flex-col items-center justify-between gap-4 py-6 sm:flex-row px-4"> {/* Added padding */}
                <p className="text-sm text-muted-foreground text-center sm:text-left">
                     {/* Updated Name and Title */}
                    &copy; {currentYear} Alex Chen | Business Analyst & Strategist. Built with Next.js & Tailwind CSS.
                </p>
                <div className="flex space-x-2">
                    {/* Ensure Link is the single direct child for Buttons with asChild - Wrap Icon in Fragment */}
                     {/* <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-foreground transition-all duration-300 ease-out hover:scale-110 hover:bg-muted/50">
                        <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <Github className="h-5 w-5" />
                        </Link>
                    </Button> */}
                     <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-foreground transition-all duration-300 ease-out hover:scale-110 hover:bg-muted/50">
                        <Link href="https://linkedin.com/in/alexchenbastrategy" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"> {/* Updated LinkedIn URL */}
                             <Linkedin className="h-5 w-5" />
                        </Link>
                    </Button>
                    {/* Optionally keep Twitter or remove if not relevant */}
                     {/* <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-foreground transition-all duration-300 ease-out hover:scale-110 hover:bg-muted/50">
                        <Link href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                           <Twitter className="h-5 w-5" />
                        </Link>
                    </Button> */}
                    {/* Consider adding a link to a BA blog or portfolio if applicable */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
