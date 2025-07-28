'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { Download, Printer, Share2, ChevronLeft, ChevronRight, Syringe } from 'lucide-react';
import Link from 'next/link';
import { ShareDialog } from '@/components/share-dialog';

// Mock data for all vaccinations
const allVaccinations = [
  {
    id: 'vax1',
    vaccine: 'Influenza (Flu)',
    dateAdministered: '2023-10-15',
    dose: '1 of 1 (Annual)',
    provider: 'Central City Clinic',
    status: 'Up-to-date',
    lotNumber: 'AB12345',
    site: 'Left Deltoid',
    notes: 'Patient reported no adverse reactions. Standard annual flu shot.',
  },
  {
    id: 'vax2',
    vaccine: 'Tetanus, Diphtheria, Pertussis (Tdap)',
    dateAdministered: '2022-08-20',
    dose: 'Booster',
    provider: 'Community Hospital',
    status: 'Up-to-date',
    lotNumber: 'CD67890',
    site: 'Right Deltoid',
    notes: '10-year booster shot administered as per schedule.',
  },
  {
    id: 'vax3',
    vaccine: 'COVID-19 (Moderna)',
    dateAdministered: '2023-09-01',
    dose: 'Bivalent Booster',
    provider: 'Downtown Pharmacy',
    status: 'Up-to-date',
    lotNumber: 'EF11223',
    site: 'Left Deltoid',
    notes: 'Updated bivalent booster for current variants.',
  },
  {
    id: 'vax4',
    vaccine: 'Hepatitis B',
    dateAdministered: '2005-06-10',
    dose: '3 of 3',
    provider: 'General Hospital',
    status: 'Completed',
    lotNumber: 'GH44556',
    site: 'Left Deltoid',
    notes: 'Completed the 3-dose series.',
  },
  {
    id: 'vax5',
    vaccine: 'Measles, Mumps, Rubella (MMR)',
    dateAdministered: '1995-03-12',
    dose: '2 of 2',
    provider: 'Pediatric Care Center',
    status: 'Completed',
    lotNumber: 'IJ77889',
    site: 'Right Arm',
    notes: 'Second dose of MMR as part of childhood immunizations.',
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

export default function VaccinationDetailsPage({ params: { id } }: { params: { id: string }}) {
  const router = useRouter();
  const [isShareOpen, setShareOpen] = useState(false);

  const currentIndex = allVaccinations.findIndex(vax => vax.id === id);
  const vaxDetails = allVaccinations[currentIndex];
  
  const prevVax = currentIndex > 0 ? allVaccinations[currentIndex - 1] : null;
  const nextVax = currentIndex < allVaccinations.length - 1 ? allVaccinations[currentIndex + 1] : null;

  if (!vaxDetails) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <p className="text-lg text-muted-foreground">Vaccination record not found.</p>
        <Button variant="link" asChild className="mt-4">
            <Link href="/dashboard/vaccinations">&larr; Back to Vaccinations</Link>
        </Button>
      </div>
    );
  }
  const reportName = `Vaccination Record - ${vaxDetails.vaccine}`;

  return (
    <>
      <div className="mx-auto max-w-4xl">
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2 text-2xl">
                    <Syringe className="h-6 w-6" /> {vaxDetails.vaccine}
                </CardTitle>
                <CardDescription>
                  Administered on {vaxDetails.dateAdministered} at {vaxDetails.provider}.
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
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-4">
              <InfoItem label="Vaccine" value={vaxDetails.vaccine} />
              <InfoItem label="Date Administered" value={vaxDetails.dateAdministered} />
              <InfoItem label="Dose" value={vaxDetails.dose} />
              <InfoItem label="Provider" value={vaxDetails.provider} />
              <InfoItem label="Lot Number" value={vaxDetails.lotNumber} />
              <InfoItem label="Administration Site" value={vaxDetails.site} />
               <div className="col-span-2 md:col-span-4">
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <Badge variant={vaxDetails.status === 'Up-to-date' || vaxDetails.status === 'Completed' ? 'secondary' : 'outline'}>
                    {vaxDetails.status}
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Notes</h3>
              <p className="text-muted-foreground">{vaxDetails.notes}</p>
            </div>

          </CardContent>
        </Card>
        <div className="mt-6 flex items-center justify-between">
            <Button
              variant="outline"
              disabled={!prevVax}
              onClick={() => router.push(`/dashboard/vaccinations/${prevVax!.id}`)}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button variant="link" asChild>
              <Link href="/dashboard/vaccinations">
                &larr; Back to Vaccinations
              </Link>
            </Button>
            <Button
              variant="outline"
              disabled={!nextVax}
              onClick={() => router.push(`/dashboard/vaccinations/${nextVax!.id}`)}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
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
