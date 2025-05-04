"use client";

import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  animationClass?: string; // e.g., 'animate-fade-in', 'animate-slide-up'
  delay?: string; // Tailwind delay class, e.g., 'delay-100'
  threshold?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  animationClass = 'animate-fade-in-up', // Default animation remains fadeInUp
  delay = 'delay-0',
  threshold = 0.1, // Trigger animation when 10% visible
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Keep observing in case element scrolls out and back in
          // observer.unobserve(entry.target);
        } else {
           // Optional: Reset animation if element scrolls completely out of view
           // Useful if you want animations to re-trigger on scroll up/down
           // setIsVisible(false);
        }
      },
      { threshold }
    );

    const currentRef = ref.current; // Capture ref value

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]); // Dependency array includes threshold

  return (
    <section // Changed div to section for semantic meaning
      ref={ref}
      className={cn(
        'opacity-0 transition-all duration-700 ease-out', // Start hidden, slightly faster duration
        isVisible ? `${animationClass} opacity-100 ${delay}` : 'translate-y-5', // Apply animation, slightly larger initial Y offset
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export default AnimatedSection;

// Keyframes are now defined in tailwind.config.ts
