'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
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
import { Download, Printer, FileText, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
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
import placeholderImages from '@/lib/placeholder-images.json';

// Mock data for all documents
const allDocuments = [
  {
    id: 'doc1',
    name: 'Annual Check-up Results',
    type: 'Lab Report',
    date: '2023-10-18',
    tags: ['lab-results', 'check-up', 'annual', 'physical-exam'],
    patientInfo: { name: 'Jane Doe', dob: '1990-05-21', patientId: 'JD-12345' },
    reportInfo: { reportId: 'RPT-98765', issuedBy: 'Dr. Emily Carter', facility: 'Central City Clinic', time: '09:45 AM' },
    vitalSigns: { bloodPressure: '120/80 mmHg', heartRate: '72 bpm', temperature: '98.6°F (37°C)', respiratoryRate: '16 breaths/min' },
    labResults: [
      { test: 'Total Cholesterol', value: '210 mg/dL', range: 'Below 200 mg/dL', status: 'High' },
      { test: 'LDL Cholesterol', value: '140 mg/dL', range: 'Below 130 mg/dL', status: 'High' },
      { test: 'HDL Cholesterol', value: '60 mg/dL', range: 'Above 40 mg/dL', status: 'Normal' },
      { test: 'Triglycerides', value: '110 mg/dL', range: 'Below 150 mg/dL', status: 'Normal' },
      { test: 'Blood Glucose', value: '90 mg/dL', range: '70-100 mg/dL', status: 'Normal' },
    ],
    assessment: 'Patient appears to be in good health overall, though cholesterol levels are slightly elevated. Vitals are stable. No other acute issues identified.',
    recommendations: 'Recommend dietary consultation to manage cholesterol. Continue with regular exercise. Re-test cholesterol in 3 months. Schedule next annual physical exam in one year.',
  },
  {
    id: 'doc2',
    name: 'MRI Scan - Left Knee',
    type: 'Imaging Report',
    date: '2023-09-05',
    tags: ['imaging', 'orthopedics', 'mri'],
    patientInfo: { name: 'Jane Doe', dob: '1990-05-21', patientId: 'JD-12345' },
    reportInfo: { reportId: 'RPT-98766', issuedBy: 'Dr. Alan Grant', facility: 'Island Imaging Center', time: '03:15 PM' },
    vitalSigns: {},
    labResults: [],
    assessment: 'MRI of the left knee shows a moderate tear of the medial meniscus. No other significant abnormalities noted. The anterior cruciate ligament is intact.',
    recommendations: 'Referral to an orthopedic specialist for consultation regarding surgical vs. non-surgical management options. Recommend RICE (Rest, Ice, Compression, Elevation) protocol in the interim.',
    images: [
      {
        src: placeholderImages.mriScan.src,
        width: placeholderImages.mriScan.width,
        height: placeholderImages.mriScan.height,
        alt: placeholderImages.mriScan.alt,
        hint: placeholderImages.mriScan.hint,
      },
      {
        src: placeholderImages.mriScan2.src,
        width: placeholderImages.mriScan2.width,
        height: placeholderImages.mriScan2.height,
        alt: placeholderImages.mriScan2.alt,
        hint: placeholderImages.mriScan2.hint,
      },
    ],
  },
  {
    id: 'doc3',
    name: 'Prescription - Amoxicillin',
    type: 'Prescription',
    date: '2023-08-22',
    tags: ['prescription', 'pharmacy'],
    patientInfo: { name: 'Jane Doe', dob: '1990-05-21', patientId: 'JD-12345' },
    reportInfo: { reportId: 'RPT-98767', issuedBy: 'Dr. Emily Carter', facility: 'Central City Clinic', time: '11:00 AM' },
    vitalSigns: {},
    labResults: [],
    assessment: 'Diagnosis: Acute Sinusitis. Prescribing Amoxicillin to treat bacterial infection.',
    recommendations: 'Take one 500mg tablet twice daily for 10 days. Complete the full course of antibiotics even if feeling better. Avoid alcohol. May cause mild stomach upset.'
  },
  {
    id: 'doc4',
    name: 'Dental X-Ray',
    type: 'Imaging Report',
    date: '2023-07-11',
    tags: ['dental', 'imaging', 'x-ray'],
    patientInfo: { name: 'Jane Doe', dob: '1990-05-21', patientId: 'JD-12345' },
    reportInfo: { reportId: 'RPT-98768', issuedBy: 'Dr. Ian Malcolm', facility: 'Downtown Dental', time: '02:00 PM' },
    vitalSigns: {},
    labResults: [],
    assessment: 'Bitewing and panoramic X-rays reviewed. Early signs of a cavity (caries) on tooth #30 (lower right first molar). No other signs of decay or periodontal disease.',
    recommendations: 'Schedule a filling for tooth #30. Continue regular brushing and flossing. Six-month follow-up recommended.',
    images: [
        {
          src: placeholderImages.dentalXray.src,
          width: placeholderImages.dentalXray.width,
          height: placeholderImages.dentalXray.height,
          alt: placeholderImages.dentalXray.alt,
          hint: placeholderImages.dentalXray.hint,
        },
      ],
  },
  {
    id: 'doc5',
    name: 'Allergy Test Results',
    type: 'Lab Report',
    date: '2023-06-15',
    tags: ['lab-results', 'allergy'],
    patientInfo: { name: 'Jane Doe', dob: '1990-05-21', patientId: 'JD-12345' },
    reportInfo: { reportId: 'RPT-98769', issuedBy: 'Dr. Ellie Sattler', facility: 'Allergy & Asthma Associates', time: '10:30 AM' },
    vitalSigns: {},
    labResults: [
        { test: 'Dust Mites (D. farinae)', value: 'Class 3', range: 'Negative', status: 'High' },
        { test: 'Cat Dander', value: 'Class 4', range: 'Negative', status: 'High' },
        { test: 'Ragweed Pollen', value: 'Class 2', range: 'Negative', status: 'Moderate' },
        { test: 'Peanut', value: 'Class 0', range: 'Negative', status: 'Normal' },
    ],
    assessment: 'Patient has a significant allergy to dust mites and cat dander, and a moderate allergy to ragweed pollen. No allergy to peanuts detected.',
    recommendations: 'Discussed environmental control measures for dust mites and cats. Prescribed an antihistamine for seasonal allergy symptoms. Recommended allergen-proof bedding. Follow up as needed.'
  },
  {
    id: 'doc6',
    name: 'Abdominal Ultrasound',
    type: 'Imaging Report',
    date: '2023-05-20',
    tags: ['imaging', 'ultrasound', 'gastroenterology'],
    patientInfo: { name: 'Jane Doe', dob: '1990-05-21', patientId: 'JD-12345' },
    reportInfo: { reportId: 'RPT-98770', issuedBy: 'Dr. John Hammond', facility: 'Central City Clinic', time: '01:30 PM' },
    vitalSigns: {},
    labResults: [],
    assessment: 'Ultrasound of the abdomen reveals a normal-appearing liver, gallbladder, spleen, pancreas, and kidneys. No evidence of gallstones or other abnormalities.',
    recommendations: 'No follow-up needed based on these findings. Patient can continue with routine care.',
    images: [
      {
        src: placeholderImages.ultrasoundScan.src,
        width: placeholderImages.ultrasoundScan.width,
        height: placeholderImages.ultrasoundScan.height,
        alt: placeholderImages.ultrasoundScan.alt,
        hint: placeholderImages.ultrasoundScan.hint,
      },
    ],
  },
];


const InfoItem = ({ label, value }: { label: string; value: string | undefined }) => {
    if (!value) return null;
    return (
        <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="font-semibold">{value}</p>
        </div>
    );
}

export default function DocumentDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [isShareOpen, setShareOpen] = useState(false);

  const currentIndex = allDocuments.findIndex((doc) => doc.id === id);
  const documentDetails = allDocuments[currentIndex] as (typeof allDocuments)[0] & { images?: any[] };
  
  const prevDoc = currentIndex > 0 ? allDocuments[currentIndex - 1] : null;
  const nextDoc = currentIndex < allDocuments.length - 1 ? allDocuments[currentIndex + 1] : null;

  if (!documentDetails) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <p className="text-lg text-muted-foreground">Document not found.</p>
        <Button variant="link" asChild className="mt-4">
            <Link href="/dashboard/documents">&larr; Back to Documents</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-5xl">
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <FileText className="h-6 w-6" /> {documentDetails.name}
                </CardTitle>
                <CardDescription className="mt-2">
                  Issued by {documentDetails.reportInfo.issuedBy} from {documentDetails.reportInfo.facility} on {documentDetails.date}.
                </CardDescription>
              </div>
              <div className="flex shrink-0 gap-2">
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
            <div className="rounded-lg border p-4">
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
                    <InfoItem label="Patient Name" value={documentDetails.patientInfo.name} />
                    <InfoItem label="Date of Birth" value={documentDetails.patientInfo.dob} />
                    <InfoItem label="Patient ID" value={documentDetails.patientInfo.patientId} />
                    <InfoItem label="Report ID" value={documentDetails.reportInfo.reportId} />
                    <InfoItem label="Report Date" value={`${documentDetails.date} at ${documentDetails.reportInfo.time}`} />
                    <InfoItem label="Issuing Physician" value={documentDetails.reportInfo.issuedBy} />
                    <InfoItem label="Facility" value={documentDetails.reportInfo.facility} />
                     <div className="lg:col-span-1 sm:col-span-3 col-span-2">
                        <p className="text-sm font-medium text-muted-foreground">Tags</p>
                        <div className="mt-1 flex flex-wrap gap-1">
                            {documentDetails.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            {Object.keys(documentDetails.vitalSigns).length > 0 && (
             <div className="space-y-4">
              <h3 className="text-lg font-semibold">Vital Signs</h3>
              <div className="grid grid-cols-2 gap-4 rounded-lg border p-4 md:grid-cols-4">
                <InfoItem label="Blood Pressure" value={documentDetails.vitalSigns.bloodPressure} />
                <InfoItem label="Heart Rate" value={documentDetails.vitalSigns.heartRate} />
                <InfoItem label="Temperature" value={documentDetails.vitalSigns.temperature} />
                <InfoItem label="Respiratory Rate" value={documentDetails.vitalSigns.respiratoryRate} />
              </div>
            </div>
            )}

            {Object.keys(documentDetails.vitalSigns).length > 0 && documentDetails.labResults.length > 0 && <Separator />}

            {documentDetails.labResults.length > 0 && (
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
            )}
            
            {(documentDetails.labResults.length > 0 || Object.keys(documentDetails.vitalSigns).length > 0) && <Separator />}


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

            {documentDetails.images && documentDetails.images.length > 0 && (
                <>
                <Separator />
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Attached Images</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {documentDetails.images.map((image: any, index: number) => (
                        <div key={index} className="rounded-lg border overflow-hidden">
                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={image.width}
                            height={image.height}
                            data-ai-hint={image.hint}
                            className="w-full h-auto object-cover"
                        />
                        </div>
                    ))}
                    </div>
                </div>
                </>
            )}
          </CardContent>
        </Card>
        <div className="mt-6 flex items-center justify-between">
           <Button
              variant="outline"
              disabled={!prevDoc}
              onClick={() => router.push(`/dashboard/documents/${prevDoc!.id}`)}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous Report
            </Button>
            <Button variant="link" asChild>
              <Link href="/dashboard/documents">&larr; Back to Documents</Link>
            </Button>
            <Button
              variant="outline"
              disabled={!nextDoc}
              onClick={() => router.push(`/dashboard/documents/${nextDoc!.id}`)}
            >
              Next Report
              <ChevronRight className="ml-2 h-4 w-4" />
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
