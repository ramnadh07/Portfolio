
"use client"

import React, { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Cell, Treemap, Tooltip as RechartsTooltip } from "recharts";
import AnimatedSection from "./animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Users, Target, Star, TrendingUp, Handshake, Zap, UsersRound, Activity, Loader2, Building2, Briefcase, Factory, Search, HelpCircle, Brain, Info, Menu, BookOpen, Lightbulb, BarChartBig, MessageSquare, Settings, PencilLine, SearchCheck, BotMessageSquare, ChevronLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

// Static Mock Data
const skillsInterestData = [
  { skill: "Bus. Analysis", value: 120, fill: "hsl(var(--chart-1))" },
  { skill: "Func. Consulting", value: 95, fill: "hsl(var(--chart-2))" },
  { skill: "Strategy", value: 80, fill: "hsl(var(--chart-3))" },
  { skill: "GTM", value: 65, fill: "hsl(var(--chart-4))" },
  { skill: "Salesforce", value: 50, fill: "hsl(var(--chart-5))" },
  { skill: "Data Analysis", value: 40, fill: "hsl(var(--chart-1) / 0.6)" },
];

const domainInterestData = [
  { name: "FinTech", value: 80, fill: "hsl(var(--chart-1))" },
  { name: "Healthcare", value: 65, fill: "hsl(var(--chart-2))" },
  { name: "E-commerce", value: 50, fill: "hsl(var(--chart-3))" },
  { name: "SaaS", value: 45, fill: "hsl(var(--chart-4))" },
  { name: "Other", value: 30, fill: "hsl(var(--chart-5))" },
];
const topDomain = domainInterestData.reduce((max, current) => (current.value > max.value ? current : max), domainInterestData[0]);

const ratingsData = [
  { rating: 10, count: 15, fill: "hsl(var(--chart-1))" },
  { rating: 9, count: 25, fill: "hsl(var(--chart-2))" },
  { rating: 8, count: 18, fill: "hsl(var(--chart-3))" },
  { rating: 7, count: 10, fill: "hsl(var(--chart-4))" },
  { rating: 6, count: 5, fill: "hsl(var(--chart-5))" },
  { rating: 5, count: 2, fill: "hsl(var(--chart-1) / 0.6)" },
];
const totalRatingSum = ratingsData.reduce((sum, item) => sum + item.rating * item.count, 0);
const totalRatingsCount = ratingsData.reduce((sum, item) => sum + item.count, 0);
const averageRating = totalRatingsCount > 0 ? (totalRatingSum / totalRatingsCount).toFixed(1) : "N/A";

const engagementRate = 68;
const engagementData = [
    { name: 'engagement', value: engagementRate, fill: 'hsl(var(--chart-1))' },
    { name: 'remainder', value: 100 - engagementRate, fill: 'hsl(var(--muted) / 0.3)' },
];

const needsSummaryData = {
    companySize: [
        { name: "1-10", value: 15, fill: "hsl(var(--chart-1))" },
        { name: "11-50", value: 25, fill: "hsl(var(--chart-2))" },
        { name: "51-200", value: 35, fill: "hsl(var(--chart-3))" },
        { name: "201-1000", value: 18, fill: "hsl(var(--chart-4))" },
        { name: "1000+", value: 7, fill: "hsl(var(--chart-5))" },
    ],
    companyName: [
        { name: 'Tech Solutions Inc.', size: 1200, fill: "hsl(var(--chart-1))" },
        { name: 'Innovate Ltd.', size: 800, fill: "hsl(var(--chart-2))" },
        { name: 'Data Corp', size: 500, fill: "hsl(var(--chart-3))" },
        { name: 'Alpha Enterprises', size: 400, fill: "hsl(var(--chart-4))" },
        { name: 'Beta Group', size: 300, fill: "hsl(var(--chart-5))" },
        { name: 'Gamma Systems', size: 200, fill: "hsl(var(--chart-1) / 0.8)" },
        { name: 'Delta Solutions', size: 150, fill: "hsl(var(--chart-2) / 0.8)" },
        { name: 'Other Startups', size: 450, fill: "hsl(var(--muted))" },
    ],
    roles: [
        { name: "Hiring Manager", value: 40, fill: "hsl(var(--chart-1))" },
        { name: "Recruiter", value: 25, fill: "hsl(var(--chart-2))" },
        { name: "Collaborator", value: 15, fill: "hsl(var(--chart-3))" },
        { name: "Project Manager", value: 10, fill: "hsl(var(--chart-4))" },
        { name: "Other", value: 10, fill: "hsl(var(--chart-5))" },
    ],
    industries: [
        { name: "FinTech", value: 30, fill: "hsl(var(--chart-1))" },
        { name: "Healthcare", value: 22, fill: "hsl(var(--chart-2))" },
        { name: "SaaS", value: 18, fill: "hsl(var(--chart-3))" },
        { name: "E-commerce", value: 15, fill: "hsl(var(--chart-4))" },
        { name: "Consulting", value: 8, fill: "hsl(var(--chart-5))" },
        { name: "Other", value: 7, fill: "hsl(var(--chart-1) / 0.6)" },
    ],
    lookingFor: [
        { name: "BA Role", value: 35, fill: "hsl(var(--chart-1))" },
        { name: "Consulting", value: 28, fill: "hsl(var(--chart-2))" },
        { name: "Strategic Insights", value: 17, fill: "hsl(var(--chart-3))" },
        { name: "Collaboration", value: 12, fill: "hsl(var(--chart-4))" },
        { name: "General Inquiry", value: 8, fill: "hsl(var(--chart-5))" },
    ],
    skillsMentioned: [
        { skill: "Salesforce", value: 55, fill: "hsl(var(--chart-1))" },
        { skill: "Req. Elicitation", value: 70, fill: "hsl(var(--chart-2))" },
        { skill: "Process Model.", value: 45, fill: "hsl(var(--chart-3))" },
        { skill: "GTM Support", value: 30, fill: "hsl(var(--chart-4))" },
        { skill: "Data Analysis", value: 25, fill: "hsl(var(--chart-5))" },
        { skill: "UAT", value: 15, fill: "hsl(var(--chart-1) / 0.6)" },
    ]
};

const examplePrompts = {
  summary: [
    "Provide a detailed breakdown of the visitor profile.",
    "What are the top 3 most sought-after requirements?",
  ],
  interpretation: [
    "Explain the significance of the high interest in Salesforce.",
    "Why might mid-sized FinTech companies be visiting?",
    "What does the lower GTM interest imply?",
  ],
  insights: [
    "Generate ideas for a case study targeting FinTech recruiters.",
    "Suggest specific keywords to emphasize Salesforce expertise.",
    "How can I better showcase my strategic skills?",
  ]
};

const TreemapTooltipContent = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm max-w-[150px] whitespace-normal">
        <div className="grid grid-cols-1 gap-1">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Company
            </span>
            <span className="font-bold text-foreground break-words">
              {payload[0].payload.name}
            </span>
          </div>
           <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Relative Interest (Simulated Size)
            </span>
            <span className="font-bold" style={{ color: payload[0].payload.fill }}>
               {payload[0].value}
            </span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

type SidebarContentKey = 'summary' | 'interpretation' | 'insights' | null;

const AnalyticsDashboardSection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [simulatedViewersData, setSimulatedViewersData] = useState<null | Array<{ month: string; viewers: number }>>(null);
  const [totalSimulatedViewers, setTotalSimulatedViewers] = useState<null | number>(null);
  const [activeSidebarContent, setActiveSidebarContent] = useState<SidebarContentKey>('summary');
  const [sidebarDisplayContent, setSidebarDisplayContent] = useState<string | null>(null);
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const viewers = [
      { month: "Jan", viewers: Math.floor(Math.random() * 50) + 10 },
      { month: "Feb", viewers: Math.floor(Math.random() * 60) + 15 },
      { month: "Mar", viewers: Math.floor(Math.random() * 70) + 20 },
      { month: "Apr", viewers: Math.floor(Math.random() * 80) + 25 },
      { month: "May", viewers: Math.floor(Math.random() * 90) + 30 },
      { month: "Jun", viewers: Math.floor(Math.random() * 100) + 35 },
    ];
    setSimulatedViewersData(viewers);
    const total = viewers.reduce((sum, item) => sum + item.viewers, 0) * 3 + 150;
    setTotalSimulatedViewers(total);
  }, []);

  const cardAnimationDelay = (index: number) => `delay-${index * 100}`;
  const chartHeight = "h-[240px]";

  const handlePromptClick = (promptText: string) => {
    console.log("Prompt clicked:", promptText);
    setIsGeneratingResponse(true);
    setSidebarDisplayContent(null); 

    setTimeout(() => {
        let response = `Response to: "${promptText}"\n\n`;
        if (promptText.includes("profile")) {
            response += "The typical visitor is a hiring manager or recruiter from a mid-sized (51-200 employees) company, predominantly in the FinTech or Healthcare sector. They express strong interest in Business Analysis and Consulting roles, specifically mentioning Salesforce and Requirements Elicitation skills.";
        } else if (promptText.includes("requirements")) {
            response += "The top 3 requirements mentioned are: 1. Business Analysis Roles (especially Senior level), 2. Consulting (particularly CRM/Salesforce implementation), and 3. Strategic Insights (market analysis, GTM support).";
        } else if (promptText.includes("Salesforce")) {
            response += "The high interest in Salesforce suggests a strong market demand for implementing or optimizing this CRM platform. Visitors likely represent companies seeking expertise in configuration, workflow automation, and integration related to Salesforce Sales Cloud or Service Cloud.";
        } else if (promptText.includes("FinTech")) {
            response += "Mid-sized FinTech companies often require BAs/Consultants for projects involving process optimization for financial workflows, requirements gathering for new platform features (like lending or payment systems), CRM integration, and ensuring regulatory compliance within their software.";
        } else if (promptText.includes("GTM")) {
            response += "Lower GTM interest compared to core BA/Consulting roles might imply visitors are primarily focused on operational/implementation needs first. However, it still presents an opportunity to showcase strategic thinking and market analysis skills, potentially for future growth phases or product launches within these companies.";
        } else if (promptText.includes("case study") || promptText.includes("ideas")) {
            response += "Case Study Idea for FinTech Recruiter:\nTitle: 'Streamlining Loan Origination Process for Mid-Sized FinTech Lender'\nFocus: Highlight requirements elicitation (user stories, process maps), Salesforce configuration (custom objects, approval processes), and quantifiable results (e.g., 20% reduction in processing time, improved data accuracy). Emphasize collaboration with development and compliance teams.";
        } else if (promptText.includes("keywords")) {
            response += "Keywords to emphasize Salesforce expertise: Salesforce Configuration, Salesforce CRM Implementation, Sales Cloud, Service Cloud, Workflow Automation, Process Builder, Requirements Elicitation, Functional Specification, UAT Coordination, Solution Design, Apex (conceptual understanding), SOQL (basic queries).";
        } else if (promptText.includes("strategic skills")) {
            response += "To showcase strategic skills better: \n1. Detail your involvement in market analysis or competitive intelligence projects. \n2. Quantify contributions to GTM strategy or business case development. \n3. Add a dedicated 'Strategic Contributions' section or highlight these aspects within project descriptions. \n4. Frame functional solutions within a broader strategic context (e.g., 'Implemented CRM to support strategic goal of X').";
        } else {
            response += "This is a simulated response providing insights based on the selected prompt. In a real scenario, more detailed analysis would be provided.";
        }
        setSidebarDisplayContent(response);
        setIsGeneratingResponse(false);
    }, 1500);
  };

  const handleTabChange = (tabKey: SidebarContentKey) => {
    setActiveSidebarContent(tabKey);
    setSidebarDisplayContent(null);
    setIsGeneratingResponse(false);
  }

  const renderPromptButtons = (prompts: string[]) => (
    <ScrollArea className="h-[100px] w-full pr-3">
      <div className="space-y-2 mt-2">
        {prompts.map((prompt, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="w-full text-muted-foreground h-auto p-2 text-left justify-start hover:bg-accent/10 hover:text-accent text-xs leading-snug whitespace-normal border-border/50"
            onClick={() => handlePromptClick(prompt)}
            disabled={isGeneratingResponse}
          >
            {prompt}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );

  const renderActiveTabContent = () => {
    if (isGeneratingResponse) {
        return (
            <div className="space-y-3 text-center text-muted-foreground p-1">
                <Loader2 className="h-5 w-5 mx-auto animate-spin mb-2" />
                Generating response...
            </div>
        );
    }

    if (sidebarDisplayContent) {
        return (
            <div className="space-y-3 relative p-1"> {/* Ensure padding for content */}
                <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-0 right-0 px-2 py-1 text-xs h-auto"
                    onClick={() => setSidebarDisplayContent(null)}
                >
                    <ChevronLeft className="h-3 w-3 mr-1"/> Back
                </Button>
                <h4 className="font-semibold text-primary flex items-center pt-1">
                    <BotMessageSquare className="h-4 w-4 mr-2 text-accent"/> AI Response
                </h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{sidebarDisplayContent}</p>
            </div>
        );
    }

    switch (activeSidebarContent) {
      case 'summary':
        return (
          <div className="space-y-3 p-1"> {/* Ensure padding for content */}
            <h4 className="font-semibold text-primary">Summary</h4>
            <p className="text-sm text-muted-foreground">The dashboard suggests the primary audience consists of hiring managers and recruiters from mid-sized companies (51-200 employees) in the FinTech and Healthcare sectors. They are mainly looking for Business Analysts and Consultants, with specific interest in Salesforce and Requirements Elicitation.</p>
          </div>
        );
      case 'interpretation':
        return (
          <div className="space-y-3 p-1"> {/* Ensure padding for content */}
             <h4 className="font-semibold text-primary">Interpretation</h4>
             <p className="text-sm text-muted-foreground">
                 The data points towards a strong interest from established tech-focused companies seeking experienced BAs/Consultants. The focus on Salesforce and specific BA skills (Requirements, Process Modeling) indicates a need for practical implementation expertise. GTM support interest, while lower, suggests opportunities in strategic roles within these organizations.
             </p>
          </div>
        );
      case 'insights':
        return (
          <div className="space-y-3 p-1"> {/* Ensure padding for content */}
            <h4 className="font-semibold text-primary">Actionable Insights</h4>
             <ul className="text-sm text-muted-foreground list-disc list-outside pl-5 space-y-1">
                 <li>Tailor project examples highlighting Salesforce CRM and Requirements Elicitation successes.</li>
                 <li>Emphasize experience within FinTech and Healthcare domains.</li>
                 <li>Consider adding case studies focused on GTM strategy support.</li>
                 <li>Highlight ability to bridge business needs and technical solutions for mid-sized companies.</li>
             </ul>
          </div>
        );
      default:
        return (
           <div className="text-center text-muted-foreground p-1"> {/* Ensure padding for content */}
             <HelpCircle className="h-6 w-6 mx-auto mb-2" />
             Select an option from the top menu to view details or generate insights.
           </div>
        );
    }
  };
  
  const getActiveTabIcon = () => {
    switch (activeSidebarContent) {
        case 'summary': return <BookOpen className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />;
        case 'interpretation': return <Brain className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />;
        case 'insights': return <Lightbulb className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />;
        default: return <PencilLine className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />;
    }
  };


  return (
    <AnimatedSection id="analytics" className="scroll-mt-20 md:scroll-mt-24" delay="delay-550">
      <Card className="shadow-xl border border-border/50 rounded-lg overflow-hidden bg-gradient-to-br from-card via-card/95 to-card">
        <CardHeader className="p-6 md:p-8 text-center bg-muted/30 border-b border-border/30">
          <CardTitle className="text-4xl md:text-5xl font-bold text-primary mb-3 pb-2 border-b-2 border-accent/30 inline-block">
             Portfolio Analytics
          </CardTitle>
          <CardDescription className="text-muted-foreground mt-2 text-lg">
            Insights based on simulated visitor interactions and feedback.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-8">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                <AnimatedSection animationClass="animate-fade-in-up" delay={cardAnimationDelay(0)} className="col-span-1">
                    <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/40 bg-background/70 flex flex-col">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Viewers</CardTitle>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Users className="h-4 w-4 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-[120px] whitespace-normal text-center">
                                    <p>Total simulated page views.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col justify-center">
                        {!isClient || totalSimulatedViewers === null ? (
                            <Skeleton className="h-7 w-24" />
                        ) : (
                            <div className="text-2xl font-bold text-foreground">{totalSimulatedViewers.toLocaleString()}</div>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">(Simulated)</p>
                        </CardContent>
                    </Card>
                </AnimatedSection>
                <AnimatedSection animationClass="animate-fade-in-up" delay={cardAnimationDelay(1)} className="col-span-1">
                    <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/40 bg-background/70 flex flex-col">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Average Rating</CardTitle>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Star className="h-4 w-4 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-[120px] whitespace-normal text-center">
                                    <p>Average rating from feedback.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col justify-center">
                        <div className="text-2xl font-bold text-foreground">{averageRating}/10</div>
                        <p className="text-xs text-muted-foreground mt-1">from {totalRatingsCount} ratings</p>
                        </CardContent>
                    </Card>
                </AnimatedSection>
                <AnimatedSection animationClass="animate-fade-in-up" delay={cardAnimationDelay(2)} className="col-span-1">
                    <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/40 bg-background/70 flex flex-col">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Engagement Rate</CardTitle>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Activity className="h-4 w-4 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-[120px] whitespace-normal text-center">
                                    <p>Percentage of visitors who interacted with the feedback form.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col justify-center">
                        <div className="text-2xl font-bold text-foreground">{engagementRate}%</div>
                        <p className="text-xs text-muted-foreground mt-1">Feedback form interaction</p>
                        </CardContent>
                    </Card>
                </AnimatedSection>
                <AnimatedSection animationClass="animate-fade-in-up" delay={cardAnimationDelay(3)} className="col-span-1">
                    <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/40 bg-background/70 flex flex-col">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Viewers Trend</CardTitle>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <TrendingUp className="h-4 w-4 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-[120px] whitespace-normal text-center">
                                    <p>Simulated monthly visitor trend over the last 6 months.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col pt-4">
                            <div className="flex items-baseline gap-1">
                                {!isClient || simulatedViewersData === null ? (
                                    <Skeleton className="h-6 w-16" />
                                ) : (
                                    <div className="text-2xl font-bold text-foreground">{simulatedViewersData[simulatedViewersData.length - 1].viewers}</div>
                                )}
                                <span className="text-xs text-muted-foreground">in Jun</span>
                            </div>
                            <div className="flex-grow h-[100px] w-full mt-2">
                                {!isClient || simulatedViewersData === null ? (
                                    <div className="flex items-center justify-center h-full">
                                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                                    </div>
                                ) : (
                                    <ChartContainer config={{ viewers: { label: "Viewers", color: "hsl(var(--chart-1))" } }} className="w-full h-full">
                                        <LineChart data={simulatedViewersData} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                                            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" />
                                            <XAxis dataKey="month" tickLine={false} axisLine={false} dy={10} fontSize={10} />
                                            <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={10} />
                                            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" hideLabel />} />
                                            <Line dataKey="viewers" type="monotone" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
                                        </LineChart>
                                    </ChartContainer>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </AnimatedSection>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <AnimatedSection animationClass="animate-fade-in-up" delay={cardAnimationDelay(4)} className="col-span-1 lg:col-span-2">
                    <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/40 bg-background/70 flex flex-col">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Top Skills of Interest</CardTitle>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Target className="h-4 w-4 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-[120px] whitespace-normal text-center">
                                    <p>Frequency of skills mentioned in feedback/needs.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        </CardHeader>
                        <CardContent className="flex-grow pt-4 space-y-2">
                            <div className="text-lg font-bold text-foreground">{skillsInterestData[0].skill}</div>
                            <p className="text-xs text-muted-foreground">Most frequently mentioned</p>
                            <div className="flex-grow h-[200px] w-full">
                                <ChartContainer config={skillsInterestData.reduce((acc, cur) => ({ ...acc, [cur.skill]: { label: cur.skill, color: cur.fill } }), {})} className="w-full h-full">
                                    <BarChart data={skillsInterestData} layout="vertical" margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="skill" type="category" tickLine={false} axisLine={false} tickMargin={5} fontSize={10} width={90} interval={0} />
                                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                        <Bar dataKey="value" radius={4} barSize={16} >
                                        {skillsInterestData.map((entry) => (
                                            <Cell key={`cell-${entry.skill}`} fill={entry.fill} />
                                        ))}
                                        </Bar>
                                    </BarChart>
                                </ChartContainer>
                            </div>
                        </CardContent>
                    </Card>
                </AnimatedSection>

                <AnimatedSection animationClass="animate-fade-in-up" delay={cardAnimationDelay(5)} className="col-span-1">
                    <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/40 bg-background/70 flex flex-col">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Top Domain Interest</CardTitle>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Zap className="h-4 w-4 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-[120px] whitespace-normal text-center">
                                    <p>Most frequently mentioned domain in feedback/needs.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col items-center justify-center pt-4 space-y-2">
                            <div className="text-2xl font-bold text-foreground" style={{ color: topDomain.fill }}>{topDomain.name}</div>
                            <p className="text-xs text-muted-foreground">Highest interest area</p>
                            <div className="h-[160px] w-[160px]">
                                <ChartContainer config={domainInterestData.reduce((acc, cur) => ({ ...acc, [cur.name]: { label: cur.name, color: cur.fill } }), {})} className="w-full h-full">
                                    <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                                    <ChartTooltip content={<ChartTooltipContent nameKey="name" hideIndicator />} />
                                    <Pie data={domainInterestData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={70} strokeWidth={2} >
                                        {domainInterestData.map((entry) => (
                                        <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    </PieChart>
                                </ChartContainer>
                            </div>
                        </CardContent>
                    </Card>
                </AnimatedSection>
           </div>

            <AnimatedSection animationClass="animate-fade-in-up" delay={cardAnimationDelay(6)} className="col-span-1 sm:col-span-2 lg:col-span-4">
                <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/40 bg-muted/30 overflow-hidden">
                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 pr-4 pl-6 border-b border-border/30">
                         <div className="flex items-center space-x-2">
                             <UsersRound className="h-5 w-5 text-primary" />
                             <CardTitle className="text-lg font-medium text-primary">Visitor Business Interest Summary</CardTitle>
                         </div>
                     </CardHeader>

                    <div className="flex flex-col md:flex-row">
                        <CardContent className="p-6 pt-4 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10 flex-grow">
                            <div className="col-span-1 flex flex-col space-y-3">
                                <h4 className="text-sm font-medium text-muted-foreground flex items-center justify-start">
                                    <Building2 className="h-4 w-4 mr-1.5"/>
                                    Companies Showing Interest
                                </h4>
                                <div className={`flex-grow w-full ${chartHeight}`}>
                                    {!isClient ? (
                                        <Skeleton className="w-full h-full" />
                                    ) : (
                                    <ChartContainer config={needsSummaryData.companyName.reduce((acc, cur) => ({ ...acc, [cur.name]: { label: cur.name, color: cur.fill } }), {})} className="w-full h-full">
                                        <Treemap
                                            data={needsSummaryData.companyName}
                                            dataKey="size"
                                            ratio={4 / 3}
                                            stroke="hsl(var(--card))"
                                            fill="hsl(var(--accent))"
                                            isAnimationActive={true}
                                            >
                                            {needsSummaryData.companyName.map((entry) => (
                                                <Cell key={`cell-compname-${entry.name}`} fill={entry.fill} />
                                            ))}
                                            <RechartsTooltip content={<TreemapTooltipContent />} cursor={{ stroke: 'hsl(var(--foreground))', strokeWidth: 1 }}/>
                                        </Treemap>
                                    </ChartContainer>
                                    )}
                                </div>
                            </div>

                            <div className="col-span-1 flex flex-col space-y-3">
                                <h4 className="text-sm font-medium text-muted-foreground flex items-center justify-start">
                                    <UsersRound className="h-4 w-4 mr-1.5"/>
                                    Company Size
                                </h4>
                                <div className={`flex-grow w-full ${chartHeight}`}>
                                    <ChartContainer config={needsSummaryData.companySize.reduce((acc, cur) => ({ ...acc, [cur.name]: { label: cur.name, color: cur.fill } }), {})} className="w-full h-full">
                                        <BarChart data={needsSummaryData.companySize} layout="vertical" margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tickMargin={5} fontSize={11} width={60} interval={0} />
                                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                            <Bar dataKey="value" radius={4} barSize={14}>
                                            {needsSummaryData.companySize.map((entry) => (
                                                <Cell key={`cell-compsize-${entry.name}`} fill={entry.fill} />
                                            ))}
                                            </Bar>
                                        </BarChart>
                                    </ChartContainer>
                                </div>
                            </div>

                            <div className="col-span-1 flex flex-col space-y-3">
                                <h4 className="text-sm font-medium text-muted-foreground flex items-center justify-start">
                                    <Briefcase className="h-4 w-4 mr-1.5"/>
                                    Common Visitor Roles
                                </h4>
                                <div className={`flex-grow w-full flex items-center justify-center ${chartHeight}`}>
                                    <div className="h-[180px] w-[180px]">
                                        <ChartContainer config={needsSummaryData.roles.reduce((acc, cur) => ({ ...acc, [cur.name]: { label: cur.name, color: cur.fill } }), {})} className="w-full h-full">
                                            <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                                                <ChartTooltip content={<ChartTooltipContent nameKey="name" hideIndicator />} />
                                                <Pie data={needsSummaryData.roles} dataKey="value" nameKey="name" innerRadius={40} outerRadius={70} strokeWidth={2}>
                                                    {needsSummaryData.roles.map((entry) => (
                                                    <Cell key={`cell-role-${entry.name}`} fill={entry.fill} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </ChartContainer>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-1 flex flex-col space-y-3">
                                <h4 className="text-sm font-medium text-muted-foreground flex items-center justify-start">
                                    <Factory className="h-4 w-4 mr-1.5"/>
                                    Industry
                                </h4>
                                <div className={`flex-grow w-full ${chartHeight}`}>
                                    <ChartContainer config={needsSummaryData.industries.reduce((acc, cur) => ({ ...acc, [cur.name]: { label: cur.name, color: cur.fill } }), {})} className="w-full h-full">
                                        <BarChart data={needsSummaryData.industries} layout="horizontal" margin={{ top: 5, right: 0, left: 0, bottom: 30 }}>
                                            <XAxis dataKey="name" type="category" tickLine={false} axisLine={false} tickMargin={5} fontSize={10} interval={0} angle={-40} dx={-10} dy={15} height={50}/>
                                            <YAxis type="number" hide/>
                                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                            <Bar dataKey="value" radius={4} barSize={18}>
                                                {needsSummaryData.industries.map((entry) => (
                                                <Cell key={`cell-ind-${entry.name}`} fill={entry.fill} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ChartContainer>
                                </div>
                            </div>

                            <div className="col-span-1 flex flex-col space-y-3">
                                <h4 className="text-sm font-medium text-muted-foreground flex items-center justify-start">
                                   <Search className="h-4 w-4 mr-1.5"/>
                                    Major Requirement
                                </h4>
                                <div className={cn("flex-grow w-full", chartHeight)}>
                                    <ChartContainer config={needsSummaryData.lookingFor.reduce((acc, cur) => ({ ...acc, [cur.name]: { label: cur.name, color: cur.fill } }), {})} className="w-full h-full">
                                        <BarChart data={needsSummaryData.lookingFor} layout="horizontal" margin={{ top: 5, right: 10, left: 10, bottom: 20 }}>
                                            <XAxis dataKey="name" type="category" tickLine={false} axisLine={false} tickMargin={5} fontSize={10} interval={0} angle={-30} dx={-5} dy={10} height={40}/>
                                            <YAxis type="number" hide/>
                                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                            <Bar dataKey="value" radius={5} barSize={20}>
                                                {needsSummaryData.lookingFor.map((entry) => (
                                                <Cell key={`cell-needs-${entry.name}`} fill={entry.fill} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ChartContainer>
                                </div>
                            </div>

                            <div className="col-span-1 flex flex-col space-y-3">
                                <h4 className="text-sm font-medium text-muted-foreground flex items-center justify-start">
                                    <Target className="h-4 w-4 mr-1.5"/>
                                    Specific Skills Mentioned
                                </h4>
                                <div className={cn("flex-grow w-full", chartHeight)}>
                                    <ChartContainer config={needsSummaryData.skillsMentioned.reduce((acc, cur) => ({ ...acc, [cur.skill]: { label: cur.skill, color: cur.fill } }), {})} className="w-full h-full">
                                        <BarChart data={needsSummaryData.skillsMentioned} layout="vertical" margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="skill" type="category" tickLine={false} axisLine={false} tickMargin={5} fontSize={11} width={95} interval={0} />
                                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                            <Bar dataKey="value" radius={4} barSize={14}>
                                            {needsSummaryData.skillsMentioned.map((entry) => (
                                                <Cell key={`cell-skill-mention-${entry.skill}`} fill={entry.fill} />
                                            ))}
                                            </Bar>
                                        </BarChart>
                                    </ChartContainer>
                                </div>
                            </div>
                        </CardContent>

                        <aside className="w-full md:w-2/5 lg:w-1/3 border-l border-border/30 bg-sidebar flex flex-col">
                            {/* Box 1: Navigation */}
                            <div className="p-2 m-2 border border-border/50 rounded-md bg-background shadow">
                                <nav className="flex flex-wrap gap-1 justify-center md:flex-col md:space-y-1 md:justify-start md:flex-nowrap">
                                    <Button
                                        variant={activeSidebarContent === 'summary' ? 'secondary' : 'ghost'}
                                        size="sm"
                                        className="w-full justify-start text-xs px-2 py-1.5"
                                        onClick={() => handleTabChange('summary')}
                                    >
                                        <BookOpen className="mr-2 h-3.5 w-3.5 flex-shrink-0" /> Summary
                                    </Button>
                                    <Button
                                        variant={activeSidebarContent === 'interpretation' ? 'secondary' : 'ghost'}
                                        size="sm"
                                        className="w-full justify-start text-xs px-2 py-1.5"
                                        onClick={() => handleTabChange('interpretation')}
                                    >
                                        <Brain className="mr-2 h-3.5 w-3.5 flex-shrink-0" /> Interpretation
                                    </Button>
                                    <Button
                                        variant={activeSidebarContent === 'insights' ? 'secondary' : 'ghost'}
                                        size="sm"
                                        className="w-full justify-start text-xs px-2 py-1.5"
                                        onClick={() => handleTabChange('insights')}
                                    >
                                        <Lightbulb className="mr-2 h-3.5 w-3.5 flex-shrink-0" /> Insights
                                    </Button>
                                </nav>
                            </div>

                            {/* Box 2: Main Text Content Display */}
                            <div className="p-3 m-2 border border-border/50 rounded-md bg-background shadow flex-grow flex flex-col min-h-0">
                                <ScrollArea className="h-56 w-full"> {/* Applied fixed height for scrolling */}
                                    <div className="p-1"> {/* Padding for content inside ScrollArea */}
                                        {renderActiveTabContent()}
                                    </div>
                                </ScrollArea>
                            </div>


                            {/* Box 3: Example Prompts (conditionally) */}
                            {activeSidebarContent && !sidebarDisplayContent && !isGeneratingResponse && examplePrompts[activeSidebarContent] && (
                                <div className="p-3 m-2 border border-border/50 rounded-md bg-background shadow">
                                    <h5 className="text-xs font-medium text-muted-foreground flex items-center mb-2">
                                        {getActiveTabIcon()} Try Asking:
                                    </h5>
                                    {renderPromptButtons(examplePrompts[activeSidebarContent!])}
                                </div>
                            )}
                        </aside>
                    </div>
                </Card>
            </AnimatedSection>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
};

export default AnalyticsDashboardSection;


