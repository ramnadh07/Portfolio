
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, MessageSquareQuote, QrCode } from "lucide-react";
import AnimatedSection from "./animated-section";
import Link from "next/link";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";


const HeroSection: React.FC = () => {
  const [aiVisualSrc, setAiVisualSrc] = React.useState<string | null>(null);
  const [isLoadingVisual, setIsLoadingVisual] = React.useState(true);
  const [errorLoadingVisual, setErrorLoadingVisual] = React.useState<string | null>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    async function fetchAiVisual() {
      try {
        setIsLoadingVisual(true);
        setErrorLoadingVisual(null);
        const response = await fetch('/api/generate-hero-visual');
        if (!response.ok) {
          throw new Error('Failed to generate visual. Please try again later.');
        }
        const data = await response.json();
        if (data.imageUrl) {
          setAiVisualSrc(data.imageUrl);
        } else {
          throw new Error(data.error || 'No image URL returned from API.');
        }
      } catch (err: any) {
        setErrorLoadingVisual(err.message || 'An unexpected error occurred.');
        toast({
          title: "Visual Generation Failed",
          description: err.message || "Could not generate the AI visual element.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingVisual(false);
      }
    }
    fetchAiVisual();
  }, [toast]);


  return (
    <AnimatedSection
      id="hero"
      className="min-h-[calc(85vh)] flex flex-col items-center justify-center text-center py-16 md:py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background Boxes */}
      <div className="absolute inset-0 flex -z-20">
        {" "}
        {/* Lower z-index for boxes */}
        {/* Blue side (left 3 boxes), fading towards center */}
        <div className="w-1/6 h-full bg-accent/70"></div>
        <div className="w-1/6 h-full bg-accent/50"></div>
        <div className="w-1/6 h-full bg-accent/30"></div>
        {/* Lavender side (right 3 boxes), fading towards center */}
        <div className="w-1/6 h-full bg-chart-4/30"></div>{" "}
        {/* Using chart-4 for lavender */}
        <div className="w-1/6 h-full bg-chart-4/50"></div>
        <div className="w-1/6 h-full bg-chart-4/70"></div>
      </div>

      {/* Gradient overlay to ensure text readability over the boxes */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/30 via-background/70 to-background"></div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-foreground animate-fade-in drop-shadow-xl">
        Ramalingeswara Nadh
      </h1>
      <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-8 max-w-2xl lg:max-w-3xl animate-fade-in-up delay-100 drop-shadow-md">
        Business Analyst | Functional Consultant | Strategy & GTM Specialist
        driving growth through technology and market insights.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 items-center animate-fade-in-up delay-200">
        <Button
          size="lg"
          asChild
          className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 ease-out shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
        >
          <Link href="#experience">
            <>
              Explore My Experience
              <span className="ml-2 transform transition-transform duration-300 group-hover:rotate-[-5deg]">
                &#10140;
              </span>
            </>
          </Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          asChild
          className="border-accent text-accent hover:bg-accent/10 hover:text-accent transition-all duration-300 ease-out group backdrop-blur-sm transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
        >
          <Link href="#connect" aria-label="Connect">
            <>
              Connect
              <MessageSquareQuote className="ml-2 h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-y-0.5" />
            </>
          </Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          asChild
          className="bg-background/70 backdrop-blur-sm text-foreground hover:text-accent-foreground hover:bg-accent/80 hover:border-accent/80 transition-all duration-300 ease-out group border-border/70 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
        >
          <Link href="mailto:ramnadh2002@gmail.com" aria-label="Contact Me">
            <>
              Contact Me
              <ArrowDown className="ml-2 h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-y-0.5" />
            </>
          </Link>
        </Button>
      </div>

      {/* AI Generated Visual Element / QR Code Placeholder */}
      <div className="absolute bottom-6 right-6 group">
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-lg bg-background/30 backdrop-blur-sm border border-primary/30 shadow-xl flex items-center justify-center overflow-hidden p-1 transition-all duration-300 ease-out group-hover:shadow-2xl group-hover:border-accent group-hover:scale-105">
                {isLoadingVisual && (
                  <div className="animate-pulse flex flex-col items-center justify-center text-muted-foreground">
                    <svg className="animate-spin h-5 w-5 mb-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-xs">Generating...</span>
                  </div>
                )}
                {!isLoadingVisual && errorLoadingVisual && (
                   <div className="text-center text-xs text-destructive p-2">
                    <p>Visual Error</p>
                  </div>
                )}
                {!isLoadingVisual && aiVisualSrc && !errorLoadingVisual && (
                  <Image
                    src={aiVisualSrc}
                    alt="AI Generated Artistic Visual"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md transition-all duration-500 ease-out group-hover:opacity-80"
                  />
                )}
                 <QrCode className="absolute inset-0 m-auto h-8 w-8 text-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-background/80 backdrop-blur-md border-border/50 text-foreground">
              <p className="text-sm">AI-Generated Visual Element</p>
              <p className="text-xs text-muted-foreground">Unique design generated for this session.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {/* Animated Scroll Down Indicator */}
       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce opacity-70 hover:opacity-100 transition-opacity">
          <ArrowDown className="h-6 w-6 text-foreground" />
        </div>
    </AnimatedSection>
  );
};

export default HeroSection;
