'use client';

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
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

const chartConfig = {
  steps: {
    label: 'Steps',
    color: 'hsl(var(--primary))',
  },
  sleep: {
    label: 'Sleep (hours)',
    color: 'hsl(var(--accent))',
  },
} satisfies ChartConfig;

const analyticsData = [
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
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Health Analytics</h1>
          <p className="text-muted-foreground">
            A detailed look at your health trends over time.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard">&larr; Back to Dashboard</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Monthly Activity Summary</CardTitle>
          <CardDescription>
            A summary of your steps and sleep patterns over the last year.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <BarChart
              accessibilityLayer
              data={analyticsData}
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
                stroke="hsl(var(--primary))"
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="hsl(var(--accent))"
              />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Legend />
              <Bar
                dataKey="steps"
                yAxisId="left"
                fill="var(--color-steps)"
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
  );
}
