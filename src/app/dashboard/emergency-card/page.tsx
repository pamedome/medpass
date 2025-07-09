import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Wallet } from 'lucide-react';

export default function EmergencyCardPage() {
    const userId = "user123" // Placeholder user ID

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Emergency QR Code</CardTitle>
            <CardDescription>
              Healthcare professionals can scan this code to access your
              emergency profile without needing to log in.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="rounded-lg border p-4">
              <Image
                src="https://placehold.co/300x300.png"
                width={250}
                height={250}
                alt="Emergency QR Code"
                data-ai-hint="qr code"
              />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Test your QR code by scanning it or visiting the public link.
            </p>
            <div className="w-full space-y-2">
                <Button asChild variant="secondary" className="w-full">
                <Link href={`/emergency-access/${userId}`} target="_blank">
                    View Public Page
                </Link>
                </Button>
                <Button variant="outline" className="w-full">
                    <Wallet className="mr-2 h-4 w-4" />
                    Add to Wallet / Widget
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Emergency Profile</CardTitle>
            <CardDescription>
              This information will be visible on your public emergency page.
              Keep it concise and up-to-date.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Jane Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" defaultValue="1990-05-21" type="date"/>
              </div>
            </div>
             <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="blood-type">Blood Type</Label>
                    <Input id="blood-type" defaultValue="O+" />
                 </div>
             </div>
            <div className="space-y-2">
              <Label htmlFor="allergies">Known Allergies</Label>
              <Textarea
                id="allergies"
                placeholder="e.g., Penicillin, Peanuts"
                defaultValue="Penicillin, Peanuts"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea
                id="medications"
                placeholder="e.g., Lisinopril 10mg, Metformin 500mg"
                defaultValue="Lisinopril 10mg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="conditions">Medical Conditions</Label>
              <Textarea
                id="conditions"
                placeholder="e.g., Hypertension, Type 2 Diabetes"
                defaultValue="Hypertension"
              />
            </div>
             <div className="space-y-2">
              <Label htmlFor="contacts">Emergency Contacts</Label>
              <Textarea
                id="contacts"
                placeholder="e.g., John Smith (Husband) - 555-123-4567"
                defaultValue="John Smith (Husband) - 555-123-4567"
              />
            </div>
             <div className="flex justify-end">
                <Button>Save Changes</Button>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
