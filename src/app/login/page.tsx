'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Image from 'next/image';

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

const signupSchema = z
  .object({
    fullName: z.string().min(1, { message: 'Full name is required' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

export default function AuthPage() {
  const router = useRouter();
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: '', email: '', password: '', confirmPassword: '' },
  });

  function onLoginSubmit(data: LoginFormValues) {
    console.log(data);
    router.push('/dashboard');
  }

  function onSignupSubmit(data: SignupFormValues) {
    console.log(data);
    router.push('/dashboard');
  }

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
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Welcome Back</CardTitle>
                        <CardDescription>
                            Sign in to continue to Medpass.
                        </CardDescription>
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
                            <CardFooter>
                                <Button type="submit" className="w-full">
                                Sign In
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </Card>
            </TabsContent>
            <TabsContent value="signup">
                <Card>
                     <CardHeader>
                        <CardTitle className="text-2xl">Create your Medpass</CardTitle>
                        <CardDescription>
                             Your secure, digital health companion.
                        </CardDescription>
                    </CardHeader>
                    <Form {...signupForm}>
                        <form onSubmit={signupForm.handleSubmit(onSignupSubmit)}>
                        <CardContent className="grid gap-4">
                            <FormField
                            control={signupForm.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
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
                                    <Input placeholder="••••••••" type="password" {...field} />
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
                                        <Input placeholder="••••••••" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full">
                            Create account
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
