'use client';

import * as React from 'react';
import {
  Calendar,
  Plus,
  TrendingUp,
  Video,
} from 'lucide-react';

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
import Link from 'next/link';

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

  const appointments = [
    { id: 'appt-1', name: 'Dr. Sarah Johnson', specialty: 'Cardiologist', avatar: 'https://placehold.co/40x40/A9D5E5/333333.png', hint: 'woman doctor smiling', date: 'Dec 1, 2024', time: '10:00 AM' },
    { id: 'appt-2', name: 'Dr. Michael Lee', specialty: 'Dermatologist', avatar: 'https://placehold.co/40x40/F3D6E4/333333.png', hint: 'man doctor portrait', date: 'Dec 5, 2024', time: '02:30 PM' },
    { id: 'appt-3', name: 'Dr. Emily Chen', specialty: 'Pediatrician', avatar: 'https://placehold.co/40x40/D4EDDA/333333.png', hint: 'woman doctor glasses', date: 'Dec 10, 2024', time: '11:15 AM' },
    { id: 'appt-4', name: 'Dr. David Oshodi', specialty: 'General Practitioner', avatar: 'https://placehold.co/40x40/FFF3CD/333333.png', hint: 'man smiling', date: 'Dec 12, 2024', time: '09:00 AM' },
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
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/analytics">View Details</Link>
            </Button>
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

       <div className="grid grid-cols-1 gap-6">
            <Card>
                <CardHeader className="flex-row items-center justify-between">
                    <CardTitle>Doctor's Appointments</CardTitle>
                    <Button variant="outline" size="sm"><Plus className="mr-2 h-4 w-4"/> Schedule New</Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-1">
                        {appointments.map((appointment) => (
                            <Link href={`/dashboard/appointments/${appointment.id}`} key={appointment.id} className="block -mx-2">
                                <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted">
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
                            </Link>
                        ))}
                    </div>
                </CardContent>
            </Card>
       </div>
    </div>
  );
}
