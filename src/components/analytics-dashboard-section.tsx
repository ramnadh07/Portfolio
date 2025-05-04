
"use client"

import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Cell, RadialBar, RadialBarChart } from "recharts";
import AnimatedSection from "./animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Users, Target, Star, TrendingUp, Handshake, Zap, UsersRound, Activity, Loader2 } from "lucide-react"; // Added Loader2 for loading state
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

// Static Mock Data (moved random generation to useEffect)
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

// Calculate average rating (can be done statically if ratingsData is static)
const totalRatingSum = ratingsData.reduce((sum, item) => sum + item.rating * item.count, 0);
const totalRatingsCount = ratingsData.reduce((sum, item) => sum + item.count, 0);
const averageRating = totalRatingsCount > 0 ? (totalRatingSum / totalRatingsCount).toFixed(1) : "N/A";

// Engagement Rate Data (Simulated)
const engagementRate = 68; // Example percentage
const engagementData = [
    { name: 'engagement', value: engagementRate, fill: 'hsl(var(--chart-1))' },
    { name: 'remainder', value: 100 - engagementRate, fill: 'hsl(var(--muted) / 0.3)' },
];

// Needs Summary (Simulated from feedback)
const needsSummary = {
    "Project Roles": 45,
    "Collaboration": 30,
    "Strategic Insights": 20,
    "General Inquiry": 5,
};
const needsData = Object.entries(needsSummary).map(([name, value], i) => ({
    name, value, fill: `hsl(var(--chart-${(i % 5) + 1}))`
}));

const AnalyticsDashboardSection: React.FC = () => {
  const [isClient, setIsClient] = useState(false); // State to track client-side mount
  const [simulatedViewersData, setSimulatedViewersData] = useState<null | Array<{ month: string; viewers: number }>>(null);
  const [totalSimulatedViewers, setTotalSimulatedViewers] = useState<null | number>(null);

  useEffect(() => {
    // This code runs only on the client, after hydration
    setIsClient(true);

    // Generate viewers data with Math.random()
    const viewers = [
      { month: "Jan", viewers: Math.floor(Math.random() * 50) + 10 },
      { month: "Feb", viewers: Math.floor(Math.random() * 60) + 15 },
      { month: "Mar", viewers: Math.floor(Math.random() * 70) + 20 },
      { month: "Apr", viewers: Math.floor(Math.random() * 80) + 25 },
      { month: "May", viewers: Math.floor(Math.random() * 90) + 30 },
      { month: "Jun", viewers: Math.floor(Math.random() * 100) + 35 },
    ];
    setSimulatedViewersData(viewers);

    // Calculate total viewers based on the generated data
    const total = viewers.reduce((sum, item) => sum + item.viewers, 0) * 3 + 150; // More realistic total
    setTotalSimulatedViewers(total);

  }, []); // Empty dependency array ensures this runs once on mount

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
        <CardContent className="p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

          {/* KPI Cards Row */}
          <Card className="col-span-1 shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/40 bg-background/70">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Viewers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {!isClient || totalSimulatedViewers === null ? (
                 <Skeleton className="h-7 w-24" />
              ) : (
                <div className="text-2xl font-bold text-foreground">{totalSimulatedViewers.toLocaleString()}</div>
              )}
              <p className="text-xs text-muted-foreground">(Simulated)</p>
            </CardContent>
          </Card>
          <Card className="col-span-1 shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/40 bg-background/70">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {/* Average rating is static based on static data, so no loading needed unless ratingsData were dynamic */}
              <div className="text-2xl font-bold text-foreground">{averageRating}/10</div>
              <p className="text-xs text-muted-foreground">from {totalRatingsCount} ratings</p>
            </CardContent>
          </Card>
          <Card className="col-span-1 shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/40 bg-background/70">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Engagement Rate</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
               {/* Static data, no loading needed */}
               <div className="text-2xl font-bold text-foreground">{engagementRate}%</div>
               <p className="text-xs text-muted-foreground">Feedback form interaction</p>
            </CardContent>
          </Card>

           {/* Viewers Over Time */}
          <Card className="col-span-1 sm:col-span-2 lg:col-span-1 shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/40 bg-background/70">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Viewers Trend</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
               {!isClient || simulatedViewersData === null ? (
                 <Skeleton className="h-6 w-16 mb-1" />
               ) : (
                 <div className="text-lg font-bold text-foreground">{simulatedViewersData[simulatedViewersData.length - 1].viewers} <span className="text-xs text-muted-foreground">in Jun</span></div>
               )}
               <div className="h-[100px] mt-2">
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

          {/* Skills Interest */}
           <Card className="col-span-1 shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/40 bg-background/70">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Top Skills of Interest</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
               {/* Static data */}
               <div className="text-lg font-bold text-foreground">{skillsInterestData[0].skill}</div>
              <p className="text-xs text-muted-foreground">Most frequently mentioned</p>
               <div className="h-[100px] mt-2">
                  <ChartContainer config={skillsInterestData.reduce((acc, cur) => ({ ...acc, [cur.skill]: { label: cur.skill, color: cur.fill } }), {})}>
                  <BarChart data={skillsInterestData} layout="vertical" margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                     <XAxis type="number" hide />
                     <YAxis dataKey="skill" type="category" tickLine={false} axisLine={false} tickMargin={5} fontSize={10} width={80} />
                     <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                     <Bar dataKey="value" radius={4} >
                       {skillsInterestData.map((entry) => (
                        <Cell key={`cell-${entry.skill}`} fill={entry.fill} />
                       ))}
                     </Bar>
                  </BarChart>
                 </ChartContainer>
               </div>
            </CardContent>
          </Card>


         {/* Top Domain Interest */}
          <Card className="col-span-1 shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/40 bg-background/70">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Top Domain Interest</CardTitle>
               <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-[140px]">
                {/* Static data */}
                <div className="text-lg font-bold text-foreground" style={{ color: topDomain.fill }}>{topDomain.name}</div>
                <p className="text-xs text-muted-foreground mb-2">Highest interest area</p>
                <ChartContainer config={domainInterestData.reduce((acc, cur) => ({ ...acc, [cur.name]: { label: cur.name, color: cur.fill } }), {})}>
                    <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <ChartTooltip content={<ChartTooltipContent nameKey="name" hideIndicator />} />
                    <Pie data={domainInterestData} dataKey="value" nameKey="name" innerRadius={25} outerRadius={35} strokeWidth={1} >
                        {domainInterestData.map((entry) => (
                        <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                        ))}
                    </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
          </Card>

           {/* Needs Summary */}
          <Card className="col-span-1 sm:col-span-2 lg:col-span-3 shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/40 bg-background/70">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Visitor Needs Summary</CardTitle>
               <UsersRound className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="h-[150px] pt-4">
                {/* Static data */}
                <ChartContainer config={needsData.reduce((acc, cur) => ({ ...acc, [cur.name]: { label: cur.name, color: cur.fill } }), {})}>
                    <BarChart data={needsData} layout="horizontal" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                        <XAxis dataKey="name" type="category" tickLine={false} axisLine={false} tickMargin={5} fontSize={10} interval={0}/>
                        <YAxis type="number" hide/>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Bar dataKey="value" radius={5}>
                           {needsData.map((entry) => (
                            <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
          </Card>

        </CardContent>
      </Card>
    </AnimatedSection>
  );
};

export default AnalyticsDashboardSection;

