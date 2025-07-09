'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Printer, FileText, Share2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { ShareDialog } from '@/components/share-dialog';

// Mock data based on a universal medical report standard
const documentDetails = {
  name: 'Annual Check-up Results',
  type: 'Lab Report',
  date: '2023-10-18',
  tags: ['lab-results', 'check-up', 'annual', 'physical-exam'],
  patientInfo: {
    name: 'Jane Doe',
    dob: '1990-05-21',
    patientId: 'JD-12345',
  },
  reportInfo: {
    reportId: 'RPT-98765',
    issuedBy: 'Dr. Emily Carter',
    facility: 'Central City Clinic',
    time: '09:45 AM',
  },
  vitalSigns: {
    bloodPressure: '120/80 mmHg',
    heartRate: '72 bpm',
    temperature: '98.6°F (37°C)',
    respiratoryRate: '16 breaths/min',
  },
  labResults: [
    { test: 'Total Cholesterol', value: '210 mg/dL', range: 'Below 200 mg/dL', status: 'High' },
    { test: 'LDL Cholesterol', value: '140 mg/dL', range: 'Below 130 mg/dL', status: 'High' },
    { test: 'HDL Cholesterol', value: '60 mg/dL', range: 'Above 40 mg/dL', status: 'Normal' },
    { test: 'Triglycerides', value: '110 mg/dL', range: 'Below 150 mg/dL', status: 'Normal' },
    { test: 'Blood Glucose', value: '90 mg/dL', range: '70-100 mg/dL', status: 'Normal' },
  ],
  assessment:
    'Patient appears to be in good health overall, though cholesterol levels are slightly elevated. Vitals are stable. No other acute issues identified.',
  recommendations:
    'Recommend dietary consultation to manage cholesterol. Continue with regular exercise. Re-test cholesterol in 3 months. Schedule next annual physical exam in one year.',
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
    <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="font-semibold">{value}</p>
    </div>
);

export default function DocumentDetailsPage({ params }: { params: { id: string } }) {
  const [isShareOpen, setShareOpen] = useState(false);

  return (
    <>
      <div className="mx-auto max-w-5xl">
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <FileText className="h-6 w-6" /> {documentDetails.name}
                </CardTitle>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Printer className="mr-2 h-4 w-4" /> Print
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShareOpen(true)}>
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card>
                  <CardHeader>
                      <CardTitle className="text-lg">Patient Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <InfoItem label="Full Name" value={documentDetails.patientInfo.name} />
                      <InfoItem label="Date of Birth" value={documentDetails.patientInfo.dob} />
                      <InfoItem label="Patient ID" value={documentDetails.patientInfo.patientId} />
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader>
                      <CardTitle className="text-lg">Report Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <InfoItem label="Report ID" value={documentDetails.reportInfo.reportId} />
                      <InfoItem label="Report Date" value={documentDetails.date} />
                      <InfoItem label="Report Time" value={documentDetails.reportInfo.time} />
                      <InfoItem label="Issuing Physician" value={documentDetails.reportInfo.issuedBy} />
                      <InfoItem label="Facility" value={documentDetails.reportInfo.facility} />
                       <div>
                          <p className="text-sm font-medium text-muted-foreground">Tags</p>
                          <div className="mt-1 flex flex-wrap gap-1">
                              {documentDetails.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary">{tag}</Badge>
                              ))}
                          </div>
                      </div>
                  </CardContent>
              </Card>
            </div>

            <Separator />
            
             <div className="space-y-4">
              <h3 className="text-lg font-semibold">Vital Signs</h3>
              <div className="grid grid-cols-2 gap-4 rounded-lg border p-4 md:grid-cols-4">
                <InfoItem label="Blood Pressure" value={documentDetails.vitalSigns.bloodPressure} />
                <InfoItem label="Heart Rate" value={documentDetails.vitalSigns.heartRate} />
                <InfoItem label="Temperature" value={documentDetails.vitalSigns.temperature} />
                <InfoItem label="Respiratory Rate" value={documentDetails.vitalSigns.respiratoryRate} />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Laboratory Results</h3>
              <div className="rounded-lg border">
                  <Table>
                      <TableHeader>
                      <TableRow>
                          <TableHead>Test</TableHead>
                          <TableHead>Result</TableHead>
                          <TableHead>Reference Range</TableHead>
                          <TableHead>Status</TableHead>
                      </TableRow>
                      </TableHeader>
                      <TableBody>
                      {documentDetails.labResults.map((result) => (
                          <TableRow key={result.test}>
                          <TableCell className="font-medium">{result.test}</TableCell>
                          <TableCell>{result.value}</TableCell>
                          <TableCell>{result.range}</TableCell>
                          <TableCell>
                              <Badge variant={result.status === 'Normal' ? 'secondary' : 'destructive'}>
                                  {result.status}
                              </Badge>
                          </TableCell>
                          </TableRow>
                      ))}
                      </TableBody>
                  </Table>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Physician's Notes</h3>
              <div className="rounded-lg border p-4 space-y-4">
                <div>
                  <h4 className="font-semibold">Assessment</h4>
                  <p className="text-muted-foreground">{documentDetails.assessment}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Recommendations & Follow-up</h4>
                  <p className="text-muted-foreground">{documentDetails.recommendations}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="mt-6 text-center">
          <Button variant="link" asChild>
            <Link href="/dashboard/documents">&larr; Back to Documents</Link>
          </Button>
        </div>
      </div>
      <ShareDialog
        isOpen={isShareOpen}
        setIsOpen={setShareOpen}
        documentName={documentDetails.name}
      />
    </>
  );
}
