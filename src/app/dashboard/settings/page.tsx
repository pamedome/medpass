import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Github } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="grid gap-6">
       <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Update your personal information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Totok Michael" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="tmichael20@mail.com" />
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
                <p className="text-sm text-muted-foreground">
                  Connect to sync repositories and track team collaboration.
                </p>
              </div>
            </div>
            <Button>Connect Account</Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
          <Button>Save Changes</Button>
      </div>
    </div>
  );
}
