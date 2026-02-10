'use client';
import { kycFieldConfig } from '@/lib/kyc-config';
import { Region } from '@/lib/types';
import { notFound, useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useAuth } from '@/hooks/use-auth';
import { updateUserOnboarding } from '@/lib/firebase-services';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

const renderField = (fieldConfig: any) => {
    // This is a placeholder. In a real app you would have
    // components for each field type (text, select, checkbox, etc.)
    // For now we'll just show the label.
    return (
        <div key={fieldConfig.name} className="p-2 border-b">
           <label className="text-sm font-medium">{fieldConfig.label}</label>
           <p className="text-xs text-muted-foreground">{fieldConfig.name}</p>
        </div>
    )
}

export default function KycPage({ params }: { params: { region: string } }) {
  const region = params.region.toUpperCase() as Region;
  const config = kycFieldConfig[region];
  const router = useRouter();
  const { toast } = useToast();
  const { user, userProfile, loading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const methods = useForm({
    // resolver: zodResolver(config.schema), // You'd generate a Zod schema from your config
  });

  if (!config) {
    notFound();
  }

  const onSubmit = async (data: any) => {
    if (!user) return;
    setIsSubmitting(true);
    try {
        const kycData = {
            kyc: {
                ...userProfile?.kyc,
                kycStatus: 'complete',
                region: region,
                [region.toLowerCase()]: data,
            }
        };

      await updateUserOnboarding(user.uid, {
        ...kycData,
        onboardingStatus: 'verify_pending',
      });

      toast({
        title: 'Information Saved',
        description: 'Your KYC information has been saved.',
      });
      router.push('/auth/signup/verify');
    } catch (error: any) {
      console.error('KYC submission error', error);
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: 'Could not save your information. Please try again.',
      });
    } finally {
        setIsSubmitting(false);
    }
  };

  if(authLoading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <FormProvider {...methods}>
        <Card>
            <CardHeader>
                <CardTitle>Patient Information ({region})</CardTitle>
                <CardDescription>
                Please complete the following sections. This information is required to provide you with clinical services.
                </CardDescription>
            </CardHeader>
            <Form {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full" defaultValue={config.sections[0].id}>
                            {config.sections.map((section) => (
                                <AccordionItem value={section.id} key={section.id}>
                                    <AccordionTrigger>{section.title}</AccordionTrigger>
                                    <AccordionContent className="space-y-4 p-1">
                                        <p className="text-sm text-muted-foreground">{section.description}</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-md">
                                            {/* TODO: Implement form fields based on config */}
                                            <p className="text-center md:col-span-2 text-muted-foreground italic p-8">
                                                Form fields for the "{section.title}" section will be rendered here based on the KYC configuration.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save and Continue
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    </FormProvider>
  );
}
