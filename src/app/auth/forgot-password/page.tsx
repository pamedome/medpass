'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useFirebaseAuth } from '@/firebase';

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email address.' })
    .transform(val => val.trim().toLowerCase()), // Normalize email
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useFirebaseAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);
  const [cooldown, setCooldown] = useState(0);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    // Rate limiting check
    if (!canSubmit) {
      toast({
        variant: 'destructive',
        title: 'Please wait',
        description: `You can request another reset in ${cooldown} seconds.`,
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Send password reset email with proper configuration
      await sendPasswordResetEmail(auth, data.email, {
        url: `${window.location.origin}/login`,
        handleCodeInApp: false,
      });

      // Set cooldown (60 seconds)
      setCanSubmit(false);
      setCooldown(60);
      
      const interval = setInterval(() => {
        setCooldown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanSubmit(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      setEmailSent(true);
      
    } catch (error) {
      // Log error for debugging but don't expose to user
      console.error('Password reset error:', error);
      
      // Security: Always show success message to prevent user enumeration
      // This prevents attackers from discovering which emails exist in the system
      setEmailSent(true);
      
      // Optional: Log specific error types for monitoring
      if (error instanceof Error) {
        console.error('Error details:', {
          message: error.message,
          code: (error as any).code,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            If an account with that email exists, we've sent a password reset link.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center text-center p-8">
          <Mail className="h-16 w-16 text-primary mb-4" />
          <p className="text-muted-foreground mb-2">
            Please check your inbox (and spam folder) for the reset link.
          </p>
          <p className="text-sm text-muted-foreground">
            The link will expire in 1 hour.
          </p>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button asChild className="w-full" variant="secondary">
            <Link href="/login">Back to Log In</Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => {
              setEmailSent(false);
              form.reset();
            }}
          >
            Try a different email
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>
          Enter your email address and we'll send you a link to reset your password.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      type="email"
                      autoComplete="email"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !canSubmit}
            >
              {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {cooldown > 0 ? `Wait ${cooldown}s` : 'Send Reset Link'}
            </Button>
            <Button asChild variant="link">
              <Link href="/login">&larr; Back to Log In</Link>
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}