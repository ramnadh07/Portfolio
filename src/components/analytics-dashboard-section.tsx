
"use client"

import React from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis, Cell } from "recharts";
import AnimatedSection from "./animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { Users, BarChart3, Star, TrendingUp, Target } from "lucide-react";

// Mock Data for Charts
const viewersData = [
  { month: "Jan", viewers: Math.floor(Math.random() * 50) + 10 },
  { month: "Feb", viewers: Math.floor(Math.random() * 60) + 15 },
  { month: "Mar", viewers: Math.floor(Math.random() * 70) + 20 },
  { month: "Apr", viewers: Math.floor(Math.random() * 80) + 25 },
  { month: "May", viewers: Math.floor(Math.random() * 90) + 30 },
  { month: "Jun", viewers: Math.floor(Math.random() * 100) + 35 },
];

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

const ratingsData = [
  { rating: 10, count: 15, fill: "hsl(var(--chart-1))" },
  { rating: 9, count: 25, fill: "hsl(var(--chart-2))" },
  { rating: 8, count: 18, fill: "hsl(var(--chart-3))" },
  { rating: 7, count: 10, fill: "hsl(var(--chart-4))" },
  { rating: 6, count: 5, fill: "hsl(var(--chart-5))" },
  { rating: 5, count: 2, fill: "hsl(var(--chart-1) / 0.6)" },
];

// Calculate average rating
const totalRatingSum = ratingsData.reduce((sum, item) => sum + item.rating * item.count, 0);
const totalRatingsCount = ratingsData.reduce((sum, item) => sum + item.count, 0);
const averageRating = totalRatingsCount > 0 ? (totalRatingSum / totalRatingsCount).toFixed(1) : "N/A";


const AnalyticsDashboardSection: React.FC = () => {
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
        <CardContent className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

          {/* Viewers Over Time */}
          <Card className="col-span-1 md:col-span-2 lg:col-span-1 shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/40 bg-background/70">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Viewers This Year</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{viewersData[viewersData.length - 1].viewers * 6 + 100} <span className="text-xs text-muted-foreground"> (Simulated Total)</span></div>
              <div className="h-[120px] mt-4">
                 <ChartContainer config={{ viewers: { label: "Viewers", color: "hsl(var(--chart-1))" } }}>
                  <LineChart data={viewersData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} dy={10} fontSize={10} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={10} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" hideLabel />} />
                    <Line dataKey="viewers" type="monotone" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
                  </LineChart>
                </ChartContainer>
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
               <div className="text-2xl font-bold text-foreground">{skillsInterestData[0].skill}</div>
              <p className="text-xs text-muted-foreground">Most frequently mentioned skill</p>
               <div className="h-[120px] mt-4">
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


          {/* Average Rating */}
          <Card className="col-span-1 shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/40 bg-background/70">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{averageRating}/10</div>
              <p className="text-xs text-muted-foreground">Based on {totalRatingsCount} simulated ratings</p>
               <div className="h-[120px] mt-4 flex items-center justify-center">
                <ChartContainer config={ratingsData.reduce((acc, cur) => ({ ...acc, [cur.rating]: { label: `${cur.rating} Stars`, color: cur.fill } }), {})}>
                   <BarChart data={ratingsData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                     {/* Minimalist bar chart showing distribution */}
                     <XAxis dataKey="rating" hide />
                     <YAxis hide/>
                     <ChartTooltip cursor={false} content={<ChartTooltipContent formatter={(value, name) => `${value} votes`} />} />
                     <Bar dataKey="count" radius={2}>
                      {ratingsData.map((entry) => (
                          <Cell key={`cell-${entry.rating}`} fill={entry.fill} />
                       ))}
                     </Bar>
                   </BarChart>
                 </ChartContainer>
               </div>
            </CardContent>
          </Card>


         {/* Domain Interest - Pie Chart */}
          <Card className="col-span-1 md:col-span-2 lg:col-span-3 shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/40 bg-background/70">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Domain Interest Distribution</CardTitle>
               <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-[250px] md:h-[200px]">
              <ChartContainer config={domainInterestData.reduce((acc, cur) => ({ ...acc, [cur.name]: { label: cur.name, color: cur.fill } }), {})}>
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent nameKey="name" hideIndicator />} />
                  <Pie
                    data={domainInterestData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    innerRadius={40}
                    strokeWidth={2}
                    labelLine={false}
                   // label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                     {domainInterestData.map((entry) => (
                       <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                     ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs mt-4">
                 {domainInterestData.map((entry) => (
                   <div key={entry.name} className="flex items-center gap-1.5">
                     <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.fill }} />
                     {entry.name}
                   </div>
                 ))}
               </div>
            </CardContent>
          </Card>

        </CardContent>
      </Card>
    </AnimatedSection>
  );
};

export default AnalyticsDashboardSection;
