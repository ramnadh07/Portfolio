import React from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react"; // Example social icons
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border/40 bg-background">
            <div className="container flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
                <p className="text-sm text-muted-foreground">
                    &copy; {currentYear} Your Name. All rights reserved.
                </p>
                <div className="flex space-x-2">
                     <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-foreground transition-colors">
                        <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <Github className="h-5 w-5" />
                        </Link>
                    </Button>
                     <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-foreground transition-colors">
                        <Link href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <Linkedin className="h-5 w-5" />
                        </Link>
                    </Button>
                     <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-foreground transition-colors">
                        <Link href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                           <Twitter className="h-5 w-5" />
                        </Link>
                    </Button>
                    {/* Add more social links as needed */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
