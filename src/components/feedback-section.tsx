
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
import { Send, Mail, Building, User, Briefcase, Factory } from "lucide-react"; // Added Factory icon

// Define the form schema using Zod - updated required fields
const feedbackFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  company: z.string().min(1, { message: "Company name is required." }),
  role: z.string().min(1, { message: "Your role is required." }), // Changed from Role/Industry
  industry: z.string().min(1, { message: "Your industry is required." }), // Added Industry
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
    defaultValues: { // Keep default values empty
      name: "",
      email: "",
      company: "",
      role: "",
      industry: "", // Added industry default
      lookingFor: "",
      skillsInterest: "",
      generalFeedback: "",
    },
    mode: "onChange", // Validate on change for better UX
  });

  function onSubmit(data: FeedbackFormValues) {
    // In a real application, you would send this data to your backend/API
    console.log("Connection request submitted:", data);

    toast({
      title: "Message Sent!",
      description: "Thank you for connecting. I'll be in touch soon.", // Updated toast message
    });
    form.reset(); // Reset form after successful submission
  }

  return (
    <AnimatedSection id="connect" className="scroll-mt-20 md:scroll-mt-24" delay="delay-500"> {/* Updated ID */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-out bg-card border border-border/50 rounded-lg p-6 md:p-10">
        <CardHeader className="p-0 mb-8 text-center">
          <CardTitle className="text-4xl md:text-5xl font-bold text-primary mb-3 pb-2 border-b-2 border-accent/30 inline-block">
            Connect & Share Needs
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
                      <FormLabel>Name*</FormLabel> {/* Added asterisk */}
                      <FormControl>
                        <div className="relative flex items-center">
                          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input placeholder="Your Name" className="pl-10" {...field} />
                        </div>
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
                      <FormLabel>Email*</FormLabel> {/* Added asterisk */}
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
                      <FormLabel>Company*</FormLabel> {/* Added asterisk */}
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
                  name="role" // Updated name from role/industry
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Role*</FormLabel> {/* Updated Label */}
                      <FormControl>
                       <div className="relative flex items-center">
                         <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="e.g., Hiring Manager, Recruiter, Collaborator" className="pl-10" {...field} />
                       </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="industry" // Added new field for industry
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Industry*</FormLabel> {/* Added asterisk */}
                      <FormControl>
                       <div className="relative flex items-center">
                         <Factory className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="e.g., FinTech, Healthcare, SaaS" className="pl-10" {...field} />
                       </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* This field might be better placed spanning full width, adjust grid if needed */}
                 <FormField
                    control={form.control}
                    name="lookingFor"
                    render={({ field }) => (
                    <FormItem className="md:col-span-2"> {/* Span full width on medium screens */}
                        <FormLabel>What are you primarily looking for?*</FormLabel> {/* Added asterisk */}
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
              </div> {/* Close md:grid-cols-2 */}


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
                   {form.formState.isSubmitting ? "Sending..." : "Connect"} {/* Updated button text */}
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

