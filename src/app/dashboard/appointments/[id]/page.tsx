'use client';

import { useState } from 'react';
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
import { Download, Printer, Share2 } from 'lucide-react';
import Link from 'next/link';
import { ShareDialog } from '@/components/share-dialog';

// Mock data - in a real app, this would be fetched based on the [id] param
const appointmentDetails = {
  doctorName: 'Dr. Sarah Johnson',
  specialty: 'Cardiologist',
  date: 'December 1, 2024',
  time: '10:00 AM',
  diagnosis: 'Stable Angina',
  notes: 'Patient presented with intermittent chest discomfort, consistent with previous episodes. EKG showed no acute changes. Blood pressure is well-controlled on current medication. Discussed lifestyle modifications, including a low-sodium diet and increased physical activity. No changes to medication at this time.',
  medications: [
    { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
    { name: 'Aspirin', dosage: '81mg', frequency: 'Once daily' },
  ],
  followUp: 'Scheduled for a routine check-up in 6 months. Patient to monitor symptoms and report any significant increase in frequency or severity of chest pain.',
};
const reportName = "Appointment Report";

export default function AppointmentDetailsPage({ params }: { params: { id: string }}) {
  const [isShareOpen, setShareOpen] = useState(false);

  return (
    <>
      <div className="mx-auto max-w-4xl">
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <CardTitle className="text-2xl">{reportName}</CardTitle>
                <CardDescription>
                  A summary of your visit with {appointmentDetails.doctorName} on {appointmentDetails.date}.
                </CardDescription>
              </div>
              <div className="flex gap-2">
                  <Button variant="outline" size="sm"><Printer className="mr-2 h-4 w-4" /> Print</Button>
                  <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Download PDF</Button>
                  <Button variant="outline" size="sm" onClick={() => setShareOpen(true)}>
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Doctor</p>
                <p className="font-semibold">{appointmentDetails.doctorName}</p>
                <p className="text-sm text-muted-foreground">{appointmentDetails.specialty}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Date</p>
                <p className="font-semibold">{appointmentDetails.date}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Time</p>
                <p className="font-semibold">{appointmentDetails.time}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Diagnosis</h3>
              <Badge variant="secondary">{appointmentDetails.diagnosis}</Badge>
            </div>
            
            <Separator />

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Doctor's Notes</h3>
              <p className="text-muted-foreground">{appointmentDetails.notes}</p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Prescribed Medication</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {appointmentDetails.medications.map(med => (
                  <li key={med.name}>
                    <span className="font-semibold text-foreground">{med.name}</span> ({med.dosage}, {med.frequency})
                  </li>
                ))}
              </ul>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Follow-up Instructions</h3>
              <p className="text-muted-foreground">{appointmentDetails.followUp}</p>
            </div>

          </CardContent>
        </Card>
        <div className="mt-6 text-center">
            <Button variant="link" asChild>
              <Link href="/dashboard">
                &larr; Back to Dashboard
              </Link>
            </Button>
        </div>
      </div>
      <ShareDialog
        isOpen={isShareOpen}
        setIsOpen={setShareOpen}
        documentName={reportName}
      />
    </>
  );
}
