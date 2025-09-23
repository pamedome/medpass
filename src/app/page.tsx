

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
import placeholderImages from '@/lib/placeholder-images.json';

const features = [
  'Secure Document Upload',
  'AI-Powered Tagging',
  'Manual Data Entry',
  'Emergency QR Code',
  'Secure Record Sharing',
];

const GooglePlayBadge = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="135" height="40" viewBox="0 0 135 40" fill="none" {...props}>
      <rect width="135" height="40" rx="5" fill="black"/>
      <path d="M11.8597 25.3373L19.9056 20.1834L11.8597 15.0295V25.3373Z" fill="#00A04D"/>
      <path d="M22.7836 22.5615L19.9059 20.1833L22.7836 17.8051L24.8979 19.0118C26.589 19.9912 26.589 20.3755 24.8979 21.3549L22.7836 22.5615Z" fill="#FFD000"/>
      <path d="M4.8877 28.5238L11.8596 25.3374V15.0295L4.8877 11.8431C3.54145 11.206 2 12.103 2 13.6264V26.7432C2 28.2666 3.54145 29.1637 4.8877 28.5238Z" fill="#0072C3"/>
      <path d="M19.9058 20.1834L22.7835 17.8052L11.8596 11.332V15.0296L19.9058 20.1834Z" fill="#FF3737"/>
      <path d="M11.8596 25.3374V29.0348L22.7835 22.5616L19.9058 20.1834L11.8596 25.3374Z" fill="#FF3737"/>
      <path d="M32.8443 19.3879C32.8443 18.7337 32.5513 18.2393 31.819 18.2393C31.0624 18.2393 30.5005 18.7176 30.5005 19.404C30.5005 20.0743 31.0463 20.5526 31.8433 20.5526C32.1363 20.5526 32.378 20.4853 32.5513 20.3664L32.6202 21.2201C32.337 21.3711 32.044 21.4544 31.7868 21.4544C30.4079 21.4544 29.5029 20.5526 29.5029 19.404C29.5029 18.2554 30.3918 17.3375 31.819 17.3375C33.2462 17.3375 34.0515 18.2232 34.0515 19.3718C34.0515 19.5325 34.0354 19.6933 34.0031 19.8541H30.7267C30.8252 20.2554 31.2581 20.5049 31.8029 20.5049C32.252 20.5049 32.6202 20.2876 32.8443 19.8863V19.3879Z" fill="white"/>
      <path d="M37.3782 17.4492H38.2529V21.3427H37.3782V17.4492Z" fill="white"/>
      <path d="M42.2274 19.3879C42.2274 18.7337 41.9344 18.2393 41.2021 18.2393C40.4455 18.2393 39.8836 18.7176 39.8836 19.404C39.8836 20.0743 40.4294 20.5526 41.2264 20.5526C41.5194 20.5526 41.7611 20.4853 41.9344 20.3664L42.0033 21.2201C41.7201 21.3711 41.4271 21.4544 41.1699 21.4544C39.791 21.4544 38.886 20.5526 38.886 19.404C38.886 18.2554 39.7749 17.3375 41.2021 17.3375C42.6293 17.3375 43.4346 18.2232 43.4346 19.3718C43.4346 19.5325 43.4185 19.6933 43.3862 19.8541H40.1098C40.2083 20.2554 40.6412 20.5049 41.186 20.5049C41.6351 20.5049 42.0033 20.2876 42.2274 19.8863V19.3879Z" fill="white"/>
      <path d="M44.4072 17.4492H45.2819V21.3427H44.4072V17.4492Z" fill="white"/>
      <path d="M49.6202 21.3427V18.2715C49.6202 17.7811 49.252 17.4492 48.659 17.4492C48.066 17.4492 47.7099 17.7811 47.7099 18.2715V21.3427H46.8352V17.5946H47.6405L47.7099 18.0437C47.9931 17.6585 48.4909 17.3375 49.0718 17.3375C49.9284 17.3375 50.4949 17.8928 50.4949 18.7337V21.3427H49.6202Z" fill="white"/>
      <path d="M53.8643 19.404C53.8643 18.5293 53.3024 17.3375 51.7892 17.3375C50.2922 17.3375 49.524 18.416 49.524 19.404C49.524 20.392 50.2922 21.4544 51.7892 21.4544C53.3024 21.4544 53.8643 20.2803 53.8643 19.404ZM52.9896 19.404C52.9896 20.0582 52.5714 20.9439 51.7892 20.9439C51.0189 20.9439 50.5926 20.0582 50.5926 19.404C50.5926 18.7498 51.0189 17.8502 51.7892 17.8502C52.5714 17.8502 52.9896 18.7498 52.9896 19.404Z" fill="white"/>
      <path d="M60.1037 19.404C60.1037 18.5293 59.5418 17.3375 58.0286 17.3375C56.5316 17.3375 55.7634 18.416 55.7634 19.404C55.7634 20.392 56.5316 21.4544 58.0286 21.4544C59.5418 21.4544 60.1037 20.2803 60.1037 19.404ZM59.229 19.404C59.229 20.0582 58.8108 20.9439 58.0286 20.9439C57.2583 20.9439 56.832 20.0582 56.832 19.404C56.832 18.7498 57.2583 17.8502 58.0286 17.8502C58.8108 17.8502 59.229 18.7498 59.229 19.404Z" fill="white"/>
      <path d="M60.8427 17.4492H61.7174V17.9144L61.6485 18.0437C61.9415 17.6585 62.4393 17.3375 63.0202 17.3375C63.8768 17.3375 64.4433 17.8928 64.4433 18.7337V21.3427H63.5686V18.7659C63.5686 18.173 63.1843 17.8502 62.6224 17.8502C62.0605 17.8502 61.7174 18.2393 61.7174 18.7498V21.3427H60.8427V17.4492Z" fill="white"/>
      <path d="M69.0494 21.2201L68.3171 21.3588C68.2186 21.0582 67.9032 20.8975 67.6102 20.8975C67.242 20.8975 66.9749 21.107 66.9749 21.4067C66.9749 21.7224 67.242 21.9319 67.7497 22.0447L68.528 22.2542C69.516 22.4959 70.0138 22.9937 70.0138 23.8346C70.0138 24.8872 69.1088 25.5414 67.9515 25.5414C66.7138 25.5414 65.9129 24.9666 65.6888 24.1578L66.5635 23.8906C66.7072 24.4654 67.1401 24.9827 67.9515 24.9827C68.528 24.9827 68.9932 24.7088 68.9932 24.3245C68.9932 24.0088 68.7423 23.8159 68.2024 23.6873L67.4362 23.4944C66.3847 23.2366 65.9129 22.7544 65.9129 21.9135C65.9129 20.9135 66.7299 20.2593 67.8711 20.2593C68.528 20.2593 68.9449 20.5226 69.0494 21.2201Z" fill="white"/>
      <path d="M74.9658 21.2201L74.2335 21.3588C74.135 21.0582 73.8196 20.8975 73.5266 20.8975C73.1584 20.8975 72.8913 21.107 72.8913 21.4067C72.8913 21.7224 73.1584 21.9319 73.6661 22.0447L74.4444 22.2542C75.4324 22.4959 75.9302 22.9937 75.9302 23.8346C75.9302 24.8872 75.0252 25.5414 73.8679 25.5414C72.6302 25.5414 71.8293 24.9666 71.6052 24.1578L72.4799 23.8906C72.6236 24.4654 73.0565 24.9827 73.8679 24.9827C74.4444 24.9827 74.9096 24.7088 74.9096 24.3245C74.9096 24.0088 74.6587 23.8159 74.1188 23.6873L73.3526 23.4944C72.3011 23.2366 71.8293 22.7544 71.8293 21.9135C71.8293 20.9135 72.6463 20.398 73.7875 20.398C74.4444 20.398 74.8613 20.5226 74.9658 21.2201Z" fill="white"/>
      <path d="M77.0142 20.4409H76.2212V25.4297H77.0142V20.4409Z" fill="white"/>
      <path d="M78.6917 21.3588L77.9594 21.4975C77.8609 21.1969 77.5455 21.0362 77.2525 21.0362C76.8843 21.0362 76.6172 21.2457 76.6172 21.5454C76.6172 21.8611 76.8843 22.0706 77.392 22.1834L78.1703 22.3929C79.1583 22.6346 79.6561 23.1324 79.6561 23.9733C79.6561 25.0259 78.7511 25.6801 77.5938 25.6801C76.3561 25.6801 75.5552 25.1053 75.3311 24.2965L76.2058 24.0293C76.3495 24.6041 76.7824 25.1214 77.5938 25.1214C78.1703 25.1214 78.6355 24.8475 78.6355 24.4632C78.6355 24.1475 78.3846 23.9546 77.8447 23.826L77.0785 23.6331C76.027 23.3753 75.5552 22.8931 75.5552 22.0522C75.5552 21.0522 76.3722 20.398 77.5134 20.398C78.1703 20.398 78.5872 20.6613 78.6917 21.3588Z" fill="white"/>
      <path d="M84.2882 23.5025L84.223 23.4336C83.8217 23.8118 83.3313 24.032 82.8087 24.032C81.8293 24.032 81.1669 23.3265 81.1669 22.3471V20.4409H80.3739V19.9626L81.1669 19.4649V18.1746H81.9599V19.4649H82.9037V20.4409H81.9599V22.216C81.9599 22.8225 82.2614 23.1222 82.8087 23.1222C83.1584 23.1222 83.4738 22.9712 83.7247 22.688L84.2882 23.5025Z" fill="white"/>
      <path d="M88.4239 23.9009C88.2445 23.9009 88.0772 23.8118 87.9422 23.6806C87.8072 23.5495 87.7374 23.3862 87.7374 23.2108C87.7374 23.0354 87.8072 22.8721 87.9422 22.741C88.0772 22.6098 88.2445 22.5409 88.4239 22.5409C88.6033 22.5409 88.7706 22.6098 88.9056 22.741C89.0406 22.8721 89.1058 23.0354 89.1058 23.2108C89.1058 23.3862 89.0406 23.5495 88.9056 23.6806C88.7706 23.8118 88.6033 23.9009 88.4239 23.9009ZM87.7374 20.4409H89.1179V21.9135H87.7374V20.4409Z" fill="white"/>
      <path d="M93.3032 24.032C92.689 24.032 92.1755 23.8217 91.7912 23.4144V23.9213H90.998V20.4409H91.7912V21.1464C92.1755 20.739 92.689 20.5286 93.3032 20.5286C94.4082 20.5286 95.1405 21.2852 95.1405 22.2813C95.1405 23.2773 94.4082 24.032 93.3032 24.032ZM93.2216 23.3916C93.8146 23.3916 94.2227 22.9012 94.2227 22.2813C94.2227 21.6613 93.8146 21.1709 93.2216 21.1709C92.6286 21.1709 92.2205 21.6613 92.2205 22.2813C92.2205 22.9012 92.6286 23.3916 93.2216 23.3916Z" fill="white"/>
      <path d="M99.3789 24.032C98.2739 24.032 97.5416 23.2754 97.5416 22.2794C97.5416 21.2834 98.2739 20.5286 99.3789 20.5286C100.484 20.5286 101.216 21.2852 101.216 22.2794C101.216 23.2754 100.484 24.032 99.3789 24.032ZM99.3789 23.3916C99.9719 23.3916 100.38 22.9012 100.38 22.2794C100.38 21.6594 99.9719 21.1709 99.3789 21.1709C98.7859 21.1709 98.3778 21.6613 98.3778 22.2794C98.3778 22.9012 98.7859 23.3916 99.3789 23.3916Z" fill="white"/>
      <path d="M102.046 20.4409H102.839V23.9213H102.046V20.4409Z" fill="white"/>
      <path d="M107.035 22.3471V23.9213H106.242V23.4144C105.858 23.8217 105.344 24.032 104.73 24.032C103.625 24.032 102.893 23.2754 102.893 22.2794C102.893 21.2834 103.625 20.5286 104.73 20.5286C105.344 20.5286 105.858 20.739 106.242 21.1464V18.1746H107.035V22.3471ZM104.811 23.3916C105.404 23.3916 105.812 22.9012 105.812 22.2794C105.812 21.6594 105.404 21.1709 104.811 21.1709C104.218 21.1709 103.81 21.6613 103.81 22.2794C103.81 22.9012 104.218 23.3916 104.811 23.3916Z" fill="white"/>
      <path d="M111.411 23.9009C111.232 23.9009 111.065 23.8118 110.93 23.6806C110.795 23.5495 110.725 23.3862 110.725 23.2108C110.725 23.0354 110.795 22.8721 110.93 22.741C111.065 22.6098 111.232 22.5409 111.411 22.5409C111.591 22.5409 111.758 22.6098 111.893 22.741C112.028 22.8721 112.093 23.0354 112.093 23.2108C112.093 23.3862 112.028 23.5495 111.893 23.6806C111.758 23.8118 111.591 23.9009 111.411 23.9009ZM110.725 20.4409H112.106V21.9135H110.725V20.4409Z" fill="white"/>
      <path d="M116.273 24.032C115.168 24.032 114.436 23.2754 114.436 22.2794C114.436 21.2834 115.168 20.5286 116.273 20.5286C117.378 20.5286 118.11 21.2852 118.11 22.2794C118.11 23.2754 117.378 24.032 116.273 24.032ZM116.273 23.3916C116.866 23.3916 117.274 22.9012 117.274 22.2794C117.274 21.6594 116.866 21.1709 116.273 21.1709C115.68 21.1709 115.272 21.6613 115.272 22.2794C115.272 22.9012 115.68 23.3916 116.273 23.3916Z" fill="white"/>
      <path d="M122.592 23.9213H121.799V20.4409H122.592V21.1464C122.976 20.739 123.489 20.5286 124.104 20.5286C124.718 20.5286 125.231 20.739 125.615 21.1464V20.4409H126.408V23.9213H125.615V21.2153C125.231 20.808 124.718 20.5975 124.104 20.5975C123.489 20.5975 122.976 20.808 122.592 21.2153V23.9213Z" fill="white"/>
      <path d="M129.897 24.032C128.792 24.032 128.06 23.2754 128.06 22.2794C128.06 21.2834 128.792 20.5286 129.897 20.5286C131.002 20.5286 131.734 21.2852 131.734 22.2794C131.734 23.2754 131.002 24.032 129.897 24.032ZM129.897 23.3916C130.49 23.3916 130.898 22.9012 130.898 22.2794C130.898 21.6594 130.49 21.1709 129.897 21.1709C129.304 21.1709 128.896 21.6613 128.896 22.2794C128.896 22.9012 129.304 23.3916 129.897 23.3916Z" fill="white"/>
      <path d="M37.9622 15.6983C37.9622 15.3411 37.6692 15.0481 37.312 15.0481H36.3326C35.9754 15.0481 35.6824 15.3411 35.6824 15.6983V16.3268H37.9622V15.6983Z" fill="white"/>
      <path d="M37.312 14.187C37.6692 14.187 37.9622 14.48 37.9622 14.8372V15.0481H35.6824V14.8372C35.6824 14.48 35.9754 14.187 36.3326 14.187H37.312Z" fill="white"/>
      <path d="M43.0185 15.6983C43.0185 15.3411 42.7255 15.0481 42.3683 15.0481H41.3889C41.0317 15.0481 40.7387 15.3411 40.7387 15.6983V16.3268H43.0185V15.6983Z" fill="white"/>
      <path d="M42.3683 14.187C42.7255 14.187 43.0185 14.48 43.0185 14.8372V15.0481H40.7387V14.8372C40.7387 14.48 41.0317 14.187 41.3889 14.187H42.3683Z" fill="white"/>
    </svg>
);

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center">
            <Logo className="mr-2 h-6 w-6 text-primary" />
            <span className="font-bold">MedPass</span>
          </div>
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
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
            <div className="mt-10 flex flex-wrap justify-center gap-4">
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
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold">All-in-One Health Management</h2>
              <p className="mt-4 text-muted-foreground">
                From uploading documents to generating an emergency QR code, we've built a comprehensive suite of tools to help you take control of your health information.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-4xl gap-8 text-left sm:grid-cols-2 lg:grid-cols-3">
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
                    <a href="#" aria-label="Download on the App Store">
                        <Image
                            src={placeholderImages.appStoreBadge.src}
                            alt={placeholderImages.appStoreBadge.alt}
                            width={placeholderImages.appStoreBadge.width}
                            height={placeholderImages.appStoreBadge.height}
                            data-ai-hint={placeholderImages.appStoreBadge.hint}
                            className="h-10 w-auto"
                        />
                    </a>
                    <a href="#" aria-label="Get it on Google Play">
                        <GooglePlayBadge className="h-10 w-auto" />
                    </a>
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
