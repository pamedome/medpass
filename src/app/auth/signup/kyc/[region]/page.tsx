
'use client';
import { kycFieldConfig } from '@/lib/kyc-config';
import { Region } from '@/lib/types';
import { notFound, useRouter } from 'next/navigation';
import { useForm, FormProvider, useFormContext, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
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
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const FieldRenderer = ({ name, config }: { name: string, config: any }) => {
    const { control } = useFormContext();
    const { label, type, placeholder, options, description, required } = config;
  
    return (
      <FormField
        control={control}
        name={name}
        rules={{ required: required ? 'This field is required.' : false }}
        render={({ field }) => (
          <FormItem className={config.fullWidth ? 'md:col-span-2' : ''}>
            <FormLabel>{label}{required && ' *'}</FormLabel>
            <FormControl>
              <>
                {type === 'text' && <Input placeholder={placeholder} {...field} />}
                {type === 'email' && <Input type="email" placeholder={placeholder} {...field} />}
                {type === 'date' && <Input type="date" {...field} />}
                {type === 'textarea' && <Textarea placeholder={placeholder} {...field} />}
                {type === 'select' && (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((option: any) => (
                        <SelectItem key={option.value || option} value={option.value || option}>
                          {option.label || option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {type === 'radio' && (
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center space-x-4">
                    {options.map((option: any) => (
                      <FormItem key={option.value} className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={option.value} />
                        </FormControl>
                        <FormLabel className="font-normal">{option.label}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                )}
                {type === 'boolean' && (
                     <div className="flex items-center space-x-2">
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        <Label className='font-normal'>{description}</Label>
                     </div>
                )}
                 {type === 'checkbox_group' && (
                    <div className="space-y-2 rounded-md border p-4">
                        {options.map((option: any) => (
                            <FormField
                                key={option.value}
                                control={control}
                                name={name}
                                render={({ field }) => {
                                    return (
                                    <FormItem
                                        key={option.value}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                        <FormControl>
                                        <Checkbox
                                            checked={field.value?.includes(option.value)}
                                            onCheckedChange={(checked) => {
                                            return checked
                                                ? field.onChange([...(field.value || []), option.value])
                                                : field.onChange(
                                                    field.value?.filter(
                                                    (value: string) => value !== option.value
                                                    )
                                                )
                                            }}
                                        />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            {option.label}
                                        </FormLabel>
                                    </FormItem>
                                    )
                                }}
                            />
                        ))}
                    </div>
                )}
              </>
            </FormControl>
            {description && type !== 'boolean' && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

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
        const kycPayload = {
            kyc: {
                ...userProfile?.kyc,
                kycStatus: 'complete',
                region: region,
                [region.toLowerCase()]: data,
            },
            onboardingStatus: 'verify_pending',
        };

      await updateUserOnboarding(user.uid, kycPayload);

      toast({
        title: 'Information Saved',
        description: 'Your KYC information has been submitted for verification.',
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
                            {config.sections.map((section: any) => (
                                <AccordionItem value={section.id} key={section.id}>
                                    <AccordionTrigger>{section.title}</AccordionTrigger>
                                    <AccordionContent className="space-y-4 p-1">
                                        <p className="text-sm text-muted-foreground">{section.description}</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                            {section.fields.map((field: any) => (
                                                <FieldRenderer key={field.name} name={field.name} config={field} />
                                            ))}
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
