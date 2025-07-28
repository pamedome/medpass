'use client';

import { PlusCircle, FileDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const vaccinationData = [
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

export default function VaccinationsPage() {
  const router = useRouter();
  
  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Vaccination Records</h1>
          <p className="text-muted-foreground">
            A history of your immunizations.
          </p>
        </div>
        <div className="flex items-center gap-2">
           <Button size="sm" variant="outline">
              <FileDown className="mr-2 h-4 w-4" />
              Download Records
            </Button>
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Record
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Immunization History</CardTitle>
          <CardDescription>
            This list includes all your recorded vaccinations. Keep it updated with your healthcare provider.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vaccine</TableHead>
                <TableHead>Date Administered</TableHead>
                <TableHead>Dose</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vaccinationData.map((vax, index) => (
                <TableRow key={index} onClick={() => router.push(`/dashboard/vaccinations/${vax.id}`)} className="cursor-pointer">
                  <TableCell className="font-medium">{vax.vaccine}</TableCell>
                  <TableCell>{vax.dateAdministered}</TableCell>
                  <TableCell>{vax.dose}</TableCell>
                  <TableCell>{vax.provider}</TableCell>
                  <TableCell>
                    <Badge variant={vax.status === 'Up-to-date' || vax.status === 'Completed' ? 'secondary' : 'outline'}>
                      {vax.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
