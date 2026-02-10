'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useFirebaseAuth } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { sendVerificationEmail, updateUserOnboarding } from '@/lib/firebase-services';
import { AlertCircle, CheckCircle, Loader2, Mail } from 'lucide-react';
import { serverTimestamp } from 'firebase/firestore';

export default function VerifyPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const auth = useFirebaseAuth();
  const { toast } = useToast();

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isVerified, setIsVerified] = useState(auth.currentUser?.emailVerified || false);

  useEffect(() => {
    if (auth.currentUser?.emailVerified) {
      setIsVerified(true);
    }
    // Periodically check email verification status
    const interval = setInterval(async () => {
      await auth.currentUser?.reload();
      if (auth.currentUser?.emailVerified) {
        setIsVerified(true);
        clearInterval(interval);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [auth.currentUser]);

  const handleResend = async () => {
    try {
      await sendVerificationEmail();
      toast({
        title: 'Verification Email Sent',
        description: 'Please check your inbox (and spam folder).',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to send verification email. Please try again.',
      });
    }
  };

  const handleFinish = async () => {
    if (!acceptedTerms || !acceptedPrivacy) {
      toast({
        variant: 'destructive',
        title: 'Acceptance Required',
        description: 'You must accept the Terms of Service and Privacy Policy.',
      });
      return;
    }
    if(!user) return;

    setIsSubmitting(true);
    try {
      await updateUserOnboarding(user.uid, {
        acceptedTermsAt: serverTimestamp(),
        acceptedPrivacyAt: serverTimestamp(),
        marketingOptIn,
        onboardingStatus: 'complete',
      });
      toast({
        title: 'Setup Complete!',
        description: 'Welcome to Medpass!',
      });
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Finalization Failed',
        description: 'An error occurred. Please try again.',
      });
    } finally {
        setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Final Steps</CardTitle>
        <CardDescription>
          Just a few more things to get your account ready.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg border p-4 space-y-4">
          <h3 className="font-semibold text-lg">Email Verification</h3>
          {isVerified ? (
             <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <p className="font-medium">Your email address has been verified.</p>
             </div>
          ) : (
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-yellow-600">
                    <AlertCircle className="h-5 w-5" />
                    <p className="font-medium">Please verify your email address.</p>
                </div>
                <p className="text-sm text-muted-foreground">
                    We've sent a verification link to <strong>{user?.email}</strong>. Please check your inbox and click the link to continue.
                </p>
                <Button variant="outline" onClick={handleResend}>
                    <Mail className="mr-2 h-4 w-4" />
                    Resend verification email
                </Button>
            </div>
          )}
        </div>

        <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-semibold text-lg">Legal</h3>
            <div className="space-y-4">
                <div className="flex items-start space-x-3">
                    <Checkbox id="terms" checked={acceptedTerms} onCheckedChange={(c) => setAcceptedTerms(Boolean(c))} />
                    <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I accept the <a href="#" className="text-primary hover:underline">Terms of Service</a>.
                    </label>
                </div>
                <div className="flex items-start space-x-3">
                    <Checkbox id="privacy" checked={acceptedPrivacy} onCheckedChange={(c) => setAcceptedPrivacy(Boolean(c))} />
                    <label htmlFor="privacy" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I accept the <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                    </label>
                </div>
                <div className="flex items-start space-x-3">
                    <Checkbox id="marketing" checked={marketingOptIn} onCheckedChange={(c) => setMarketingOptIn(Boolean(c))} />
                    <label htmlFor="marketing" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I would like to receive marketing emails (optional).
                    </label>
                </div>
            </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleFinish} className="w-full" disabled={!isVerified || !acceptedTerms || !acceptedPrivacy || isSubmitting}>
           {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
           Finish Setup
        </Button>
      </CardFooter>
    </Card>
  );
}
