import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Printer, FileText } from 'lucide-react';
import Link from 'next/link';

// Mock data - in a real app, this would be fetched based on the [id] param
const documentDetails = {
  name: 'Annual Check-up Results',
  type: 'PDF',
  date: '2023-10-18',
  tags: ['lab-results', 'check-up', 'annual'],
  content: `Patient: John Doe
Date: 2023-10-18

Results of annual physical examination.
Vitals: BP 120/80, HR 72, Temp 98.6F.
Cholesterol: Total 180, LDL 100, HDL 60.
Blood Glucose: 90 mg/dL.
Assessment: Overall healthy. Recommend continued diet and exercise.
Follow-up in 1 year.`
};

export default function DocumentDetailsPage({ params }: { params: { id: string }}) {
  return (
    <div className="mx-auto max-w-4xl">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl"><FileText className="h-6 w-6" /> {documentDetails.name}</CardTitle>
              <CardDescription>
                Uploaded on {documentDetails.date}.
              </CardDescription>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="sm"><Printer className="mr-2 h-4 w-4" /> Print</Button>
                <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Download</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
             <div>
              <p className="text-sm font-medium text-muted-foreground">Document Type</p>
              <p className="font-semibold">{documentDetails.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tags</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {documentDetails.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                        {tag}
                    </Badge>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Document Content</h3>
            <pre className="whitespace-pre-wrap rounded-md bg-secondary p-4 font-sans text-sm text-muted-foreground">{documentDetails.content}</pre>
          </div>
        </CardContent>
      </Card>
       <div className="mt-6 text-center">
          <Button variant="link" asChild>
            <Link href="/dashboard/documents">
              &larr; Back to Documents
            </Link>
          </Button>
      </div>
    </div>
  );
}
