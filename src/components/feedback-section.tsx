
"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AnimatedSection from "./animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, Mail, Building } from "lucide-react"; // Added Mail, Building icons

// Define the form schema using Zod
const feedbackFormSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email." }).optional().or(z.literal('')), // Optional email
  company: z.string().optional(), // Optional company
  role: z.string().optional(),
  lookingFor: z.string().min(10, {
    message: "Please describe what you're looking for in at least 10 characters.",
  }),
  skillsInterest: z.string().optional(),
  generalFeedback: z.string().optional(),
});

type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;

const FeedbackSection: React.FC = () => {
  const { toast } = useToast();
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
      lookingFor: "",
      skillsInterest: "",
      generalFeedback: "",
    },
    mode: "onChange", // Validate on change for better UX
  });

  function onSubmit(data: FeedbackFormValues) {
    // In a real application, you would send this data to your backend/API
    // Remove empty optional fields before submission if desired
    const submissionData = Object.entries(data).reduce((acc, [key, value]) => {
        if (value !== "" && value !== undefined && value !== null) {
            acc[key as keyof FeedbackFormValues] = value;
        }
        return acc;
    }, {} as Partial<FeedbackFormValues>);

    console.log("Feedback submitted:", submissionData);

    toast({
      title: "Feedback Submitted!",
      description: "Thank you for your valuable input.",
    });
    form.reset(); // Reset form after successful submission
  }

  return (
    <AnimatedSection id="feedback" className="scroll-mt-20 md:scroll-mt-24" delay="delay-500">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-out bg-card border border-border/50 rounded-lg p-6 md:p-10">
        <CardHeader className="p-0 mb-8 text-center">
          <CardTitle className="text-4xl md:text-5xl font-bold text-primary mb-3 pb-2 border-b-2 border-accent/30 inline-block">
            Connect & Share Needs {/* Updated Title */}
          </CardTitle>
          <CardDescription className="text-muted-foreground mt-2 text-lg">
            Let's connect! Tell me what you're looking for or share your feedback.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email (Optional)</FormLabel>
                      <FormControl>
                        <div className="relative flex items-center">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input type="email" placeholder="your.email@example.com" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company (Optional)</FormLabel>
                      <FormControl>
                       <div className="relative flex items-center">
                           <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input placeholder="Your Company Name" className="pl-10" {...field} />
                         </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Role/Industry (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Hiring Manager, Recruiter, Collaborator" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="lookingFor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What are you primarily looking for?*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., A Senior BA for a CRM project, collaboration opportunities, specific strategic insights..."
                        className="resize-y min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="skillsInterest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specific Skills/Domains of Interest? (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Salesforce configuration, GTM strategy, Process modeling in FinTech..."
                        className="resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="generalFeedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>General Feedback/Comments (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any other thoughts or suggestions?"
                        className="resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90 transition-colors duration-300 group" disabled={form.formState.isSubmitting}>
                   {form.formState.isSubmitting ? "Submitting..." : "Send Feedback"}
                  <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
};

export default FeedbackSection;

