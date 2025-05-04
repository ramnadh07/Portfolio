
"use client"

import React, { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Cell, RadialBar, RadialBarChart, Tooltip as RechartsTooltip } from "recharts"; // Renamed Tooltip to RechartsTooltip
import AnimatedSection from "./animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Users, Target, Star, TrendingUp, Handshake, Zap, UsersRound, Activity, Loader2, Building2, Briefcase, Factory } from "lucide-react"; // Added Building2, Briefcase, Factory icons
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; // Import Shadcn Tooltip components

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

// Visitor Needs Summary Data (Simulated)
const needsSummaryData = {
    companySize: [
        { name: "1-10", value: 15, fill: "hsl(var(--chart-1))" },
        { name: "11-50", value: 25, fill: "hsl(var(--chart-2))" },
        { name: "51-200", value: 35, fill: "hsl(var(--chart-3))" },
        { name: "201-1000", value: 18, fill: "hsl(var(--chart-4))" },
        { name: "1000+", value: 7, fill: "hsl(var(--chart-5))" },
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
    skillsMentioned: [ // Re-using skillsInterestData format for consistency
        { skill: "Salesforce", value: 55, fill: "hsl(var(--chart-1))" },
        { skill: "Req. Elicitation", value: 70, fill: "hsl(var(--chart-2))" },
        { skill: "Process Model.", value: 45, fill: "hsl(var(--chart-3))" },
        { skill: "GTM Support", value: 30, fill: "hsl(var(--chart-4))" },
        { skill: "Data Analysis", value: 25, fill: "hsl(var(--chart-5))" },
        { skill: "UAT", value: 15, fill: "hsl(var(--chart-1) / 0.6)" },
    ]
};


const AnalyticsDashboardSection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [simulatedViewersData, setSimulatedViewersData] = useState<null | Array<{ month: string; viewers: number }>>(null);
  const [totalSimulatedViewers, setTotalSimulatedViewers] = useState<null | number>(null);

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

  const cardAnimationDelay = (index: number) => `delay-${index * 100}`; // Staggered animation delay for cards

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
        <CardContent className="p-6 md:p-8">
           {/* KPI Cards Row */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
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
                        <CardContent className="flex-grow flex flex-col"> {/* Use flex-grow */}
                        {!isClient || simulatedViewersData === null ? (
                            <Skeleton className="h-6 w-16 mb-1" />
                        ) : (
                            <div className="text-lg font-bold text-foreground">{simulatedViewersData[simulatedViewersData.length - 1].viewers} <span className="text-xs text-muted-foreground">in Jun</span></div>
                        )}
                        <div className="flex-grow mt-2 h-[100px]"> {/* Allow chart to grow */}
                            {!isClient || simulatedViewersData === null ? (
                                <div className="flex items-center justify-center h-full">
                                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                                </div>
                            ) : (
                                <ChartContainer config={{ viewers: { label: "Viewers", color: "hsl(var(--chart-1))" } }}>
                                <LineChart data={simulatedViewersData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
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
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
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
                        <CardContent className="flex-grow pt-2">
                        <div className="text-lg font-bold text-foreground">{skillsInterestData[0].skill}</div>
                        <p className="text-xs text-muted-foreground mb-2">Most frequently mentioned</p>
                        <div className="flex-grow h-[160px]"> {/* Adjusted height */}
                            <ChartContainer config={skillsInterestData.reduce((acc, cur) => ({ ...acc, [cur.skill]: { label: cur.skill, color: cur.fill } }), {})}>
                            <BarChart data={skillsInterestData} layout="vertical" margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                                <XAxis type="number" hide />
                                <YAxis dataKey="skill" type="category" tickLine={false} axisLine={false} tickMargin={5} fontSize={10} width={90} interval={0} />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                <Bar dataKey="value" radius={4} barSize={12} >
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
                        <CardContent className="flex-grow flex flex-col items-center justify-center pt-2">
                            <div className="text-xl font-bold text-foreground" style={{ color: topDomain.fill }}>{topDomain.name}</div>
                            <p className="text-xs text-muted-foreground mb-2">Highest interest area</p>
                            <div className="h-[120px] w-[120px]"> {/* Adjusted size */}
                                <ChartContainer config={domainInterestData.reduce((acc, cur) => ({ ...acc, [cur.name]: { label: cur.name, color: cur.fill } }), {})}>
                                    <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                                    <ChartTooltip content={<ChartTooltipContent nameKey="name" hideIndicator />} />
                                    <Pie data={domainInterestData} dataKey="value" nameKey="name" innerRadius={30} outerRadius={55} strokeWidth={1} >
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

           {/* Visitor Needs Summary Section */}
            <AnimatedSection animationClass="animate-fade-in-up" delay={cardAnimationDelay(6)} className="col-span-1 sm:col-span-2 lg:col-span-4">
                <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/40 bg-background/70">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-medium">Visitor Needs Summary</CardTitle>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <UsersRound className="h-4 w-4 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Breakdown of primary reasons visitors connect (from feedback).</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </CardHeader>
                    <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                         {/* Company Size */}
                         <div className="col-span-1">
                            <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                                <Building2 className="h-4 w-4 mr-1.5"/> Company Size
                            </h4>
                            <div className="h-[150px]">
                                <ChartContainer config={needsSummaryData.companySize.reduce((acc, cur) => ({ ...acc, [cur.name]: { label: cur.name, color: cur.fill } }), {})}>
                                    <BarChart data={needsSummaryData.companySize} layout="vertical" margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tickMargin={5} fontSize={10} width={60} interval={0} />
                                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                        <Bar dataKey="value" radius={4} barSize={10}>
                                        {needsSummaryData.companySize.map((entry) => (
                                            <Cell key={`cell-comp-${entry.name}`} fill={entry.fill} />
                                        ))}
                                        </Bar>
                                    </BarChart>
                                </ChartContainer>
                            </div>
                         </div>

                         {/* Role */}
                          <div className="col-span-1">
                             <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                                 <Briefcase className="h-4 w-4 mr-1.5"/> Visitor Role
                             </h4>
                             <div className="h-[150px]">
                                <ChartContainer config={needsSummaryData.roles.reduce((acc, cur) => ({ ...acc, [cur.name]: { label: cur.name, color: cur.fill } }), {})}>
                                    <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                                        <ChartTooltip content={<ChartTooltipContent nameKey="name" hideIndicator />} />
                                        <Pie data={needsSummaryData.roles} dataKey="value" nameKey="name" innerRadius={30} outerRadius={50} strokeWidth={1}>
                                            {needsSummaryData.roles.map((entry) => (
                                            <Cell key={`cell-role-${entry.name}`} fill={entry.fill} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ChartContainer>
                             </div>
                          </div>

                         {/* Industry */}
                          <div className="col-span-1">
                             <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                                 <Factory className="h-4 w-4 mr-1.5"/> Visitor Industry
                             </h4>
                             <div className="h-[150px]">
                                 <ChartContainer config={needsSummaryData.industries.reduce((acc, cur) => ({ ...acc, [cur.name]: { label: cur.name, color: cur.fill } }), {})}>
                                     <BarChart data={needsSummaryData.industries} layout="horizontal" margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                                         <XAxis dataKey="name" type="category" tickLine={false} axisLine={false} tickMargin={5} fontSize={9} interval={0} angle={-30} dx={-5} dy={10} height={40}/>
                                         <YAxis type="number" hide/>
                                         <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                         <Bar dataKey="value" radius={4} barSize={15}>
                                            {needsSummaryData.industries.map((entry) => (
                                             <Cell key={`cell-ind-${entry.name}`} fill={entry.fill} />
                                             ))}
                                         </Bar>
                                     </BarChart>
                                 </ChartContainer>
                             </div>
                          </div>

                         {/* Looking For */}
                         <div className="col-span-1 md:col-span-2"> {/* Span 2 cols on medium */}
                            <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                                <Handshake className="h-4 w-4 mr-1.5"/> Primary Need / Reason for Connecting
                            </h4>
                            <div className="h-[150px]">
                                 <ChartContainer config={needsSummaryData.lookingFor.reduce((acc, cur) => ({ ...acc, [cur.name]: { label: cur.name, color: cur.fill } }), {})}>
                                     <BarChart data={needsSummaryData.lookingFor} layout="horizontal" margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                                         <XAxis dataKey="name" type="category" tickLine={false} axisLine={false} tickMargin={5} fontSize={10} interval={0}/>
                                         <YAxis type="number" hide/>
                                         <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                         <Bar dataKey="value" radius={5}>
                                            {needsSummaryData.lookingFor.map((entry) => (
                                             <Cell key={`cell-needs-${entry.name}`} fill={entry.fill} />
                                             ))}
                                         </Bar>
                                     </BarChart>
                                 </ChartContainer>
                            </div>
                         </div>

                         {/* Skills Mentioned */}
                         <div className="col-span-1 md:col-span-1"> {/* Span 1 col on medium */}
                            <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                                <Target className="h-4 w-4 mr-1.5"/> Specific Skills Mentioned
                            </h4>
                            <div className="h-[150px]">
                                <ChartContainer config={needsSummaryData.skillsMentioned.reduce((acc, cur) => ({ ...acc, [cur.skill]: { label: cur.skill, color: cur.fill } }), {})}>
                                    <BarChart data={needsSummaryData.skillsMentioned} layout="vertical" margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="skill" type="category" tickLine={false} axisLine={false} tickMargin={5} fontSize={10} width={85} interval={0} />
                                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                        <Bar dataKey="value" radius={4} barSize={10}>
                                        {needsSummaryData.skillsMentioned.map((entry) => (
                                            <Cell key={`cell-skill-mention-${entry.skill}`} fill={entry.fill} />
                                        ))}
                                        </Bar>
                                    </BarChart>
                                </ChartContainer>
                            </div>
                         </div>
                    </CardContent>
                </Card>
            </AnimatedSection>


        </CardContent>
      </Card>
    </AnimatedSection>
  );
};

export default AnalyticsDashboardSection;

