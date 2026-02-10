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
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useFirebaseAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    if (!auth) {
      toast({
        variant: 'destructive',
        title: 'Authentication not ready',
        description: 'Please wait a moment and try again.',
      });
      return;
    }
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, data.email);
      setEmailSent(true);
    } catch (error: any) {
      console.error('Password reset error:', error);
      // To prevent user enumeration attacks, we show the same message
      // whether the user exists or not.
      setEmailSent(true);
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
               <Mail className="h-16 w-16 text-primary mb-4"/>
               <p className="text-muted-foreground">Please check your inbox (and spam folder) to reset your password.</p>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full" variant="secondary">
                    <Link href="/login">Back to Log In</Link>
                </Button>
            </CardFooter>
        </Card>
    )
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
              disabled={isLoading}
            >
              {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Send Reset Link
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
