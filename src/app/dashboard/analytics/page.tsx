'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import Link from 'next/link';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { initialUsers, UserProfile } from '@/lib/family-members';
import { Skeleton } from '@/components/ui/skeleton';

const allAnalyticsData: { [key: number]: any } = {
  1: {
    // Jane Doe
    activity: {
      config: {
        steps: { label: 'Steps', color: 'hsl(var(--primary))' },
        sleep: { label: 'Sleep (hours)', color: 'hsl(var(--accent))' },
      },
      data: [
        { month: 'Jan', steps: 8000, sleep: 7.0 },
        { month: 'Feb', steps: 7500, sleep: 6.5 },
        { month: 'Mar', steps: 9200, sleep: 7.2 },
        { month: 'Apr', steps: 10500, sleep: 7.8 },
        { month: 'May', steps: 11000, sleep: 7.5 },
        { month: 'Jun', steps: 9800, sleep: 7.1 },
        { month: 'Jul', steps: 12000, sleep: 7.9 },
        { month: 'Aug', steps: 11500, sleep: 7.6 },
        { month: 'Sep', steps: 9500, sleep: 7.3 },
        { month: 'Oct', steps: 8500, sleep: 7.0 },
        { month: 'Nov', steps: 8200, sleep: 6.8 },
        { month: 'Dec', steps: 9000, sleep: 7.5 },
      ],
    },
    growth: {
      config: {
        weight: { label: 'Weight (lbs)', color: 'hsl(var(--primary))' },
      },
      data: [
        { month: 'Jan', weight: 140 },
        { month: 'Feb', weight: 141 },
        { month: 'Mar', weight: 140 },
        { month: 'Apr', weight: 139 },
        { month: 'May', weight: 138 },
        { month: 'Jun', weight: 140 },
        { month: 'Jul', weight: 141 },
        { month: 'Aug', weight: 142 },
        { month: 'Sep', weight: 141 },
        { month: 'Oct', weight: 140 },
        { month: 'Nov', weight: 142 },
        { month: 'Dec', weight: 141 },
      ],
    },
  },
  2: {
    // John Doe
    activity: {
      config: {
        steps: { label: 'Steps', color: 'hsl(var(--primary))' },
        sleep: { label: 'Sleep (hours)', color: 'hsl(var(--accent))' },
      },
      data: [
        { month: 'Jan', steps: 9000, sleep: 6.5 },
        { month: 'Feb', steps: 8500, sleep: 6.2 },
        { month: 'Mar', steps: 9800, sleep: 6.8 },
        { month: 'Apr', steps: 11000, sleep: 7.2 },
        { month: 'May', steps: 11500, sleep: 7.0 },
        { month: 'Jun', steps: 10200, sleep: 6.6 },
        { month: 'Jul', steps: 12500, sleep: 7.3 },
        { month: 'Aug', steps: 12000, sleep: 7.1 },
        { month: 'Sep', steps: 10000, sleep: 6.8 },
        { month: 'Oct', steps: 9000, sleep: 6.5 },
        { month: 'Nov', steps: 8800, sleep: 6.3 },
        { month: 'Dec', steps: 9500, sleep: 7.0 },
      ],
    },
    growth: {
      config: {
        weight: { label: 'Weight (lbs)', color: 'hsl(var(--primary))' },
      },
      data: [
        { month: 'Jan', weight: 180 },
        { month: 'Feb', weight: 181 },
        { month: 'Mar', weight: 180 },
        { month: 'Apr', weight: 179 },
        { month: 'May', weight: 182 },
        { month: 'Jun', weight: 180 },
        { month: 'Jul', weight: 181 },
        { month: 'Aug', weight: 182 },
        { month: 'Sep', weight: 183 },
        { month: 'Oct', weight: 181 },
        { month: 'Nov', weight: 182 },
        { month: 'Dec', weight: 181 },
      ],
    },
  },
  3: {
    // Jimmy Doe
    activity: {
      config: {
        activePlay: {
          label: 'Active Play (hours)',
          color: 'hsl(var(--primary))',
        },
        sleep: { label: 'Sleep (hours)', color: 'hsl(var(--accent))' },
      },
      data: [
        { month: 'Jan', activePlay: 2.0, sleep: 9.5 },
        { month: 'Feb', activePlay: 2.1, sleep: 9.4 },
        { month: 'Mar', activePlay: 2.2, sleep: 9.5 },
        { month: 'Apr', activePlay: 2.5, sleep: 9.2 },
        { month: 'May', activePlay: 2.8, sleep: 9.0 },
        { month: 'Jun', activePlay: 3.0, sleep: 9.0 },
        { month: 'Jul', activePlay: 3.2, sleep: 8.9 },
        { month: 'Aug', activePlay: 3.1, sleep: 9.1 },
        { month: 'Sep', activePlay: 2.8, sleep: 9.2 },
        { month: 'Oct', activePlay: 2.5, sleep: 9.3 },
        { month: 'Nov', activePlay: 2.2, sleep: 9.4 },
        { month: 'Dec', activePlay: 2.0, sleep: 9.5 },
      ],
    },
    growth: {
      config: {
        height: { label: 'Height (cm)', color: 'hsl(var(--chart-1))' },
        weight: { label: 'Weight (kg)', color: 'hsl(var(--chart-2))' },
      },
      data: [
        { month: 'Jan', height: 135.0, weight: 30.0 },
        { month: 'Feb', height: 135.5, weight: 30.2 },
        { month: 'Mar', height: 136.0, weight: 30.5 },
        { month: 'Apr', height: 136.5, weight: 30.8 },
        { month: 'May', height: 137.0, weight: 31.1 },
        { month: 'Jun', height: 137.5, weight: 31.5 },
        { month: 'Jul', height: 138.0, weight: 31.8 },
        { month: 'Aug', height: 138.5, weight: 32.0 },
        { month: 'Sep', height: 139.0, weight: 32.2 },
        { month: 'Oct', height: 139.5, weight: 32.5 },
        { month: 'Nov', height: 140.0, weight: 32.8 },
        { month: 'Dec', height: 140.5, weight: 33.0 },
      ],
    },
  },
  4: {
    // Jonna Doe
    activity: {
      config: {
        activePlay: {
          label: 'Active Play (hours)',
          color: 'hsl(var(--primary))',
        },
        sleep: { label: 'Sleep (hours)', color: 'hsl(var(--accent))' },
      },
      data: [
        { month: 'Jan', activePlay: 1.5, sleep: 10.5 },
        { month: 'Feb', activePlay: 1.6, sleep: 10.4 },
        { month: 'Mar', activePlay: 1.8, sleep: 10.5 },
        { month: 'Apr', activePlay: 2.0, sleep: 10.2 },
        { month: 'May', activePlay: 2.2, sleep: 10.0 },
        { month: 'Jun', activePlay: 2.5, sleep: 10.0 },
        { month: 'Jul', activePlay: 2.6, sleep: 9.9 },
        { month: 'Aug', activePlay: 2.5, sleep: 10.1 },
        { month: 'Sep', activePlay: 2.2, sleep: 10.2 },
        { month: 'Oct', activePlay: 2.0, sleep: 10.3 },
        { month: 'Nov', activePlay: 1.8, sleep: 10.4 },
        { month: 'Dec', activePlay: 1.6, sleep: 10.5 },
      ],
    },
    growth: {
      config: {
        height: { label: 'Height (cm)', color: 'hsl(var(--chart-1))' },
        weight: { label: 'Weight (kg)', color: 'hsl(var(--chart-2))' },
      },
      data: [
        { month: 'Jan', height: 115.0, weight: 20.0 },
        { month: 'Feb', height: 115.4, weight: 20.2 },
        { month: 'Mar', height: 115.8, weight: 20.4 },
        { month: 'Apr', height: 116.2, weight: 20.6 },
        { month: 'May', height: 116.6, weight: 20.9 },
        { month: 'Jun', height: 117.0, weight: 21.2 },
        { month: 'Jul', height: 117.4, weight: 21.4 },
        { month: 'Aug', height: 117.8, weight: 21.6 },
        { month: 'Sep', height: 118.2, weight: 21.8 },
        { month: 'Oct', height: 118.6, weight: 22.0 },
        { month: 'Nov', height: 119.0, weight: 22.2 },
        { month: 'Dec', height: 119.4, weight: 22.4 },
      ],
    },
  },
};

export default function AnalyticsPage() {
  const [activeUser, setActiveUser] = useState<UserProfile | null>(null);
  const [activityData, setActivityData] = useState<any[]>([]);
  const [activityConfig, setActivityConfig] = useState<ChartConfig>({});
  const [growthData, setGrowthData] = useState<any[]>([]);
  const [growthConfig, setGrowthConfig] = useState<ChartConfig>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem('activeFamilyMemberId');
    const userId = storedUserId ? parseInt(storedUserId, 10) : 1;
    const currentUser =
      initialUsers.find((u) => u.id === userId) || initialUsers[0];
    setActiveUser(currentUser);

    const data = allAnalyticsData[currentUser.id] || allAnalyticsData[1];
    setActivityData(data.activity.data);
    setActivityConfig(data.activity.config);

    if (data.growth) {
      setGrowthData(data.growth.data);
      setGrowthConfig(data.growth.config);
    }
    setIsLoading(false);
  }, []);

  const isChild = activeUser?.relationship === 'Child';

  if (isLoading || !activeUser) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <Skeleton className="h-9 w-64" />
                    <Skeleton className="h-5 w-96 mt-2" />
                </div>
                <Skeleton className="h-9 w-36" />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-7 w-48" />
                        <Skeleton className="h-4 w-80" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[400px] w-full" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-7 w-48" />
                        <Skeleton className="h-4 w-80" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[400px] w-full" />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
  }

  const firstName = activeUser.name.split(' ')[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Health Analytics for {activeUser.name}
          </h1>
          <p className="text-muted-foreground">
            A detailed look at {firstName}'s health trends over time.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard">&larr; Back to Dashboard</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              {isChild ? 'Growth Chart' : 'Weight Trend'}
            </CardTitle>
            <CardDescription>
              {isChild
                ? `Height and weight measurements for ${firstName} over the last year.`
                : `A summary of ${firstName}'s weight over the last year.`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={growthConfig} className="h-[400px] w-full">
              <LineChart
                accessibilityLayer
                data={growthData}
                margin={{
                  top: 20,
                  right: 20,
                  left: 0,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  stroke="var(--color-height)"
                  domain={['dataMin - 5', 'dataMax + 5']}
                />
                {isChild && (
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="var(--color-weight)"
                    domain={['dataMin - 5', 'dataMax + 5']}
                  />
                )}
                <Tooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Legend />
                {isChild && (
                  <Line
                    dataKey="height"
                    type="monotone"
                    stroke="var(--color-height)"
                    strokeWidth={2}
                    yAxisId="left"
                    dot={false}
                  />
                )}
                <Line
                  dataKey="weight"
                  type="monotone"
                  stroke="var(--color-weight)"
                  strokeWidth={2}
                  yAxisId={isChild ? "right" : "left"}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Monthly {isChild ? 'Activity & Sleep' : 'Steps & Sleep'} Summary
            </CardTitle>
            <CardDescription>
              A summary of {firstName}'s{' '}
              {isChild ? 'active play and sleep' : 'steps and sleep'} patterns.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={activityConfig} className="h-[400px] w-full">
              <BarChart
                accessibilityLayer
                data={activityData}
                margin={{
                  top: 20,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  stroke="var(--color-steps)"
                  domain={['dataMin - 2', 'dataMax + 2']}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="var(--color-sleep)"
                  domain={['dataMin - 2', 'dataMax + 2']}
                />
                <Tooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Legend />
                <Bar
                  dataKey={isChild ? 'activePlay' : 'steps'}
                  yAxisId="left"
                  fill="var(--color-activePlay, var(--color-steps))"
                  radius={4}
                />
                <Bar
                  dataKey="sleep"
                  yAxisId="right"
                  fill="var(--color-sleep)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
