import Link from 'next/link';
import {
  Activity,
  ArrowUpRight,
  FileText,
  Upload,
  ShieldAlert,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const overviewCards = [
  {
    title: 'Total Documents',
    value: '14',
    icon: FileText,
    change: '+2 from last month',
  },
  {
    title: 'Emergency Ready',
    value: 'Yes',
    icon: ShieldAlert,
    change: 'Profile is up to date',
  },
];

const recentDocuments = [
  {
    name: 'Annual Check-up Results',
    date: '2023-10-18',
    tags: ['lab-results', 'check-up'],
  },
  {
    name: 'MRI Scan - Left Knee',
    date: '2023-09-05',
    tags: ['imaging', 'orthopedics'],
  },
  {
    name: 'Prescription - Amoxicillin',
    date: '2023-08-22',
    tags: ['prescription'],
  },
  {
    name: 'Dental X-Ray',
    date: '2023-07-11',
    tags: ['dental', 'imaging'],
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {overviewCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.change}</p>
            </CardContent>
          </Card>
        ))}
         <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
             <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button asChild className="flex-1">
              <Link href="/dashboard/documents/upload"><Upload className="mr-2 h-4 w-4" /> Upload</Link>
            </Button>
            <Button asChild variant="secondary" className="flex-1">
                <Link href="/dashboard/emergency-card"><ShieldAlert className="mr-2 h-4 w-4" /> Emergency</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
          <CardDescription>
            An overview of your most recently added documents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead>Tags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentDocuments.map((doc) => (
                <TableRow key={doc.name}>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell className="hidden sm:table-cell">{doc.date}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {doc.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
            <Button asChild size="sm" variant="outline" className="ml-auto gap-1">
                 <Link href="/dashboard/documents">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                 </Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
