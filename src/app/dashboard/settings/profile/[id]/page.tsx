'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { initialUsers, UserProfile } from '@/lib/family-members';
import Link from 'next/link';

export default function EditProfilePage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!params.id) {
      return;
    }
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
  }, [params.id, router, toast]);

  const handleUserChange = (field: keyof UserProfile, value: string) => {
    setUser((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSaveChanges = () => {
    // In a real app, you would save this to a backend.
    // For now, we'll just show a toast and navigate back.
    if (user) {
        console.log('Saving user:', user);
        toast({
            title: 'Profile Updated',
            description: `Changes for ${user.name} have been saved.`,
        });
        router.push('/dashboard/settings');
    }
  };
  
  if (!user) {
      return <div>Loading...</div> // Or a skeleton loader
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>
                Update personal information for {user.name}.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                <Avatar className="h-24 w-24">
                    <AvatarImage
                    src={user.avatar}
                    alt={user.name}
                    data-ai-hint={user.hint}
                    />
                    <AvatarFallback>
                    {user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                </Button>
                </div>
                <div className="flex-grow space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                        id="name"
                        value={user.name}
                        onChange={(e) => handleUserChange('name', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                        id="email"
                        type="email"
                        value={user.email || ''}
                        onChange={(e) => handleUserChange('email', e.target.value)}
                        disabled={user.relationship !== 'Primary'}
                        />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="relationship">Relationship</Label>
                    <Input
                        id="relationship"
                        value={user.relationship}
                        onChange={(e) => handleUserChange('relationship', e.target.value)}
                        disabled={user.relationship === 'Primary'}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                        id="dob"
                        type="date"
                        value={user.dob || ''}
                        onChange={(e) => handleUserChange('dob', e.target.value)}
                    />
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
