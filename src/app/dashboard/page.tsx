'use client';

import * as React from 'react';
import {
  ArrowUpRight,
  BarChart2,
  Calendar,
  MoreHorizontal,
  Plus,
  Shuffle,
  TrendingUp,
  FunctionSquare,
  Gem,
  Atom,
  Users,
  Video,
  Clock,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import Image from 'next/image';

const AnalyticsChart = () => {
  const chartConfig: ChartConfig = {
    activity: {
      label: 'Activity',
      color: 'hsl(var(--primary))',
    },
    inactive: {
      label: 'Inactive',
      color: 'hsl(var(--muted))',
    },
  };

  const chartData = [
    { day: 'S', activity: 20, inactive: 80, fill: 'var(--color-inactive)' },
    { day: 'M', activity: 50, inactive: 50, fill: 'var(--color-inactive)' },
    { day: 'T', activity: 75, inactive: 25, fill: 'var(--color-activity)' },
    { day: 'W', activity: 60, inactive: 40, fill: 'var(--color-activity)' },
    { day: 'T', activity: 30, inactive: 70, fill: 'var(--color-inactive)' },
    { day: 'F', activity: 45, inactive: 55, fill: 'var(--color-inactive)' },
    { day: 'S', activity: 25, inactive: 75, fill: 'var(--color-inactive)' },
  ];

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart accessibilityLayer data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
        <Bar dataKey="activity" radius={8} />
      </BarChart>
    </ChartContainer>
  );
};

const ProgressCircle = ({ progress }: { progress: number }) => {
    const strokeWidth = 10;
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center">
            <svg width="200" height="200" viewBox="0 0 200 200" className="-rotate-90">
                <circle
                    stroke="hsl(var(--muted))"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx="100"
                    cy="100"
                />
                <circle
                    stroke="hsl(var(--primary))"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    r={radius}
                    cx="100"
                    cy="100"
                    strokeLinecap="round"
                />
                 <circle
                    className="animate-[pulse_1s_ease-in-out_infinite]"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    r={radius}
                    cx="100"
                    cy="100"
                    strokeLinecap="round"
                >
                    <animateTransform 
                        attributeName="transform"
                        type="rotate"
                        from="0 100 100"
                        to="360 100 100"
                        dur="10s"
                        repeatCount="indefinite"
                    />
                 </circle>
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="text-5xl font-bold">{progress}%</span>
                <span className="text-muted-foreground">Profile Complete</span>
            </div>
        </div>
    );
};


export default function DashboardPage() {
  const statsCards = [
    {
      title: 'Total Documents',
      value: '24',
      change: 'Increased from last month',
      icon: TrendingUp,
      isPrimary: true,
    },
    {
      title: 'Archived Records',
      value: '10',
      change: 'Increased from last month',
      icon: TrendingUp,
    },
    {
      title: 'Active Reminders',
      value: '12',
      change: 'Increased from last month',
      icon: TrendingUp,
    },
    {
      title: 'Pending Lab Results',
      value: '2',
      change: 'On Discuss',
      icon: TrendingUp,
    },
  ];

  const projectItems = [
    { icon: Shuffle, title: 'Develop API Endpoints', due: 'Nov 28, 2024', color: 'text-blue-500' },
    { icon: TrendingUp, title: 'Onboarding Flow', due: 'Nov 28, 2024', color: 'text-green-500' },
    { icon: FunctionSquare, title: 'Build Dashboard', due: 'Nov 30, 2024', color: 'text-yellow-500' },
    { icon: Gem, title: 'Optimize Page Load', due: 'Dec 5, 2024', color: 'text-orange-500' },
    { icon: Atom, title: 'Cross-Browser Testing', due: 'Dec 6, 2024', color: 'text-purple-500' },
  ];

  const appointments = [
    { name: 'Dr. Sarah Johnson', specialty: 'Cardiologist', avatar: 'https://placehold.co/40x40.png', hint: 'woman doctor smiling', date: 'Dec 1, 2024', time: '10:00 AM' },
    { name: 'Dr. Michael Lee', specialty: 'Dermatologist', avatar: 'https://placehold.co/40x40.png', hint: 'man doctor portrait', date: 'Dec 5, 2024', time: '02:30 PM' },
    { name: 'Dr. Emily Chen', specialty: 'Pediatrician', avatar: 'https://placehold.co/40x40.png', hint: 'woman doctor glasses', date: 'Dec 10, 2024', time: '11:15 AM' },
    { name: 'Dr. David Oshodi', specialty: 'General Practitioner', avatar: 'https://placehold.co/40x40.png', hint: 'man smiling', date: 'Dec 12, 2024', time: '09:00 AM' },
  ];

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Plan, prioritize, and accomplish your tasks with ease.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline"><Plus className="mr-2 h-4 w-4" /> Add Project</Button>
          <Button>Import Data</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card, index) => (
          <Card key={index} className={card.isPrimary ? 'bg-primary text-primary-foreground' : ''}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <div className={`p-1.5 rounded-full ${card.isPrimary ? 'bg-white/20' : 'bg-secondary'}`}>
                    <card.icon className={`h-5 w-5 ${card.isPrimary ? '' : 'text-primary'}`} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{card.value}</div>
              <div className="flex items-center text-xs mt-2 opacity-80">
                <div className={`p-0.5 rounded-full mr-1.5 ${card.isPrimary ? 'bg-white/20' : 'bg-primary text-primary-foreground'}`}>
                    <TrendingUp className="h-3 w-3"/>
                </div>
                <span>{card.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Health Analytics</CardTitle>
              <CardDescription>An overview of your recent activity.</CardDescription>
            </div>
            <Button variant="outline" size="sm">View Details</Button>
          </CardHeader>
          <CardContent className="h-[250px]">
            <AnalyticsChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Reminders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4">
                <h3 className="font-semibold">Meeting with Arc Company</h3>
                <p className="text-sm text-muted-foreground">Time: 02.00 pm - 04.00 pm</p>
                <div className="flex items-center gap-2 mt-2">
                    <Button size="sm" className="w-full"><Video className="mr-2"/> Start Meeting</Button>
                    <Button size="sm" variant="outline" className="w-full"><Calendar className="mr-2"/> Reschedule</Button>
                </div>
            </div>
             <div className="rounded-lg border p-4">
                <h3 className="font-semibold">Dentist Appointment</h3>
                <p className="text-sm text-muted-foreground">Time: Tomorrow, 10.00 am</p>
                <Button size="sm" variant="outline" className="w-full mt-2">View Details</Button>
            </div>
          </CardContent>
        </Card>
      </div>

       <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
                <CardHeader className="flex-row items-center justify-between">
                    <CardTitle>Doctor's Appointments</CardTitle>
                    <Button variant="outline" size="sm"><Plus className="mr-2 h-4 w-4"/> Schedule New</Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {appointments.map((appointment, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage src={appointment.avatar} data-ai-hint={appointment.hint}/>
                                        <AvatarFallback>{appointment.name.replace("Dr. ", "").split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{appointment.name}</p>
                                        <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium">{appointment.date}</p>
                                    <p className="text-sm text-muted-foreground">{appointment.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Profile Progress</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                    <ProgressCircle progress={41} />
                     <div className="flex items-center gap-4 text-sm mt-4">
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /> Completed</div>
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-400" /> In Progress</div>
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-400" /> Pending</div>
                     </div>
                </CardContent>
            </Card>
       </div>

       <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
                <CardHeader className="flex-row items-center justify-between">
                    <CardTitle>Project</CardTitle>
                     <Button variant="outline" size="sm"><Plus className="mr-2 h-4 w-4"/> New</Button>
                </CardHeader>
                <CardContent>
                    {projectItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-3 border-b last:border-none">
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-lg bg-secondary ${item.color}`}>
                                    <item.icon className="h-5 w-5 text-background" />
                                </div>
                                <div>
                                    <p className="font-semibold">{item.title}</p>
                                    <p className="text-sm text-muted-foreground">Due date: {item.due}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                               <Users className="h-4 w-4 text-muted-foreground"/>
                               <span className="text-sm text-muted-foreground">4</span>
                               <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
            <Card className="relative overflow-hidden">
                <Image src="https://placehold.co/600x400.png" alt="Abstract background" data-ai-hint="abstract waves" fill className="object-cover opacity-20"/>
                 <div className="relative z-10 h-full flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-white">Time Tracker</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col items-center justify-center text-white">
                        <div className="text-6xl font-bold tracking-widest">
                            01:24:08
                        </div>
                        <div className="flex gap-4 mt-4">
                            <Button size="icon" className="rounded-full h-14 w-14 bg-white/20 backdrop-blur-sm hover:bg-white/30">
                                <Clock className="h-8 w-8"/>
                            </Button>
                            <Button size="icon" className="rounded-full h-14 w-14 bg-red-500 hover:bg-red-600">
                                <Plus className="h-8 w-8 rotate-45"/>
                            </Button>
                        </div>
                    </CardContent>
                 </div>
            </Card>
       </div>
    </div>
  );
}
