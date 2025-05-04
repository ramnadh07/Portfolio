
'use client';

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';

const DateTimeDisplay: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);

  useEffect(() => {
    // Update date/time only on the client after mount
    setCurrentDateTime(new Date());
    // Optional: Set an interval to update time every second/minute
    const timerId = setInterval(() => setCurrentDateTime(new Date()), 60000); // Update every minute
    return () => clearInterval(timerId); // Cleanup interval on unmount
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="w-full bg-transparent py-1 border-b border-border/20"> {/* Narrow height, transparent bg, subtle border */}
      <div className="container max-w-screen-2xl mx-auto flex justify-end items-center px-4">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          {currentDateTime ? (
            <>
              <Calendar className="h-3.5 w-3.5" />
              <span>{format(currentDateTime, 'PP')}</span> {/* e.g., Sep 14, 2024 */}
              <Clock className="h-3.5 w-3.5 ml-3" /> {/* Added margin for separation */}
              <span>{format(currentDateTime, 'p')}</span> {/* e.g., 1:30 PM */}
            </>
          ) : (
            // Optional: Show loading state or placeholder
            <span className="animate-pulse">Loading date...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateTimeDisplay;
