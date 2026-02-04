'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Github, Upload, MoreVertical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const familyMembers = [
    {
      name: 'John Doe',
      relationship: 'Spouse',
      avatar: 'https://placehold.co/100x100/A9D5E5/333333.png',
      hint: 'man smiling',
    },
    {
      name: 'Jimmy Doe',
      relationship: 'Child',
      avatar: 'https://placehold.co/100x100/D4EDDA/333333.png',
      hint: 'boy smiling',
    },
];

export default function SettingsPage() {
  const [isGithubConnected, setIsGithubConnected] = useState(false);
  const { toast } = useToast();

  const handleSaveChanges = () => {
    toast({
      title: 'Profile Updated',
      description: 'Your changes have been saved successfully.',
    });
  };

  return (
    <div className="grid gap-6">
       <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Update your personal information and photo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-start gap-6">
                <div className="flex flex-col items-center gap-2">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src="https://placehold.co/100x100/E0E0E0/BDBDBD.png" alt="User" data-ai-hint="user avatar" />
                        <AvatarFallback>TM</AvatarFallback>
                    </Avatar>
                     <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                    </Button>
                </div>
                <div className="flex-grow space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue="Totok Michael" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="tmichael20@mail.com" />
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Family Accounts</CardTitle>
          <CardDescription>
            Manage profiles for your family members.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {familyMembers.map((member, index) => (
            <div key={index} className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.hint} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.relationship}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Remove from Family</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </CardContent>
        <CardFooter>
            <Button>Add Family Member</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integrations</CardTitle>
          <CardDescription>
            Connect your account to other services like GitHub.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-4">
              <Github className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">GitHub</h3>
                {isGithubConnected ? (
                   <p className="text-sm text-muted-foreground">
                    Your account is connected to GitHub.
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Connect to sync repositories and track team collaboration.
                  </p>
                )}
              </div>
            </div>
            {isGithubConnected ? (
              <Button variant="outline" onClick={() => setIsGithubConnected(false)}>Disconnect</Button>
            ) : (
              <Button onClick={() => setIsGithubConnected(true)}>Connect Account</Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
          <Button onClick={handleSaveChanges}>Save Changes</Button>
      </div>
    </div>
  );
}
