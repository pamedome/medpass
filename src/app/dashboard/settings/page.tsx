
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Github, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
