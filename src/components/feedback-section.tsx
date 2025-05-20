"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AnimatedSection from "./animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription as FormDesc, // Alias to avoid conflict
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, Mail, Building, User, Briefcase, Factory, UsersRound, Loader2, MailCheck, RotateCcw } from "lucide-react";

const feedbackFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  company: z.string().min(1, { message: "Company name is required." }),
  role: z.string().min(1, { message: "Your role is required." }),
  industry: z.string().min(1, { message: "Your industry is required." }),
  companySize: z.string().optional(),
  lookingFor: z.string().min(10, {
    message: "Please describe what you're looking for in at least 10 characters.",
  }),
  skillsInterest: z.string().optional(),
  generalFeedback: z.string().optional(),
});

type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;

const companySizeOptions = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-1000 employees",
  "5001+ employees",
  "Individual / Freelancer",
];

type SubmissionStatus = "idle" | "submitting" | "success";

const FeedbackSection: React.FC = (): React.ReactNode => {
  const { toast } = useToast();
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>("idle");  
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
      industry: "",
      companySize: "",
      lookingFor: "",
      skillsInterest: "",
      generalFeedback: "",
    },
    mode: "onChange",
  });

  // Helper function to handle successful submission
  const handleSuccessfulSubmission = async (data: FeedbackFormValues, formElement: HTMLElement | null) => {
    // Extract first 1-3 words from lookingFor for subject    
    const lookingForWords = data.lookingFor.trim().split(/\s+/);
    const keyword = lookingForWords.slice(0, 3).join(" ");
    const subject = `Business Inquiry - ${data.company} - ${keyword}`;

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, subject }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send message.');
      }

      // Email sent successfully
      setSubmissionStatus("success");
      toast({
        title: "Message Sent!",
        description: "Thank you for sharing your interest. I'll be in touch soon.",
        variant: "default",
      });

      setTimeout(() => {
        form.reset();
        setSubmissionStatus("idle");
      }, 2500); // Keep timeout for success message visibility

    } catch (error: any) {
      console.error("Error sending business interest:", error);
      setSubmissionStatus("idle");
      toast({
        title: "Submission Failed",
        description: error.message || "There was an error sending your message. Please try again later.",
        variant: "destructive",
      });
    }
  };


  function onSubmit(data: FeedbackFormValues) {
    setSubmissionStatus("submitting");
    // Call the helper function
    handleSuccessfulSubmission(data, null); // Removed formElement as it's not used in the handler
  }

  const handleClearForm = () => {
    form.reset();
    setSubmissionStatus("idle");
  };

  return (
    <AnimatedSection id="feedback" className="scroll-mt-20 md:scroll-mt-24" delay="delay-500">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-out bg-card border border-border/50 rounded-lg p-6 md:p-10">
        <CardHeader className="p-0 mb-8 text-center">
          <CardTitle className="text-4xl md:text-5xl font-bold text-primary mb-2">
            Connect <span className="text-accent">& Business Interest</span>
          </CardTitle>
          <CardDescription className="text-muted-foreground mt-2 text-lg">
            Let's explore opportunities. Tell me about your business needs or interests.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 min-h-[560px] flex flex-col justify-center">
          {submissionStatus === "submitting" && (
            <div className="flex flex-col items-center justify-center text-center space-y-3 py-10">
              <Loader2 className="h-12 w-12 text-accent animate-spin" />
              <p className="text-lg font-medium text-muted-foreground">Sending your message...</p>
            </div>
          )}

          {submissionStatus === "success" && (
            <div className="flex flex-col items-center justify-center text-center space-y-4 py-10 animate-fade-in">
              <MailCheck className="h-16 w-16 text-green-500 animate-bounce" style={{ animationIterationCount: 3, animationDuration: '0.7s' }} />
              <p className="text-2xl font-semibold text-primary">Message Sent!</p> {/* Reverted message */}
              <p className="text-muted-foreground">Thank you for reaching out. I'll be in touch soon.</p>
            </div>
          )}

          {submissionStatus === "idle" && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name*</FormLabel>
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
                        <FormLabel>Email*</FormLabel>
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
                        <FormLabel>Company*</FormLabel>
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
                        <FormLabel>Your Role*</FormLabel>
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
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Industry*</FormLabel>
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
                  <FormField
                    control={form.control}
                    name="companySize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Size (Optional)</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <FormControl>
                            <div className="relative flex items-center">
                              <UsersRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <SelectTrigger className="pl-10">
                                <SelectValue placeholder="Select company size" />
                              </SelectTrigger>
                            </div>
                          </FormControl>
                          <SelectContent>
                            {companySizeOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lookingFor"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
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
                </div>

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
                      <FormLabel>General Comments (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any other thoughts or context?"
                          className="resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClearForm}
                    className="group"
                    disabled={form.formState.isSubmitting}
                  >
                    Clear Form
                    <RotateCcw className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-[-45deg]" />
                  </Button>
                  <Button
                    type="submit"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 transition-colors duration-300 group"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Connect
                        <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </AnimatedSection>
  );
};

export default FeedbackSection;