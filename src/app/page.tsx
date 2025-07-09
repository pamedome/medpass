'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { Logo } from '@/components/logo';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.24 10.285V14.4h6.806c-.82 2.134-2.62 3.65-5.213 3.65-3.09 0-5.6-2.51-5.6-5.6s2.51-5.6 5.6-5.6c1.39 0 2.6.52 3.56 1.36l2.76-2.76C16.89 3.19 14.74 2 12 2 6.48 2 2 6.48 2 12s4.48 10 10 10c5.52 0 10-4.48 10-10 0-.74-.07-1.45-.19-2.14h-9.57z" />
  </svg>
);

const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.58,15.24C16,14.08,15.32,12.18,15.32,10.2a6,6,0,0,1,1.7-4.29,5.1,5.1,0,0,1,3.47-1.86,1,1,0,1,0-.37-1.92,7.06,7.06,0,0,0-4.85,2.6,6.24,6.24,0,0,0-2.31,5.48c0,2.2,1,4.3,2.5,5.72s3.28,2.2,5.2,2.2a1,1,0,1,0,0-2C20.1,20.09,18.82,18.33,17.58,15.24ZM11.13,1.52a1,1,0,0,0-1,1.15,9,9,0,0,1,1.68,5.42,8.68,8.68,0,0,1-8.31,8.65,8.44,8.44,0,0,1-1.3-.11,1,1,0,0,0-1.1.8,1,1,0,0,0,.8,1.1,10.61,10.61,0,0,0,1.62.14,10.74,10.74,0,0,0,10.37-10.7,11,11,0,0,0-2.73-7.46Z" />
  </svg>
);

const OutlookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M21,5H7.5A2.5,2.5,0,0,0,5,7.5v11A2.5,2.5,0,0,0,7.5,21H19a2,2,0,0,0,2-2V7A2,2,0,0,0,19,5ZM7.5,7H19V8.5L13.25,12,7.5,8.5Zm11.5,12H7.5a.5.5,0,0,1-.5-.5V10.75L13.25,14,19.5,10.5V18.5A.5.5,0,0,1,19,19Z M2,8H4V6H2Z M2,12H4V10H2Z M2,16H4V14H2Z" />
    </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(data: LoginFormValues) {
    console.log(data);
    // Simulate successful login
    router.push('/dashboard');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
       <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
            <Logo className="h-12 w-12 text-primary" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight">MedPass</h1>
            <p className="mt-1 text-muted-foreground">Welcome back! Sign in to continue.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="sr-only">Login</CardTitle>
            <CardDescription className="sr-only">
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="grid gap-4">
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
                          autoCapitalize="none"
                          autoComplete="email"
                          autoCorrect="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        <Link
                          href="#"
                          className="ml-auto inline-block text-sm underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input placeholder="••••••••" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" size="icon" aria-label="Sign in with Google">
            <GoogleIcon className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" aria-label="Sign in with Apple">
            <AppleIcon className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" aria-label="Sign in with Outlook">
            <OutlookIcon className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline hover:text-primary">
              Sign up
            </Link>
          </div>
      </div>
    </main>
  );
}
