"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import AnimatedSection from "./animated-section";
import Link from "next/link";

const HeroSection: React.FC = () => {
  return (
    <AnimatedSection
      id="hero"
      className="min-h-[calc(80vh)] flex flex-col items-center justify-center text-center py-16 md:py-24 lg:py-32"
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-foreground">
        Your Name
      </h1>
      <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-8 max-w-3xl">
        Creative Developer & Designer specializing in building elegant and performant web experiences.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300 ease-out">
          <Link href="#projects">View My Work</Link>
        </Button>
        <Button variant="outline" size="lg" asChild className="text-muted-foreground hover:text-foreground hover:border-foreground transition-colors duration-300 ease-out group">
           <Link href="#contact" aria-label="Scroll down to contact section"> {/* Replace #contact with actual contact section id or mailto link */}
            Contact Me
            <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform duration-300 ease-out" />
           </Link>
        </Button>
      </div>
      {/* Optional: Subtle animated graphic or background element */}
    </AnimatedSection>
  );
};

export default HeroSection;
