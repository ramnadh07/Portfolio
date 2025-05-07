
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, BookOpen, Lightbulb, Share2, Download } from 'lucide-react';

interface VisitorInterestInfoDialogProps {
    children: React.ReactNode; // To allow passing the trigger button
}

const VisitorInterestInfoDialog: React.FC<VisitorInterestInfoDialogProps> = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-background/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <HelpCircle className="h-5 w-5" /> Understanding Visitor Insights
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            This section visualizes simulated data representing the interests and characteristics of visitors engaging with the portfolio.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-4">
           {/* Summary Section */}
           <div className="mb-4 p-4 bg-muted/40 rounded-md border border-border/30">
               <h3 className="flex items-center gap-2 text-base font-semibold mb-2 text-foreground">
                   <BookOpen className="h-4 w-4 text-accent" /> Section Summary
               </h3>
                <p className="text-sm text-muted-foreground">
                    The charts below offer a breakdown of simulated visitor data based on the 'Connect & Business Interest' form submissions. It includes insights into company size, industry focus, common roles, primary needs, and specific skills visitors are interested in. This helps in understanding the audience and tailoring the portfolio presentation.
                </p>
           </div>

          {/* FAQs Section */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base font-semibold hover:no-underline text-foreground">
                 <HelpCircle className="h-4 w-4 mr-2 text-accent" /> FAQs
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-sm text-muted-foreground pl-4">
                 <p><strong>Q: Is this real-time data?</strong><br/> A: No, this dashboard uses simulated data based on common patterns and inputs from the 'Connect & Business Interest' form to illustrate potential visitor profiles.</p>
                 <p><strong>Q: How is the data collected?</strong><br/> A: The simulated data mirrors potential inputs from the 'Connect & Business Interest' form on this page.</p>
                 <p><strong>Q: What does "Relative Interest (Simulated Size)" mean in the Treemap?</strong><br/> A: It represents the simulated volume or frequency of interest associated with each company name, visualized by the size of the rectangle.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-base font-semibold hover:no-underline text-foreground">
                <Lightbulb className="h-4 w-4 mr-2 text-accent" /> Example Prompts/Ideas
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-sm text-muted-foreground pl-4">
                <p><em>(For internal thought or potential future AI integration)</em></p>
                <ul className="list-disc list-inside space-y-1">
                    <li>"Summarize the key characteristics of the most frequent visitor segment."</li>
                    <li>"Which industries show the highest interest in 'Functional Consulting' skills?"</li>
                    <li>"Generate potential follow-up email templates for hiring managers in FinTech."</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <DialogFooter className="sm:justify-start gap-2 border-t pt-4">
          {/* Placeholder Action Buttons */}
          <Button type="button" variant="secondary" size="sm" disabled>
            <Download className="mr-2 h-4 w-4" /> Export Data (Not Implemented)
          </Button>
          <Button type="button" variant="secondary" size="sm" disabled>
            <Share2 className="mr-2 h-4 w-4" /> Share Insights (Not Implemented)
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="outline" size="sm" className="sm:ml-auto">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VisitorInterestInfoDialog;
