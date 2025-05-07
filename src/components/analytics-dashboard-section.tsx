
"use client"

import React, { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Cell, Treemap, Tooltip as RechartsTooltip } from "recharts";
import AnimatedSection from "./animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Users, Target, Star, TrendingUp, Handshake, Zap, UsersRound, Activity, Loader2, Building2, Briefcase, Factory, Search, HelpCircle, Brain, Info, Menu, BookOpen, Lightbulb, BarChartBig, MessageSquare, Settings } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// Removed VisitorInterestInfoDialog import
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// Static Mock Data (Keeping existing data structure, adding Company Name)
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

// Visitor Needs Summary Data (Simulated)
const needsSummaryData = {
    companySize: [
        { name: "1-10", value: 15, fill: "hsl(var(--chart-1))" },
        { name: "11-50", value: 25, fill: "hsl(var(--chart-2))" },
        { name: "51-200", value: 35, fill: "hsl(var(--chart-3))" },
        { name: "201-1000", value: 18, fill: "hsl(var(--chart-4))" },
        { name: "1000+", value: 7, fill: "hsl(var(--chart-5))" },
    ],
    // Mock Company Name Data for Treemap
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
    lookingFor: [ // Renamed to majorRequirement internally for clarity
        { name: "BA Role", value: 35, fill: "hsl(var(--chart-1))" },
        { name: "Consulting", value: 28, fill: "hsl(var(--chart-2))" },
        { name: "Strategic Insights", value: 17, fill: "hsl(var(--chart-3))" },
        { name: "Collaboration", value: 12, fill: "hsl(var(--chart-4))" },
        { name: "General Inquiry", value: 8, fill: "hsl(var(--chart-5))" },
    ],
    skillsMentioned: [ // Re-using skillsInterestData format for consistency
        { skill: "Salesforce", value: 55, fill: "hsl(var(--chart-1))" },
        { skill: "Req. Elicitation", value: 70, fill: "hsl(var(--chart-2))" },
        { skill: "Process Model.", value: 45, fill: "hsl(var(--chart-3))" },
        { skill: "GTM Support", value: 30, fill: "hsl(var(--chart-4))" },
        { skill: "Data Analysis", value: 25, fill: "hsl(var(--chart-5))" },
        { skill: "UAT", value: 15, fill: "hsl(var(--chart-1) / 0.6)" },
    ]
};

// Custom Content for Treemap Tooltip
const TreemapTooltipContent = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-1 gap-1">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Company
            </span>
            <span className="font-bold text-foreground">
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

type SidebarContentKey = 'summary' | 'prompts' | 'interpretation' | 'insights' | null;


const AnalyticsDashboardSection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [simulatedViewersData, setSimulatedViewersData] = useState<null | Array<{ month: string; viewers: number }>>(null);
  const [totalSimulatedViewers, setTotalSimulatedViewers] = useState<null | number>(null);
  const [activeSidebarContent, setActiveSidebarContent] = useState<SidebarContentKey>('summary'); // Default to summary

  useEffect(() => {
    setIsClient(true);
    // Simulate viewer data fetching only on client
    const viewers = [
      { month: "Jan", viewers: Math.floor(Math.random() * 50) + 10 },
      { month: "Feb", viewers: Math.floor(Math.random() * 60) + 15 },
      { month: "Mar", viewers: Math.floor(Math.random() * 70) + 20 },
      { month: "Apr", viewers: Math.floor(Math.random() * 80) + 25 },
      { month: "May", viewers: Math.floor(Math.random() * 90) + 30 },
      { month: "Jun", viewers: Math.floor(Math.random() * 100) + 35 },
    ];
    setSimulatedViewersData(viewers);
    const total = viewers.reduce((sum, item) => sum + item.viewers, 0) * 3 + 150; // Adjusted simulation logic
    setTotalSimulatedViewers(total);
  }, []); // Empty dependency array ensures this runs once on mount

  const cardAnimationDelay = (index: number) => `delay-${index * 100}`; // Staggered animation delay for cards
  const chartHeight = "h-[240px]"; // Consistent height for charts in the second row

   // Helper function to render sidebar content
  const renderSidebarContent = () => {
    switch (activeSidebarContent) {
      case 'summary':
        return (
          <div className="p-4 space-y-3">
            <h4 className="font-semibold text-primary">Summary</h4>
            <p className="text-sm text-muted-foreground">The dashboard suggests the primary audience consists of hiring managers and recruiters from mid-sized companies (51-200 employees) in the FinTech and Healthcare sectors. They are mainly looking for Business Analysts and Consultants, with specific interest in Salesforce and Requirements Elicitation.</p>
          </div>
        );
      case 'prompts':
        return (
          <div className="p-4 space-y-3">
            <h4 className="font-semibold text-primary">Example Prompts</h4>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                <li>"Summarize the key characteristics of the most frequent visitor segment."</li>
                <li>"Which industries show the highest interest in 'Functional Consulting' skills?"</li>
                <li>"Generate potential follow-up email templates for hiring managers in FinTech."</li>
                <li>"Identify potential skill gaps based on visitor interest."</li>
            </ul>
          </div>
        );
      case 'interpretation':
        return (
          <div className="p-4 space-y-3">
             <h4 className="font-semibold text-primary">Interpretation</h4>
             <p className="text-sm text-muted-foreground">
                 The data points towards a strong interest from established tech-focused companies seeking experienced BAs/Consultants. The focus on Salesforce and specific BA skills (Requirements, Process Modeling) indicates a need for practical implementation expertise. GTM support interest, while lower, suggests opportunities in strategic roles within these organizations.
             </p>
          </div>
        );
      case 'insights':
        return (
          <div className="p-4 space-y-3">
            <h4 className="font-semibold text-primary">Actionable Insights</h4>
             <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                 <li>Tailor project examples highlighting Salesforce CRM and Requirements Elicitation successes.</li>
                 <li>Emphasize experience within FinTech and Healthcare domains.</li>
                 <li>Consider adding case studies focused on GTM strategy support.</li>
                 <li>Highlight ability to bridge business needs and technical solutions for mid-sized companies.</li>
             </ul>
          </div>
        );
      default:
        return (
           <div className="p-4 text-center text-muted-foreground">
             <HelpCircle className="h-6 w-6 mx-auto mb-2" />
             Select an option from the left menu to view details.
           </div>
        );
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
        <CardContent className="p-6 md:p-8 space-y-8"> {/* Added space-y for vertical spacing */}
           {/* KPI Cards Row */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {/* Total Viewers */}
                <AnimatedSection animationClass="animate-fade-in-up" delay={cardAnimationDelay(0)} className="col-span-1">
                    <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/40 bg-background/70 flex flex-col">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Viewers</CardTitle>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Users className="h-4 w-4 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
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
                {/* Average Rating */}
                <AnimatedSection animationClass="animate-fade-in-up" delay={cardAnimationDelay(1)} className="col-span-1">
                    <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/40 bg-background/70 flex flex-col">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Average Rating</CardTitle>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Star className="h-4 w-4 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
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
                {/* Engagement Rate */}
                <AnimatedSection animationClass="animate-fade-in-up" delay={cardAnimationDelay(2)} className="col-span-1">
                    <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/40 bg-background/70 flex flex-col">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Engagement Rate</CardTitle>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Activity className="h-4 w-4 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
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
                {/* Viewers Trend */}
                <AnimatedSection animationClass="animate-fade-in-up" delay={cardAnimationDelay(3)} className="col-span-1">
                    <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/40 bg-background/70 flex flex-col">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Viewers Trend</CardTitle>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <TrendingUp className="h-4 w-4 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Simulated monthly visitor trend over the last 6 months.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col pt-4"> {/* Adjusted padding */}
                            <div className="flex items-baseline gap-1">
                                {!isClient || simulatedViewersData === null ? (
                                    <Skeleton className="h-6 w-16" />
                                ) : (
                                    <div className="text-2xl font-bold text-foreground">{simulatedViewersData[simulatedViewersData.length - 1].viewers}</div>
                                )}
                                <span className="text-xs text-muted-foreground">in Jun</span>
                            </div>
                            <div className="flex-grow h-[100px] w-full mt-2"> {/* Ensure full width */}
                                {!isClient || simulatedViewersData === null ? (
                                    <div className="flex items-center justify-center h-full">
                                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                                    </div>
                                ) : (
                                    <ChartContainer config={{ viewers: { label: "Viewers", color: "hsl(var(--chart-1))" } }} className="w-full h-full">
                                        <LineChart data={simulatedViewersData} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}> {/* Adjusted margins */}
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

            {/* Interest/Needs Row */}
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Skills Interest */}
                <AnimatedSection animationClass="animate-fade-in-up" delay={cardAnimationDelay(4)} className="col-span-1 lg:col-span-2">
                    <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/40 bg-background/70 flex flex-col">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Top Skills of Interest</CardTitle>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Target className="h-4 w-4 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Frequency of skills mentioned in feedback/needs.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        </CardHeader>
                        <CardContent className="flex-grow pt-4 space-y-2"> {/* Added spacing */}
                            <div className="text-lg font-bold text-foreground">{skillsInterestData[0].skill}</div>
                            <p className="text-xs text-muted-foreground">Most frequently mentioned</p>
                            <div className="flex-grow h-[200px] w-full"> {/* Increased height and ensured full width */}
                                <ChartContainer config={skillsInterestData.reduce((acc, cur) => ({ ...acc, [cur.skill]: { label: cur.skill, color: cur.fill } }), {})} className="w-full h-full">
                                    <BarChart data={skillsInterestData} layout="vertical" margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="skill" type="category" tickLine={false} axisLine={false} tickMargin={5} fontSize={10} width={90} interval={0} />
                                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                        <Bar dataKey="value" radius={4} barSize={16} > {/* Increased bar size */}
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

                {/* Top Domain Interest */}
                <AnimatedSection animationClass="animate-fade-in-up" delay={cardAnimationDelay(5)} className="col-span-1">
                    <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/40 bg-background/70 flex flex-col">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Top Domain Interest</CardTitle>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Zap className="h-4 w-4 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Most frequently mentioned domain in feedback/needs.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col items-center justify-center pt-4 space-y-2"> {/* Added spacing */}
                            <div className="text-2xl font-bold text-foreground" style={{ color: topDomain.fill }}>{topDomain.name}</div>
                            <p className="text-xs text-muted-foreground">Highest interest area</p>
                            <div className="h-[160px] w-[160px]"> {/* Increased size */}
                                <ChartContainer config={domainInterestData.reduce((acc, cur) => ({ ...acc, [cur.name]: { label: cur.name, color: cur.fill } }), {})} className="w-full h-full">
                                    <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}> {/* Added margin */}
                                    <ChartTooltip content={<ChartTooltipContent nameKey="name" hideIndicator />} />
                                    <Pie data={domainInterestData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={70} strokeWidth={2} > {/* Increased radius */}
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

           {/* Visitor Business Interest Summary Section - Reworked with integrated sidebar */}
            <AnimatedSection animationClass="animate-fade-in-up" delay={cardAnimationDelay(6)} className="col-span-1 sm:col-span-2 lg:col-span-4">
                <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/40 bg-muted/30 overflow-hidden"> {/* Added overflow-hidden */}
                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 pr-4 pl-6 border-b border-border/30">
                         <div className="flex items-center space-x-2">
                             <UsersRound className="h-5 w-5 text-primary" />
                             <CardTitle className="text-lg font-medium text-primary">Visitor Business Interest Summary</CardTitle>
                         </div>
                         {/* Removed Info Dialog Trigger */}
                     </CardHeader>

                    <div className="flex flex-col md:flex-row"> {/* Main flex container for charts + sidebar */}
                        {/* Charts Area */}
                        <CardContent className="p-6 pt-4 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10 flex-grow">
                             {/* Row 1 */}
                            {/* Company Name (Treemap) */}
                            <div className="col-span-1 flex flex-col space-y-3">
                                <h4 className="text-sm font-medium text-muted-foreground flex items-center justify-start">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Building2 className="h-4 w-4 mr-1.5 cursor-help"/>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Simulated distribution of interest by company name.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
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

                            {/* Company Size */}
                            <div className="col-span-1 flex flex-col space-y-3">
                                <h4 className="text-sm font-medium text-muted-foreground flex items-center justify-start">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <UsersRound className="h-4 w-4 mr-1.5 cursor-help"/>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Breakdown of visitor company sizes (simulated).</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
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

                            {/* Common Visitor Roles */}
                            <div className="col-span-1 flex flex-col space-y-3">
                                <h4 className="text-sm font-medium text-muted-foreground flex items-center justify-start">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Briefcase className="h-4 w-4 mr-1.5 cursor-help"/>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Common roles of visitors (simulated).</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
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

                             {/* Row 2 */}
                            {/* Industry */}
                            <div className="col-span-1 flex flex-col space-y-3">
                                <h4 className="text-sm font-medium text-muted-foreground flex items-center justify-start">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Factory className="h-4 w-4 mr-1.5 cursor-help"/>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Industries visitors commonly belong to (simulated).</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
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

                            {/* Major Requirement */}
                            <div className="col-span-1 flex flex-col space-y-3">
                                <h4 className="text-sm font-medium text-muted-foreground flex items-center justify-start">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Search className="h-4 w-4 mr-1.5 cursor-help"/>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Primary reasons visitors connect or roles they are looking to fill (simulated).</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
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

                            {/* Specific Skills Mentioned */}
                            <div className="col-span-1 flex flex-col space-y-3">
                                <h4 className="text-sm font-medium text-muted-foreground flex items-center justify-start">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Target className="h-4 w-4 mr-1.5 cursor-help"/>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Specific skills mentioned by visitors (simulated).</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
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

                        {/* Integrated Sidebar Area */}
                        <aside className="w-full md:w-1/3 lg:w-1/4 border-l border-border/30 bg-sidebar flex flex-col"> {/* Adjusted width */}
                            {/* Sidebar Navigation */}
                             <nav className="p-3 border-b border-border/30 flex flex-wrap gap-1 justify-center md:flex-col md:space-y-1 md:justify-start md:flex-nowrap">
                                 <Button
                                     variant={activeSidebarContent === 'summary' ? 'secondary' : 'ghost'}
                                     size="sm"
                                     className="w-full justify-start text-xs px-2 py-1.5"
                                     onClick={() => setActiveSidebarContent('summary')}
                                 >
                                     <BookOpen className="mr-2 h-3.5 w-3.5 flex-shrink-0" /> Summary
                                 </Button>
                                 <Button
                                     variant={activeSidebarContent === 'prompts' ? 'secondary' : 'ghost'}
                                     size="sm"
                                     className="w-full justify-start text-xs px-2 py-1.5"
                                     onClick={() => setActiveSidebarContent('prompts')}
                                 >
                                     <MessageSquare className="mr-2 h-3.5 w-3.5 flex-shrink-0" /> Prompts
                                 </Button>
                                 <Button
                                     variant={activeSidebarContent === 'interpretation' ? 'secondary' : 'ghost'}
                                     size="sm"
                                     className="w-full justify-start text-xs px-2 py-1.5"
                                     onClick={() => setActiveSidebarContent('interpretation')}
                                 >
                                     <Brain className="mr-2 h-3.5 w-3.5 flex-shrink-0" /> Interpretation
                                 </Button>
                                 <Button
                                     variant={activeSidebarContent === 'insights' ? 'secondary' : 'ghost'}
                                     size="sm"
                                     className="w-full justify-start text-xs px-2 py-1.5"
                                     onClick={() => setActiveSidebarContent('insights')}
                                 >
                                     <Lightbulb className="mr-2 h-3.5 w-3.5 flex-shrink-0" /> Insights
                                 </Button>
                             </nav>

                             {/* Sidebar Content Area */}
                             <div className="flex-grow overflow-y-auto p-4 bg-background"> {/* Use background color */}
                                {renderSidebarContent()}
                             </div>
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

