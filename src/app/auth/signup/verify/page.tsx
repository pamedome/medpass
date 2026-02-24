'use client';

import { useEffect, useState, useCallback } from 'react';
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
  const [isVerified, setIsVerified] = useState(false);
  const [canResend, setCanResend] = useState(true);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Check email verification status
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    // Set initial state
    setIsVerified(currentUser.emailVerified);

    // Poll for verification status
    const checkVerification = async () => {
      try {
        await currentUser.reload();
        const verified = auth.currentUser?.emailVerified || false;
        if (verified && !isVerified) {
          setIsVerified(true);
          toast({
            title: 'Email Verified!',
            description: 'Your email has been successfully verified.',
          });
        }
      } catch (error) {
        console.error('Error checking verification:', error);
      }
    };

    const interval = setInterval(checkVerification, 3000);
    return () => clearInterval(interval);
  }, [auth, isVerified, toast]);

  const handleResend = useCallback(async () => {
    if (!canResend) return;

    try {
      setCanResend(false);
      await sendVerificationEmail();
      
      toast({
        title: 'Verification Email Sent',
        description: 'Please check your inbox (and spam folder).',
      });

      // Start 60-second cooldown
      setResendCooldown(60);
      const countdown = setInterval(() => {
        setResendCooldown(prev => {
          if (prev <= 1) {
            clearInterval(countdown);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error('Resend error:', error);
      setCanResend(true);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to send verification email.',
      });
    }
  }, [canResend, toast]);

  const handleFinish = async () => {
    if (!acceptedTerms || !acceptedPrivacy) {
      toast({
        variant: 'destructive',
        title: 'Acceptance Required',
        description: 'You must accept the Terms of Service and Privacy Policy.',
      });
      return;
    }
    
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'User session not found. Please log in again.',
      });
      router.push('/login');
      return;
    }

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
    } catch (error) {
      console.error('Onboarding error:', error);
      toast({
        variant: 'destructive',
        title: 'Finalization Failed',
        description: error instanceof Error ? error.message : 'An error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
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
              <Button 
                variant="outline" 
                onClick={handleResend}
                disabled={!canResend}
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Email'}
              </Button>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Terms & Conditions</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(Boolean(checked))}
              />
              <label
                htmlFor="terms"
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I accept the <a href="#" className="underline text-primary">Terms of Service</a>.
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="privacy"
                checked={acceptedPrivacy}
                onCheckedChange={(checked) => setAcceptedPrivacy(Boolean(checked))}
              />
              <label
                htmlFor="privacy"
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I accept the <a href="#" className="underline text-primary">Privacy Policy</a>.
              </label>
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="marketing"
                checked={marketingOptIn}
                onCheckedChange={(checked) => setMarketingOptIn(Boolean(checked))}
              />
              <label
                htmlFor="marketing"
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I'd like to receive marketing communications.
              </label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleFinish}
          disabled={isSubmitting || !isVerified || !acceptedTerms || !acceptedPrivacy}
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Finish Setup
        </Button>
      </CardFooter>
    </Card>
  );
}
