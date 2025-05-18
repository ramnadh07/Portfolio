
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar, Linkedin, Mail, Lightbulb, Users, Briefcase, Sparkles, Share2, FileText } from "lucide-react"; // Removed Download icon
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast"; // Import useToast

const FloatingActions: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast(); // Initialize toast

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

  const handleReferProfile = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied!",
          description: "Profile link copied to clipboard.",
        });
      } else {
          // Fallback for older browsers or insecure contexts
          const textArea = document.createElement("textarea");
          textArea.value = window.location.href;
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          try {
            document.execCommand('copy');
             toast({
              title: "Link Copied!",
              description: "Profile link copied to clipboard.",
            });
          } catch (err) {
             toast({
              title: "Copy Failed",
              description: "Could not copy link automatically. Please copy it manually.",
              variant: "destructive",
            });
          }
          document.body.removeChild(textArea);
      }
    } catch (err) {
       toast({
        title: "Copy Failed",
        description: "Could not copy link. Please try again or copy manually.",
        variant: "destructive",
      });
      console.error("Failed to copy text: ", err);
    }
  };

  // Function to handle opening mail client for freelance inquiry
  const handleFreelanceInquiry = () => {
    const email = "brucewyn09@gmail.com"; // Updated email
    const subject = "Freelance/Contract Inquiry";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  };


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
                        {/* Add payment gateway link or info if applicable */}
                         {/* <Button variant="ghost" size="sm" disabled className="w-full justify-start text-xs px-2 py-1 text-muted-foreground italic">
                           (Payment required for some sessions)
                         </Button> */}
                    </div>
                 </PopoverContent>
             </Popover>

             {/* Removed Download PDF Button */}

             {/* Refer Profile */}
             <Button
                variant="ghost"
                className="w-full justify-start px-3 py-2 text-sm hover:bg-accent/50"
                onClick={handleReferProfile}
             >
                <Share2 className="mr-2 h-4 w-4 text-accent" />
                Refer Profile
             </Button>

             {/* Freelance/Contract Inquiry - Updated to open mailto link */}
             <Button
                variant="ghost"
                className="w-full justify-start px-3 py-2 text-sm hover:bg-accent/50"
                onClick={handleFreelanceInquiry}
             >
                <FileText className="mr-2 h-4 w-4 text-accent" />
                Freelance/Contract Inquiry
             </Button>


            {/* Other Existing Actions */}
            <Button variant="ghost" asChild className="w-full justify-start px-3 py-2 text-sm hover:bg-accent/50">
              <Link href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-4 w-4 text-accent" />
                Connect on LinkedIn
              </Link>
            </Button>
            <Button variant="ghost" asChild className="w-full justify-start px-3 py-2 text-sm hover:bg-accent/50">
              <Link href="mailto:brucewyn09@gmail.com">
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
