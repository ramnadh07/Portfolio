"use client";
import React from "react";
import Image from "next/image";
import AnimatedSection from "./animated-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutSection: React.FC = () => {
  return (
    <AnimatedSection id="about" className="scroll-mt-16" delay="delay-100">
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-out bg-card border border-border/50 rounded-lg group transform hover:-translate-y-1"> {/* Added group and transform */}
        <div className="grid md:grid-cols-3 items-center">
          {/* Image Column */}
          <div className="md:col-span-1 relative h-64 md:h-full w-full overflow-hidden">
            <Image
              src="https://picsum.photos/600/800"
              alt="Portrait of Your Name"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 ease-out group-hover:scale-105 filter group-hover:brightness-105" // Added filter effect
              data-ai-hint="professional portrait person"
            />
             {/* Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent md:bg-gradient-to-r md:from-card md:via-card/30 md:to-transparent"></div>
          </div>
          {/* Content Column */}
          <div className="md:col-span-2 p-6 md:p-10 lg:p-12">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-3xl md:text-4xl font-semibold text-primary mb-2 transition-colors duration-300 group-hover:text-accent"> {/* Hover color change */}
                About Me
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4 text-base md:text-lg text-foreground leading-relaxed">
              <p>
                Hi, I'm [Your Name], a passionate and detail-oriented [Your Role, e.g., Full-Stack Developer, UI/UX Designer] based in [Your Location]. With a love for clean code, intuitive design, and seamless user experiences, I strive to build digital products that are not only functional but also delightful to use.
              </p>
              <p>
                My journey into [Your Field] started [Briefly describe how you started]. Since then, I've had the opportunity to work on diverse projects, honing my skills in [Mention 2-3 key technologies/areas]. I thrive in collaborative environments and am always eager to learn and adapt to new challenges.
              </p>
              <p>
                When I'm not coding or designing, you can find me [Mention a hobby or interest], exploring new technologies, or contributing to open-source projects.
              </p>
            </CardContent>
          </div>
        </div>
      </Card>
    </AnimatedSection>
  );
};

export default AboutSection;
