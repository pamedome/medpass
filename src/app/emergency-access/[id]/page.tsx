import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User, Cake, Droplets, ShieldAlert, Pill, Stethoscope, Phone } from 'lucide-react';

const emergencyInfo = {
  name: 'Jane Doe',
  dob: 'May 21, 1990',
  bloodType: 'O+',
  allergies: 'Penicillin, Peanuts',
  medications: 'Lisinopril 10mg (for hypertension)',
  conditions: 'Hypertension, Type 2 Diabetes',
  contacts: 'John Smith (Husband) - 555-123-4567\nDr. Emily Carter (GP) - 555-987-6543',
};

interface InfoRowProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

const InfoRow = ({ icon: Icon, label, value }: InfoRowProps) => (
  <div className="flex items-start gap-4">
    <Icon className="h-6 w-6 flex-shrink-0 text-primary" />
    <div>
      <p className="font-semibold">{label}</p>
      <p className="text-muted-foreground whitespace-pre-wrap">{value}</p>
    </div>
  </div>
);

export default function EmergencyAccessPage({ params }: { params: { id: string }}) {
  return (
    <div className="mx-auto max-w-2xl">
      <Card className="shadow-2xl">
        <CardHeader className="text-center">
            <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24 border-4 border-primary">
                    <AvatarImage src="https://placehold.co/100x100/E0E0E0/BDBDBD.png" alt="User" data-ai-hint="person portrait"/>
                    <AvatarFallback className="text-4xl">JD</AvatarFallback>
                </Avatar>
                <CardTitle className="text-3xl font-bold">{emergencyInfo.name}</CardTitle>
            </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <InfoRow icon={User} label="Name" value={emergencyInfo.name} />
            <InfoRow icon={Cake} label="Date of Birth" value={emergencyInfo.dob} />
          </div>
          <Separator />
          <InfoRow icon={Droplets} label="Blood Type" value={emergencyInfo.bloodType} />
          <Separator />
          <InfoRow icon={ShieldAlert} label="Known Allergies" value={emergencyInfo.allergies} />
          <Separator />
          <InfoRow icon={Pill} label="Current Medications" value={emergencyInfo.medications} />
          <Separator />
          <InfoRow icon={Stethoscope} label="Medical Conditions" value={emergencyInfo.conditions} />
          <Separator />
          <InfoRow icon={Phone} label="Emergency Contacts" value={emergencyInfo.contacts} />
        </CardContent>
      </Card>
    </div>
  );
}
