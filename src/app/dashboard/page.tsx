'use client';

import * as React from 'react';
import {
  Plus,
  TrendingUp,
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
import placeholderImages from '@/lib/placeholder-images.json';
import { initialUsers, UserProfile } from '@/lib/family-members';

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

const dashboardData: { [key: number]: any } = {
    1: { // Jane Doe
        statsCards: [
            { title: 'Total Documents', value: '24', change: 'Increased from last month', icon: TrendingUp, isPrimary: true },
            { title: 'Archived Records', value: '10', change: 'Increased from last month', icon: TrendingUp },
            { title: 'Active Reminders', value: '12', change: 'Increased from last month', icon: TrendingUp },
            { title: 'Pending Lab Results', value: '2', change: 'On Discuss', icon: TrendingUp },
        ],
        appointments: [
            { id: 'appt-1', name: 'Dr. Sarah Johnson', specialty: 'Cardiologist', avatar: placeholderImages.doctorAvatar1, hint: 'woman doctor smiling', date: 'Dec 1, 2024', time: '10:00 AM' },
            { id: 'appt-2', name: 'Dr. Michael Lee', specialty: 'Dermatologist', avatar: placeholderImages.doctorAvatar2, hint: 'man doctor portrait', date: 'Dec 5, 2024', time: '02:30 PM' },
        ],
        title: 'Dashboard',
        description: 'Plan, prioritize, and accomplish your tasks with ease.',
        reminders: [
            {
                title: 'Cardiology Follow-up',
                description: 'Check in with Dr. Johnson about your angina.',
                href: '/dashboard/appointments/appt-1',
                cta: 'View Appointment'
            },
            {
                title: 'Re-test Cholesterol',
                description: 'Follow up on your annual check-up results.',
                href: '/dashboard/documents/doc1',
                cta: 'View Report'
            },
        ],
    },
    2: { // John Doe
        statsCards: [
            { title: 'Total Documents', value: '15', change: 'Stable', icon: TrendingUp, isPrimary: true },
            { title: 'Archived Records', value: '3', change: 'Stable', icon: TrendingUp },
            { title: 'Active Reminders', value: '2', change: '1 new', icon: TrendingUp },
            { title: 'Pending Lab Results', value: '0', change: 'All clear', icon: TrendingUp },
        ],
        appointments: [
            { id: 'appt-4', name: 'Dr. David Oshodi', specialty: 'General Practitioner', avatar: placeholderImages.doctorAvatar4, hint: 'man smiling', date: 'Dec 12, 2024', time: '09:00 AM' },
        ],
        title: 'John\'s Dashboard',
        description: 'An overview of John\'s health records.',
        reminders: [
            {
                title: 'Neurology Consultation',
                description: 'Follow up on CT scan results for chronic headaches.',
                href: '/dashboard/documents/doc11',
                cta: 'View Report'
            },
        ],
    },
    3: { // Jimmy Doe
        statsCards: [
            { title: 'Total Documents', value: '5', change: '1 new', icon: TrendingUp, isPrimary: true },
            { title: 'Archived Records', value: '1', change: 'Stable', icon: TrendingUp },
            { title: 'Upcoming Vaccinations', value: '1', change: 'Next month', icon: TrendingUp },
            { title: 'School Forms', value: '2', change: '1 pending', icon: TrendingUp },
        ],
        appointments: [
            { id: 'appt-3', name: 'Dr. Emily Chen', specialty: 'Pediatrician', avatar: placeholderImages.doctorAvatar3, hint: 'woman doctor glasses', date: 'Dec 10, 2024', time: '11:15 AM' },
        ],
        title: 'Jimmy\'s Dashboard',
        description: 'An overview of Jimmy\'s health records.',
        reminders: [
            {
                title: 'Annual Pediatric Check-up',
                description: 'Appointment with Dr. Emily Chen.',
                href: '/dashboard/appointments/appt-3',
                cta: 'View Appointment'
            },
            {
                title: 'Upcoming Vaccination: HPV',
                description: 'Scheduled for next month.',
                href: '/dashboard/vaccinations',
                cta: 'View Schedule'
            },
        ],
    },
    4: { // Jonna Doe
        statsCards: [
            { title: 'Total Documents', value: '3', change: 'Just started!', icon: TrendingUp, isPrimary: true },
            { title: 'Archived Records', value: '0', change: '', icon: TrendingUp },
            { title: 'Upcoming Vaccinations', value: '2', change: 'Next week', icon: TrendingUp },
            { title: 'School Forms', value: '1', change: '1 pending', icon: TrendingUp },
        ],
        appointments: [
            { id: 'appt-3', name: 'Dr. Emily Chen', specialty: 'Pediatrician', avatar: placeholderImages.doctorAvatar3, hint: 'woman doctor glasses', date: 'Dec 18, 2024', time: '03:00 PM' },
        ],
        title: 'Jonna\'s Dashboard',
        description: 'An overview of Jonna\'s health records.',
        reminders: [
            {
                title: 'Follow-up on Cough',
                description: 'Monitor persistent cough as per chest X-ray report.',
                href: '/dashboard/documents/doc10',
                cta: 'View Report'
            },
             {
                title: 'Pediatrician Appointment',
                description: 'Check-up with Dr. Emily Chen.',
                href: '/dashboard/appointments/appt-3',
                cta: 'View Appointment'
            },
        ],
    }
};

export default function DashboardPage() {
    const [data, setData] = React.useState(dashboardData[1]);

    React.useEffect(() => {
        const updateDashboardData = () => {
            const storedUserId = localStorage.getItem('activeFamilyMemberId');
            const userId = storedUserId ? parseInt(storedUserId, 10) : 1;
            setData(dashboardData[userId] || dashboardData[1]);
        };

        updateDashboardData();

        window.addEventListener('familyMemberChanged', updateDashboardData);

        return () => {
            window.removeEventListener('familyMemberChanged', updateDashboardData);
        };
    }, []);

  const { statsCards, appointments, title, description, reminders } = data;

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>Import Data</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card: any, index: number) => (
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
            <CardDescription>Your upcoming health tasks and alerts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {reminders && reminders.length > 0 ? (
              reminders.map((reminder: any, index: number) => (
                <Link href={reminder.href || '#'} key={index} className="block -mx-2">
                   <div className="flex items-start rounded-md p-2 hover:bg-muted">
                       <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 shrink-0 mt-0.5">
                           <TrendingUp className="h-3 w-3 text-primary" />
                       </div>
                       <div className="ml-3 flex-1">
                           <p className="font-semibold text-sm">{reminder.title}</p>
                           <p className="text-sm text-muted-foreground">{reminder.description}</p>
                       </div>
                   </div>
               </Link>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-8">
                No active reminders.
              </div>
            )}
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
                        {appointments.map((appointment: any) => (
                            <Link href={`/dashboard/appointments/${appointment.id}`} key={appointment.id} className="block -mx-2">
                                <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted">
                                    <div className="flex items-center gap-4">
                                        <Avatar>
                                            <AvatarImage src={appointment.avatar.src} alt={appointment.avatar.alt} data-ai-hint={appointment.hint}/>
                                            <AvatarFallback>{appointment.name.replace("Dr. ", "").split(' ').map((n: string)=>n[0]).join('')}</AvatarFallback>
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
                         {appointments.length === 0 && (
                            <div className="text-center text-muted-foreground p-8">
                                No upcoming appointments.
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
       </div>
    </div>
  );
}
