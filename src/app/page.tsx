import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { CheckCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const features = [
  'Secure Document Upload',
  'AI-Powered Tagging',
  'Manual Data Entry',
  'Emergency QR Code',
  'Secure Record Sharing',
];

const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.58,15.24C16,14.08,15.32,12.18,15.32,10.2a6,6,0,0,1,1.7-4.29,5.1,5.1,0,0,1,3.47-1.86,1,1,0,1,0-.37-1.92,7.06,7.06,0,0,0-4.85,2.6,6.24,6.24,0,0,0-2.31,5.48c0,2.2,1,4.3,2.5,5.72s3.28,2.2,5.2,2.2a1,1,0,1,0,0-2C20.1,20.09,18.82,18.33,17.58,15.24ZM11.13,1.52a1,1,0,0,0-1,1.15,9,9,0,0,1,1.68,5.42,8.68,8.68,0,0,1-8.31,8.65,8.44,8.44,0,0,1-1.3-.11,1,1,0,0,0-1.1.8,1,1,0,0,0,.8,1.1,10.61,10.61,0,0,0,1.62.14,10.74,10.74,0,0,0,10.37-10.7,11,11,0,0,0-2.73-7.46Z" />
    </svg>
);

const GooglePlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M21.3,10.35,3.77,0.29A2,2,0,0,0,1,2.06V21.94a2,2,0,0,0,2.77,1.77L21.3,13.65a2,2,0,0,0,0-3.3ZM4,4.3,16.83,12,4,19.7Z" />
    </svg>
);

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex items-center">
            <Logo className="mr-2 h-6 w-6 text-primary" />
            <span className="font-bold">Health Passport</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 sm:py-28 md:py-32">
          <div className="container text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Your Health Records,
              <br />
              <span className="text-primary">Secure & Accessible.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Health Passport is your secure, digital health companion. Easily manage documents, track your medical history, and access vital information in emergencies.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">Get Started for Free</Link>
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section id="features" className="bg-muted py-20 sm:py-24">
          <div className="container grid gap-12 md:grid-cols-2 lg:grid-cols-3">
             <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold">All-in-One Health Management</h2>
                <p className="text-muted-foreground">
                    From uploading documents to generating an emergency QR code, we've built a comprehensive suite of tools to help you take control of your health information.
                </p>
            </div>
            {features.map((feature) => (
              <div key={feature} className="flex items-start space-x-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{feature}</h3>
                  <p className="text-sm text-muted-foreground">
                    Securely manage and access your medical records with our powerful features.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Download Beta Section */}
        <section className="py-20 sm:py-24">
            <div className="container text-center">
                <h2 className="text-3xl font-bold">Get the Beta App</h2>
                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                    Be one of the first to test our mobile app. Download the beta version and help us shape the future of health management on the go.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                        <AppleIcon className="mr-2 h-5 w-5" />
                        Download on the App Store
                    </Button>
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                        <GooglePlayIcon className="mr-2 h-5 w-5" />
                        Get it on Google Play
                    </Button>
                </div>
            </div>
        </section>

         {/* CTA Section */}
        <section className="bg-muted py-20 sm:py-24">
            <div className="container text-center">
                 <h2 className="text-3xl font-bold">Ready to Take Control?</h2>
                 <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                     Sign up today and experience the peace of mind that comes with having your health information organized and accessible whenever you need it.
                 </p>
                 <div className="mt-8">
                     <Button size="lg" asChild>
                        <Link href="/signup">Create Your Free Account</Link>
                     </Button>
                 </div>
            </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
            <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Health Passport. All rights reserved.
            </p>
            <nav className="flex gap-4">
                <Link href="#" className="text-sm hover:underline">Terms of Service</Link>
                <Link href="#" className="text-sm hover:underline">Privacy Policy</Link>
            </nav>
        </div>
      </footer>
    </div>
  );
}
