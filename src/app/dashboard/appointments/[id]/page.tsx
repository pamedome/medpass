'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
import { Download, Printer, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { ShareDialog } from '@/components/share-dialog';

// Mock data for all appointments
const allAppointments = [
  {
    id: 'appt-1',
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
  },
  {
    id: 'appt-2',
    doctorName: 'Dr. Michael Lee',
    specialty: 'Dermatologist',
    date: 'December 5, 2024',
    time: '02:30 PM',
    diagnosis: 'Eczema',
    notes: 'Patient reports persistent dry, itchy patches on elbows and knees. Examination confirms atopic dermatitis. Prescribed a topical corticosteroid cream and recommended use of a hypoallergenic moisturizer.',
    medications: [
      { name: 'Triamcinolone Acetonide Cream', dosage: '0.1%', frequency: 'Twice daily' },
    ],
    followUp: 'Follow up in 4 weeks to assess response to treatment.',
  },
  {
    id: 'appt-3',
    doctorName: 'Dr. Emily Chen',
    specialty: 'Pediatrician',
    date: 'December 10, 2024',
    time: '11:15 AM',
    diagnosis: 'Otitis Media',
    notes: 'Child presented with ear pain and low-grade fever. Examination of the right ear shows a bulging, red tympanic membrane, consistent with a middle ear infection. Prescribed amoxicillin.',
    medications: [
      { name: 'Amoxicillin', dosage: '250mg/5mL', frequency: 'Twice daily for 7 days' },
    ],
    followUp: 'Return if symptoms do not improve in 48-72 hours or if they worsen.',
  },
    { 
    id: 'appt-4', 
    doctorName: 'Dr. David Oshodi', 
    specialty: 'General Practitioner', 
    date: 'Dec 12, 2024', 
    time: '09:00 AM',
    diagnosis: 'Common Cold (Viral URI)',
    notes: 'Patient reports cough, sore throat, and nasal congestion for the past 3 days. No fever. Lungs are clear. Diagnosis is a common cold. Recommended rest, hydration, and over-the-counter symptom relief.',
    medications: [],
    followUp: 'No follow-up necessary unless symptoms persist for more than 10 days or worsen significantly.',
  },
];
const reportName = "Appointment Report";

export default function AppointmentDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [isShareOpen, setShareOpen] = useState(false);

  const currentIndex = allAppointments.findIndex(appt => appt.id === id);
  const appointmentDetails = allAppointments[currentIndex];
  
  const prevAppt = currentIndex > 0 ? allAppointments[currentIndex - 1] : null;
  const nextAppt = currentIndex < allAppointments.length - 1 ? allAppointments[currentIndex + 1] : null;

  if (!appointmentDetails) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <p className="text-lg text-muted-foreground">Appointment not found.</p>
        <Button variant="link" asChild className="mt-4">
            <Link href="/dashboard">&larr; Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

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
              {appointmentDetails.medications.length > 0 ? (
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {appointmentDetails.medications.map(med => (
                    <li key={med.name}>
                      <span className="font-semibold text-foreground">{med.name}</span> ({med.dosage}, {med.frequency})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No medications prescribed.</p>
              )}
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Follow-up Instructions</h3>
              <p className="text-muted-foreground">{appointmentDetails.followUp}</p>
            </div>

          </CardContent>
        </Card>
        <div className="mt-6 flex items-center justify-between">
            <Button
              variant="outline"
              disabled={!prevAppt}
              onClick={() => router.push(`/dashboard/appointments/${prevAppt!.id}`)}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button variant="link" asChild>
              <Link href="/dashboard">
                &larr; Back to Dashboard
              </Link>
            </Button>
            <Button
              variant="outline"
              disabled={!nextAppt}
              onClick={() => router.push(`/dashboard/appointments/${nextAppt!.id}`)}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
      </div>
      <ShareDialog
        isOpen={isShareOpen}
        setIsOpen={setShareOpen}
        documentName={`${reportName} - ${appointmentDetails.doctorName}`}
      />
    </>
  );
}
