'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { updateUserOnboarding } from '@/lib/firebase-services';
import { Region } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

const regions = [
  { code: 'EU', name: 'European Union (EU)', flag: '/flags/eu.svg' },
  { code: 'KE', name: 'Kenya', flag: '/flags/ke.svg' },
  { code: 'NG', name: 'Nigeria', flag: '/flags/ng.svg' },
  { code: 'OTHER', name: 'Other', flag: '/flags/other.svg' },
];

export default function SelectCountryPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!user || !selectedRegion) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please select a region and ensure you are logged in.',
      });
      return;
    }

    setIsLoading(true);
    try {
      await updateUserOnboarding(user.uid, {
        region: selectedRegion,
        onboardingStatus: 'kyc_pending',
      });
      toast({
        title: 'Region Saved',
        description: 'Redirecting to the next step...',
      });
      router.push(`/auth/signup/kyc/${selectedRegion.toLowerCase()}`);
    } catch (error: any) {
      console.error('Failed to update region:', error);
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: 'Could not save your region. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if(authLoading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Your Region</CardTitle>
        <CardDescription>
          This helps us tailor your experience and comply with local regulations.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {regions.map((region) => (
            <button
              key={region.code}
              onClick={() => setSelectedRegion(region.code as Region)}
              className={cn(
                'flex items-center gap-4 rounded-lg border p-4 text-left transition-all hover:bg-muted',
                selectedRegion === region.code && 'ring-2 ring-primary bg-muted'
              )}
            >
              <Image src={region.flag} alt={`${region.name} flag`} width={40} height={30} className="rounded-sm"/>
              <span className="font-medium">{region.name}</span>
            </button>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleContinue}
          disabled={!selectedRegion || isLoading}
          className="w-full"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
