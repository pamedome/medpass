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

const testimonials = [
  {
    name: 'Sarah L.',
    title: 'Busy Mom',
    quote: 'Health Passport is a lifesaver! I can manage my whole family\'s medical records in one place. The emergency QR code gives me peace of mind.',
    avatar: 'https://picsum.photos/seed/101/40/40',
    hint: 'woman smiling portrait',
  },
  {
    name: 'David R.',
    title: 'Frequent Traveler',
    quote: 'As someone who travels a lot for work, having all my medical info accessible from my phone is incredible. Sharing records with a new doctor abroad was seamless.',
    avatar: 'https://picsum.photos/seed/102/40/40',
    hint: 'man travel background',
  },
  {
    name: 'Maria G.',
    title: 'Caregiver',
    quote: 'I help manage my elderly parents\' healthcare. Health Passport makes it easy to keep track of their appointments, medications, and documents. Highly recommended!',
    avatar: 'https://picsum.photos/seed/103/40/40',
    hint: 'caregiver smiling',
  },
];


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

        {/* Testimonials Section */}
        <section className="py-20 sm:py-24">
          <div className="container">
            <h2 className="text-center text-3xl font-bold">
              Loved by Patients & Caregivers
            </h2>
            <p className="mt-4 text-center text-muted-foreground">
                See what our users are saying about Health Passport.
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name}>
                  <CardContent className="pt-6">
                    <p className="italic">"{testimonial.quote}"</p>
                  </CardContent>
                  <CardFooter className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src={testimonial.avatar} data-ai-hint={testimonial.hint} />
                        <AvatarFallback>{testimonial.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </CardFooter>
                </Card>
              ))}
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
