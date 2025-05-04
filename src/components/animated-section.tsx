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
  animationClass = 'animate-fade-in-up', // Default animation
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
          // Optional: unobserve after triggering once
          // observer.unobserve(entry.target);
        }
        // Optional: reset animation if scrolled out of view
        // else {
        //   setIsVisible(false);
        // }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        'opacity-0 transition-all duration-700 ease-out', // Start hidden, define transition
        isVisible ? `${animationClass} opacity-100 ${delay}` : 'translate-y-4', // Apply animation and final state if visible
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;

// Add keyframes to globals.css or a dedicated animation CSS file if needed
/* In globals.css or animations.css:
@layer utilities {
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in {
    animation: fadeIn 0.7s ease-out forwards;
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.7s ease-out forwards;
  }
}
*/
