'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { initialUsers, UserProfile } from '@/lib/family-members';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { countries } from '@/lib/countries';
import { Textarea } from '@/components/ui/textarea';
import placeholderImages from '@/lib/placeholder-images.json';

const disabilityOptions = [
    { id: 'learning', label: 'Learning disability' },
    { id: 'mental', label: 'Mental health' },
    { id: 'physical', label: 'Physical impairment' },
    { id: 'illness', label: 'Long-standing illness' },
    { id: 'other', label: 'Other' },
    { id: 'no-known', label: 'No known disability' },
]

const ethnicityOptions = [
    'White',
    'Mixed / Multiple ethnic groups',
    'Asian / Asian British',
    'Black / African / Caribbean / Black British',
    'Other ethnic group'
];

const newMemberTemplate: UserProfile = {
    id: 0, // Temp id
    name: 'New Family Member',
    relationship: 'Family',
    avatar: placeholderImages.newMemberAvatar.src,
    hint: 'person outline',
    email: '',
    dob: '',
    title: '',
    otherTitle: '',
    firstName: '',
    middleNames: '',
    surname: '',
    previousSurname: '',
    preferredName: '',
    nhsNumber: '',
    gender: undefined,
    preferredPronouns: '',
    addressLine1: '',
    addressLine2: '',
    townCity: '',
    county: '',
    postcode: '',
    homeTel: '',
    mobileTel: '',
    workTel: '',
    bloodGroup: '',
    genotype: '',
    height: '',
    weight: '',
    bmi: '',
    allergies: '',
    countryOfBirth: undefined,
    nationality: undefined,
    firstLanguage: undefined,
    firstLanguageOther: '',
    interpreterNeeded: undefined,
    ethnicity: undefined,
    disabilities: [],
    disabilityOther: '',
    nextOfKinName: '',
    nextOfKinRelationship: '',
    nextOfKinPhone: '',
    nextOfKinAddress: '',
    currentGPPractice: '',
    previousGPAddress: '',
};


export default function EditProfilePage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [user, setUser] = useState<UserProfile | null>(null);

  const isNew = params.id === 'new';

  useEffect(() => {
    if (!params.id) {
      return;
    }
    
    if (isNew) {
        setUser(newMemberTemplate);
    } else {
        const userId = parseInt(params.id as string, 10);
        const userToEdit = initialUsers.find((u) => u.id === userId);
        if (userToEdit) {
          setUser(userToEdit);
        } else {
          toast({
            variant: 'destructive',
            title: 'User not found',
            description: 'The profile you are trying to edit does not exist.',
          });
          router.push('/dashboard/settings');
        }
    }
  }, [params.id, router, toast, isNew]);

  const handleUserChange = (
    field: keyof UserProfile,
    value: string | string[]
  ) => {
    setUser((prev) => {
        if (!prev) return null;
        const updatedUser = { ...prev, [field]: value };
        if (field === 'firstName' || field === 'surname') {
            updatedUser.name = `${updatedUser.firstName || ''} ${updatedUser.surname || ''}`.trim();
        }
        return updatedUser;
      });
  };
  
  const handleDisabilityChange = (checked: boolean, value: string) => {
    setUser((prev) => {
      if (!prev) return null;
      const currentDisabilities = prev.disabilities || [];
      if (checked) {
        return {
          ...prev,
          disabilities: [...currentDisabilities.filter(d => d !== 'No known disability'), value],
        };
      } else {
        return {
          ...prev,
          disabilities: currentDisabilities.filter((d) => d !== value),
        };
      }
    });
  };

  const calculateAge = (dob: string | undefined): string => {
    if (!dob) return '';
    try {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 0 ? age.toString() : '';
    } catch {
      return '';
    }
  };

  const handleSaveChanges = () => {
    if (user) {
        const finalUser = {
            ...user,
            name: `${user.firstName || ''} ${user.surname || ''}`.trim() || (isNew ? 'New Family Member' : user.name)
        };

        if (isNew) {
          const newId = Math.max(0, ...initialUsers.map((u) => u.id)) + 1;
          initialUsers.push({ ...finalUser, id: newId });
          toast({
            title: 'Member Added',
            description: `${finalUser.name} has been added to your family.`,
          });
        } else {
          const userIndex = initialUsers.findIndex(u => u.id === finalUser.id);
          if (userIndex !== -1) {
            initialUsers[userIndex] = finalUser;
            toast({
              title: 'Profile Updated',
              description: `Changes for ${finalUser.name} have been saved.`,
            });
          }
        }
        router.push('/dashboard/settings');
      }
  };

  if (!user) {
    return <div>Loading...</div>; // Or a skeleton loader
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>{isNew ? 'Add Family Member' : 'Edit Profile'}</CardTitle>
          <CardDescription>
            {isNew ? 'Enter the details for the new family member.' : `Update personal information for ${user.name}.`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Section 1: Personal Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">1. Personal Details</h3>
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 rounded-lg border p-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2 lg:col-span-1 sm:col-span-2">
                    <Label htmlFor="title">Title</Label>
                    <Select
                    value={user.title}
                    onValueChange={(value) => handleUserChange('title', value)}
                    >
                    <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Mr">Mr</SelectItem>
                        <SelectItem value="Mrs">Mrs</SelectItem>
                        <SelectItem value="Miss">Miss</SelectItem>
                        <SelectItem value="Ms">Ms</SelectItem>
                        <SelectItem value="Dr">Dr</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                {user.title === 'Other' && (
                <div className="space-y-2 lg:col-span-3 sm:col-span-2">
                    <Label htmlFor="otherTitle">Other Title</Label>
                    <Input id="otherTitle" value={user.otherTitle || ''} onChange={(e) => handleUserChange('otherTitle', e.target.value)} />
                </div>
                )}
                 <div className="space-y-2 lg:col-span-2 sm:col-span-1"><Label htmlFor="firstName">First Name(s)</Label><Input id="firstName" value={user.firstName || ''} onChange={(e) => handleUserChange('firstName', e.target.value)}/></div>
                 <div className="space-y-2"><Label htmlFor="middleNames">Middle Name(s)</Label><Input id="middleNames" value={user.middleNames || ''} onChange={(e) => handleUserChange('middleNames', e.target.value)} /></div>
                 <div className="space-y-2"><Label htmlFor="surname">Surname</Label><Input id="surname" value={user.surname || ''} onChange={(e) => handleUserChange('surname', e.target.value)} /></div>
                 <div className="space-y-2"><Label htmlFor="previousSurname">Previous Surname</Label><Input id="previousSurname" value={user.previousSurname || ''} onChange={(e) => handleUserChange('previousSurname', e.target.value)} /></div>
                 <div className="space-y-2"><Label htmlFor="preferredName">Preferred Name</Label><Input id="preferredName" value={user.preferredName || ''} onChange={(e) => handleUserChange('preferredName', e.target.value)} /></div>
                 <div className="space-y-2"><Label htmlFor="nhsNumber">NHS Number</Label><Input id="nhsNumber" value={user.nhsNumber || ''} onChange={(e) => handleUserChange('nhsNumber', e.target.value)} /></div>
                 <div className="space-y-2"><Label htmlFor="dob">Date of Birth</Label><Input id="dob" type="date" value={user.dob || ''} onChange={(e) => handleUserChange('dob', e.target.value)} /></div>
                 <div className="space-y-2"><Label htmlFor="age">Age</Label><Input id="age" value={calculateAge(user.dob)} disabled /></div>
                 <div className="space-y-2"><Label>Gender</Label><RadioGroup value={user.gender} onValueChange={(value) => handleUserChange('gender', value)} className="flex gap-4"><div className="flex items-center space-x-2"><RadioGroupItem value="Male" id="male" /><Label htmlFor="male">Male</Label></div><div className="flex items-center space-x-2"><RadioGroupItem value="Female" id="female" /><Label htmlFor="female">Female</Label></div></RadioGroup></div>
                 <div className="space-y-2"><Label htmlFor="preferredPronouns">Preferred Pronouns</Label><Input id="preferredPronouns" value={user.preferredPronouns || ''} onChange={(e) => handleUserChange('preferredPronouns', e.target.value)} /></div>
            </div>
          </div>
          
          {/* Section 2: Contact Details */}
          <div className="space-y-4">
              <h3 className="text-lg font-semibold">2. Contact Details</h3>
              <div className="space-y-4 rounded-lg border p-4">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                    <div className="space-y-2 sm:col-span-2"><Label htmlFor="addressLine1">Address Line 1</Label><Input id="addressLine1" value={user.addressLine1 || ''} onChange={(e) => handleUserChange('addressLine1', e.target.value)} /></div>
                    <div className="space-y-2 sm:col-span-2"><Label htmlFor="addressLine2">Address Line 2</Label><Input id="addressLine2" value={user.addressLine2 || ''} onChange={(e) => handleUserChange('addressLine2', e.target.value)} /></div>
                    <div className="space-y-2"><Label htmlFor="townCity">Town/City</Label><Input id="townCity" value={user.townCity || ''} onChange={(e) => handleUserChange('townCity', e.target.value)} /></div>
                    <div className="space-y-2"><Label htmlFor="county">County</Label><Input id="county" value={user.county || ''} onChange={(e) => handleUserChange('county', e.target.value)} /></div>
                    <div className="space-y-2"><Label htmlFor="postcode">Postcode</Label><Input id="postcode" value={user.postcode || ''} onChange={(e) => handleUserChange('postcode', e.target.value)} /></div>
                    <div className="space-y-2"><Label htmlFor="homeTel">Home Tel</Label><Input id="homeTel" value={user.homeTel || ''} onChange={(e) => handleUserChange('homeTel', e.target.value)} /></div>
                    <div className="space-y-2"><Label htmlFor="mobileTel">Mobile Tel</Label><Input id="mobileTel" value={user.mobileTel || ''} onChange={(e) => handleUserChange('mobileTel', e.target.value)} /></div>
                    <div className="space-y-2"><Label htmlFor="workTel">Work Tel</Label><Input id="workTel" value={user.workTel || ''} onChange={(e) => handleUserChange('workTel', e.target.value)} /></div>
                    <div className="space-y-2 sm:col-span-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" value={user.email || ''} onChange={(e) => handleUserChange('email', e.target.value)} disabled={user.relationship !== 'Primary' && !isNew}/></div>
                  </div>
              </div>
          </div>
          
          {/* Section 3: Health & Medical */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">3. Health & Medical</h3>
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 rounded-lg border p-4 sm:grid-cols-2 lg:grid-cols-3">
                 <div className="space-y-2"><Label htmlFor="bloodGroup">Blood Group</Label><Input id="bloodGroup" value={user.bloodGroup || ''} onChange={(e) => handleUserChange('bloodGroup', e.target.value)} /></div>
                 <div className="space-y-2"><Label htmlFor="genotype">Genotype</Label><Input id="genotype" value={user.genotype || ''} onChange={(e) => handleUserChange('genotype', e.target.value)} /></div>
                 <div className="space-y-2"><Label htmlFor="height">Height</Label><Input id="height" value={user.height || ''} onChange={(e) => handleUserChange('height', e.target.value)} /></div>
                 <div className="space-y-2"><Label htmlFor="weight">Weight</Label><Input id="weight" value={user.weight || ''} onChange={(e) => handleUserChange('weight', e.target.value)} /></div>
                 <div className="space-y-2"><Label htmlFor="bmi">BMI</Label><Input id="bmi" value={user.bmi || ''} onChange={(e) => handleUserChange('bmi', e.target.value)} /></div>
                 <div className="space-y-2 sm:col-span-2 lg:col-span-3">
                    <Label htmlFor="allergies">Allergies</Label>
                    <Textarea id="allergies" value={user.allergies || ''} onChange={(e) => handleUserChange('allergies', e.target.value)} placeholder="e.g., Penicillin, Peanuts" />
                </div>
            </div>
          </div>

          {/* Section 4: NHS Equality Monitoring */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">4. NHS Equality Monitoring (Optional)</h3>
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 rounded-lg border p-4 sm:grid-cols-2">
                 <div className="space-y-2">
                    <Label htmlFor="countryOfBirth">Country of Birth</Label>
                    <Select value={user.countryOfBirth} onValueChange={(value) => handleUserChange('countryOfBirth', value)}>
                        <SelectTrigger id="countryOfBirth"><SelectValue placeholder="Select a country..." /></SelectTrigger>
                        <SelectContent>
                            {countries.map(country => (
                                <SelectItem key={country} value={country}>{country}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="nationality">Nationality</Label>
                    <Select value={user.nationality} onValueChange={(value) => handleUserChange('nationality', value)}>
                        <SelectTrigger id="nationality"><SelectValue placeholder="Select a nationality..." /></SelectTrigger>
                        <SelectContent>
                            {countries.map(country => (
                                <SelectItem key={country} value={country}>{country}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                 </div>
                 <div className="space-y-2"><Label>First Language</Label><RadioGroup value={user.firstLanguage} onValueChange={(value) => handleUserChange('firstLanguage', value)} className="flex gap-4"><div className="flex items-center space-x-2"><RadioGroupItem value="English" id="lang-en" /><Label htmlFor="lang-en">English</Label></div><div className="flex items-center space-x-2"><RadioGroupItem value="Other" id="lang-other" /><Label htmlFor="lang-other">Other</Label></div></RadioGroup></div>
                 {user.firstLanguage === 'Other' && <div className="space-y-2"><Label htmlFor="firstLanguageOther">Please specify</Label><Input id="firstLanguageOther" value={user.firstLanguageOther || ''} onChange={(e) => handleUserChange('firstLanguageOther', e.target.value)} /></div>}
                 <div className="space-y-2"><Label>Interpreter needed?</Label><RadioGroup value={user.interpreterNeeded} onValueChange={(value) => handleUserChange('interpreterNeeded', value)} className="flex gap-4"><div className="flex items-center space-x-2"><RadioGroupItem value="Yes" id="int-yes" /><Label htmlFor="int-yes">Yes</Label></div><div className="flex items-center space-x-2"><RadioGroupItem value="No" id="int-no" /><Label htmlFor="int-no">No</Label></div></RadioGroup></div>
                 <div className="space-y-2 sm:col-span-2"><Label htmlFor="ethnicity">Ethnicity</Label><Select value={user.ethnicity} onValueChange={(value) => handleUserChange('ethnicity', value)}><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent>{ethnicityOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select></div>
                 <div className="space-y-2 sm:col-span-2"><Label>Disability/Long-term health condition</Label><div className="space-y-2 rounded-md border p-4">{disabilityOptions.map(opt => (<div key={opt.id} className="flex items-center space-x-2"><Checkbox id={`dis-${opt.id}`} checked={user.disabilities?.includes(opt.label)} onCheckedChange={(checked) => handleDisabilityChange(Boolean(checked), opt.label)} /><Label htmlFor={`dis-${opt.id}`}>{opt.label}</Label></div>))}{user.disabilities?.includes('Other') && (<div className="space-y-2 pt-2"><Label htmlFor="disabilityOther">Please specify</Label><Input id="disabilityOther" value={user.disabilityOther || ''} onChange={(e) => handleUserChange('disabilityOther', e.target.value)} /></div>)}</div></div>
            </div>
          </div>
          
          {/* Section 5: Emergency Contact */}
          <div className="space-y-4">
              <h3 className="text-lg font-semibold">5. Emergency Contact</h3>
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 rounded-lg border p-4 sm:grid-cols-2">
                 <div className="space-y-2"><Label htmlFor="nextOfKinName">Next of Kin Name</Label><Input id="nextOfKinName" value={user.nextOfKinName || ''} onChange={(e) => handleUserChange('nextOfKinName', e.target.value)} /></div>
                 <div className="space-y-2"><Label htmlFor="nextOfKinRelationship">Relationship</Label><Input id="nextOfKinRelationship" value={user.nextOfKinRelationship || ''} onChange={(e) => handleUserChange('nextOfKinRelationship', e.target.value)} /></div>
                 <div className="space-y-2"><Label htmlFor="nextOfKinPhone">Phone</Label><Input id="nextOfKinPhone" value={user.nextOfKinPhone || ''} onChange={(e) => handleUserChange('nextOfKinPhone', e.target.value)} /></div>
                 <div className="space-y-2"><Label htmlFor="nextOfKinAddress">Address (if different)</Label><Input id="nextOfKinAddress" value={user.nextOfKinAddress || ''} onChange={(e) => handleUserChange('nextOfKinAddress', e.target.value)} /></div>
              </div>
          </div>

          {/* Section 6: GP Medical History */}
          <div className="space-y-4">
              <h3 className="text-lg font-semibold">6. GP Medical History</h3>
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 rounded-lg border p-4 sm:grid-cols-2">
                 <div className="space-y-2"><Label htmlFor="currentGPPractice">Current GP Practice</Label><Input id="currentGPPractice" value={user.currentGPPractice || ''} onChange={(e) => handleUserChange('currentGPPractice', e.target.value)} /></div>
                 <div className="space-y-2"><Label htmlFor="previousGPAddress">Previous GP Address</Label><Input id="previousGPAddress" value={user.previousGPAddress || ''} onChange={(e) => handleUserChange('previousGPAddress', e.target.value)} /></div>
              </div>
          </div>

        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="ghost" asChild>
            <Link href="/dashboard/settings">Cancel</Link>
          </Button>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
