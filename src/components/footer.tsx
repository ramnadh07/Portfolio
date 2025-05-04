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
                    &copy; {currentYear} Your Name. Built with Next.js & Tailwind CSS.
                </p>
                <div className="flex space-x-2">
                    {/* Refactored: Wrap Button inside Link */}
                     <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground transition-all duration-300 ease-out hover:scale-110 hover:bg-muted/50"> {/* Enhanced hover effect */}
                                <Github className="h-5 w-5" />
                        </Button>
                    </Link>
                     <Link href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground transition-all duration-300 ease-out hover:scale-110 hover:bg-muted/50"> {/* Enhanced hover effect */}
                                <Linkedin className="h-5 w-5" />
                        </Button>
                    </Link>
                     <Link href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground transition-all duration-300 ease-out hover:scale-110 hover:bg-muted/50"> {/* Enhanced hover effect */}
                           <Twitter className="h-5 w-5" />
                        </Button>
                    </Link>
                    {/* Add more social links as needed */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;

