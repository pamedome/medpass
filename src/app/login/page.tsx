'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useFirebaseAuth } from '@/firebase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { updateUserOnboarding } from '@/lib/firebase-services';
import { serverTimestamp } from 'firebase/firestore';


const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const signupSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;


export default function AuthPage() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useFirebaseAuth();
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    if (!auth) {
      toast({
        variant: 'destructive',
        title: 'Authentication not ready',
        description: 'Please wait a moment and try again.',
      });
      return;
    }
    setIsLoginLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({
        title: 'Login Successful',
        description: 'Redirecting...',
      });
      // The useAuth hook will now handle redirection based on onboarding status.
    } catch (error: any) {
      console.error('Login error:', error);
      let description = 'An unknown error occurred.';
      if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/invalid-credential'
      ) {
        description = 'Invalid email or password.';
      } else if (error.code === 'auth/too-many-requests') {
        description = 'Too many attempts. Please try again later.';
      }
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description,
      });
    } finally {
        setIsLoginLoading(false);
    }
  };

  const onSignupSubmit = async (data: SignupFormValues) => {
    if (!auth) {
      toast({
        variant: 'destructive',
        title: 'Authentication not ready',
        description: 'Please wait a moment and try again.',
      });
      return;
    }
    setIsSignupLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Create a user profile in Firestore
      await updateUserOnboarding(user.uid, {
          uid: user.uid,
          email: user.email,
          createdAt: serverTimestamp(),
          onboardingStatus: 'complete', // Bypass multi-step onboarding
          region: 'OTHER',
          kyc: {},
      });

      toast({
        title: 'Account Created',
        description: 'You are now logged in and being redirected...',
      });
      // The useAuth hook will handle redirection to /dashboard
    } catch (error: any) {
      console.error('Signup error:', error);
      let description = 'An unknown error occurred.';
      if (error.code === 'auth/email-already-in-use') {
        description = 'This email address is already in use.';
      } else if (error.code === 'auth/weak-password') {
        description = 'The password is too weak.';
      }
      toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description,
      });
    } finally {
        setIsSignupLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <Link href="/" className="mb-4">
            <Image
              src="/logo.svg"
              width={235}
              height={55}
              alt="Medpass Logo"
            />
          </Link>
        </div>

        <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <Card className="border-t-0 rounded-t-none">
                    <CardHeader>
                        <CardTitle className="text-2xl">Welcome Back</CardTitle>
                        <CardDescription>Sign in to continue to Medpass.</CardDescription>
                    </CardHeader>
                    <Form {...loginForm}>
                        <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
                        <CardContent className="grid gap-4">
                            <FormField
                            control={loginForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                    placeholder="name@example.com"
                                    type="email"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    autoCorrect="off"
                                    disabled={isLoginLoading}
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={loginForm.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                <div className="flex items-center">
                                    <FormLabel>Password</FormLabel>
                                    <Link
                                    href="/auth/forgot-password"
                                    className="ml-auto inline-block text-sm text-primary hover:underline"
                                    >
                                    Forgot your password?
                                    </Link>
                                </div>
                                <FormControl>
                                    <Input
                                    placeholder="••••••••"
                                    type="password"
                                    disabled={isLoginLoading}
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoginLoading}
                            >
                            {isLoginLoading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Sign In
                            </Button>
                        </CardFooter>
                        </form>
                    </Form>
                </Card>
            </TabsContent>
            <TabsContent value="signup">
                <Card className="border-t-0 rounded-t-none">
                    <CardHeader>
                        <CardTitle className="text-2xl">Create an Account</CardTitle>
                        <CardDescription>Enter your details to get started.</CardDescription>
                    </CardHeader>
                    <Form {...signupForm}>
                        <form onSubmit={signupForm.handleSubmit(onSignupSubmit)}>
                        <CardContent className="grid gap-4">
                            <FormField
                            control={signupForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                    placeholder="name@example.com"
                                    type="email"
                                    disabled={isSignupLoading}
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={signupForm.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                    placeholder="••••••••"
                                    type="password"
                                    disabled={isSignupLoading}
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={signupForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                    placeholder="••••••••"
                                    type="password"
                                    disabled={isSignupLoading}
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button
                            type="submit"
                            className="w-full"
                            disabled={isSignupLoading}
                            >
                            {isSignupLoading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Sign Up
                            </Button>
                        </CardFooter>
                        </form>
                    </Form>
                </Card>
            </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
