
'use client';

import { useState } from 'react';
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
import { Wallet, Lock, Unlock, KeyRound } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

export default function EmergencyCardPage() {
  const userId = "user123"; // Placeholder user ID
  const { toast } = useToast();
  const [isLocked, setIsLocked] = useState(true);
  const [isPasscodeDialogOpen, setIsPasscodeDialogOpen] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const CORRECT_PASSCODE = '1234';

  const handleUnlock = () => {
    if (passcode === CORRECT_PASSCODE) {
      setIsLocked(false);
      setIsPasscodeDialogOpen(false);
      setPasscode('');
      setPasscodeError('');
      toast({
        title: 'Profile Unlocked',
        description: 'You can now edit your emergency profile.',
      });
    } else {
      setPasscodeError('Incorrect PIN. Please try again.');
    }
  };

  const handleSave = () => {
    setIsLocked(true);
    toast({
        title: "Profile Saved & Locked",
        description: "Your changes have been saved and the profile is now locked.",
    });
  };

  return (
    <>
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
              <div className="flex items-center justify-between">
                <div>
                    <CardTitle>Emergency Profile</CardTitle>
                    <CardDescription>
                    This information will be visible on your public emergency page.
                    Keep it concise and up-to-date.
                    </CardDescription>
                </div>
                 {isLocked ? (
                    <Button variant="secondary" onClick={() => setIsPasscodeDialogOpen(true)}>
                        <Lock className="mr-2 h-4 w-4" />
                        Unlock to Edit
                    </Button>
                 ) : (
                    <Button variant="destructive" onClick={() => setIsLocked(true)}>
                        <Unlock className="mr-2 h-4 w-4" />
                        Cancel
                    </Button>
                 )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="Jane Doe" disabled={isLocked} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" defaultValue="1990-05-21" type="date" disabled={isLocked}/>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="blood-type">Blood Type</Label>
                  <Input id="blood-type" defaultValue="O+" disabled={isLocked}/>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Height</Label>
                  <Input id="height" defaultValue="5' 7&quot;" disabled={isLocked}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight</Label>
                  <Input id="weight" defaultValue="140 lbs" disabled={isLocked}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bmi">BMI</Label>
                  <Input id="bmi" defaultValue="21.9" disabled={isLocked}/>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">Known Allergies</Label>
                <Textarea
                  id="allergies"
                  placeholder="e.g., Penicillin, Peanuts"
                  defaultValue="Penicillin, Peanuts"
                  disabled={isLocked}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medications">Current Medications</Label>
                <Textarea
                  id="medications"
                  placeholder="e.g., Lisinopril 10mg, Metformin 500mg"
                  defaultValue="Lisinopril 10mg"
                  disabled={isLocked}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="conditions">Medical Conditions</Label>
                <Textarea
                  id="conditions"
                  placeholder="e.g., Hypertension, Type 2 Diabetes"
                  defaultValue="Hypertension"
                  disabled={isLocked}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contacts">Emergency Contacts</Label>
                <Textarea
                  id="contacts"
                  placeholder="e.g., John Smith (Husband) - 555-123-4567"
                  defaultValue="John Smith (Husband) - 555-123-4567"
                  disabled={isLocked}
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isLocked}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <AlertDialog open={isPasscodeDialogOpen} onOpenChange={setIsPasscodeDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Enter Passcode to Unlock</AlertDialogTitle>
            <AlertDialogDescription>
              For your security, please enter your 4-digit PIN to make changes to your emergency profile.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="relative">
             <KeyRound className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
             <Input 
                id="pin" 
                type="password" 
                placeholder="****" 
                value={passcode}
                onChange={(e) => {
                    setPasscode(e.target.value);
                    if (passcodeError) setPasscodeError('');
                }}
                maxLength={4}
                className="pl-8"
              />
          </div>
          {passcodeError && <p className="text-sm text-destructive">{passcodeError}</p>}
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPasscode('')}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleUnlock}>Unlock</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
