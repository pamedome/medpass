'use client';

import { useState } from 'react';
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
import {
  Github,
  Upload,
  MoreVertical,
  UserCheck,
  Edit,
  Trash2,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';

interface UserProfile {
  id: number;
  name: string;
  email?: string;
  relationship: string;
  avatar: string;
  hint: string;
}

const initialUsers: UserProfile[] = [
  {
    id: 1,
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    relationship: 'Primary',
    avatar: 'https://placehold.co/100x100/E0E0E0/BDBDBD.png',
    hint: 'user avatar',
  },
  {
    id: 2,
    name: 'John Doe',
    relationship: 'Spouse',
    avatar: 'https://placehold.co/100x100/A9D5E5/333333.png',
    hint: 'man smiling',
  },
  {
    id: 3,
    name: 'Jimmy Doe',
    relationship: 'Child',
    avatar: 'https://placehold.co/100x100/D4EDDA/333333.png',
    hint: 'boy smiling',
  },
];

export default function SettingsPage() {
  const [isGithubConnected, setIsGithubConnected] = useState(false);
  const { toast } = useToast();

  const [users, setUsers] = useState<UserProfile[]>(initialUsers);
  const [activeUser, setActiveUser] = useState<UserProfile>(initialUsers[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserProfile | null>(null);

  const handleUserChange = (field: keyof UserProfile, value: string) => {
    setActiveUser((prev) => ({ ...prev!, [field]: value }));
  };

  const handleSaveChanges = () => {
    setUsers(users.map((u) => (u.id === activeUser.id ? activeUser : u)));
    setIsEditing(false);
    toast({
      title: 'Profile Updated',
      description: `Changes for ${activeUser.name} have been saved.`,
    });
  };

  const handleSwitchUser = (user: UserProfile) => {
    if (isEditing) {
      toast({
        variant: 'destructive',
        title: 'Unsaved Changes',
        description:
          'Please save or cancel your current changes before switching accounts.',
      });
      return;
    }
    setActiveUser(user);
    toast({
      title: 'Account Switched',
      description: `You are now viewing ${user.name}'s profile.`,
    });
  };

  const handleAddMember = () => {
    const newId = Math.max(...users.map((u) => u.id)) + 1;
    const newMember: UserProfile = {
      id: newId,
      name: 'New Family Member',
      relationship: 'Family',
      avatar: 'https://placehold.co/100x100/CCCCCC/333333.png',
      hint: 'person outline',
    };
    setUsers([...users, newMember]);
    toast({
      title: 'Member Added',
      description: 'A new family member profile has been created.',
    });
  };

  const handleDeleteUser = (user: UserProfile) => {
    if (user.relationship === 'Primary') {
      toast({
        variant: 'destructive',
        title: 'Action Not Allowed',
        description: 'Cannot remove the primary account holder.',
      });
      return;
    }
    setUserToDelete(user);
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      setUsers(users.filter((u) => u.id !== userToDelete.id));
      toast({
        title: 'Member Removed',
        description: `${userToDelete.name} has been removed from the family.`,
      });
      if (activeUser.id === userToDelete.id) {
        setActiveUser(
          users.find((u) => u.relationship === 'Primary') || users[0]
        );
      }
      setUserToDelete(null);
    }
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Update personal information for {activeUser.name}.
              </CardDescription>
            </div>
            {isEditing ? (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    // Reset changes by finding the original user state
                    const originalUser = users.find(
                      (u) => u.id === activeUser.id
                    );
                    if (originalUser) setActiveUser(originalUser);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveChanges}>Save Changes</Button>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-6">
            <div className="flex flex-col items-center gap-2">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={activeUser.avatar}
                  alt={activeUser.name}
                  data-ai-hint={activeUser.hint}
                />
                <AvatarFallback>
                  {activeUser.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" disabled={!isEditing}>
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </div>
            <div className="flex-grow space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={activeUser.name}
                  onChange={(e) => handleUserChange('name', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              {activeUser.email && (
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={activeUser.email}
                    onChange={(e) => handleUserChange('email', e.target.value)}
                    disabled={
                      !isEditing || activeUser.relationship !== 'Primary'
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Family Accounts</CardTitle>
          <CardDescription>
            Switch between or manage profiles for your family members.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {users.map((member) => (
            <div
              key={member.id}
              className={cn(
                'flex items-center justify-between rounded-lg border p-4 transition-colors',
                activeUser.id === member.id && 'bg-muted'
              )}
            >
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage
                    src={member.avatar}
                    alt={member.name}
                    data-ai-hint={member.hint}
                  />
                  <AvatarFallback>
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {member.relationship}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {activeUser.id !== member.id && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSwitchUser(member)}
                  >
                    <UserCheck className="mr-2 h-4 w-4" /> Switch
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onSelect={() => {
                        handleSwitchUser(member);
                        setIsEditing(true);
                      }}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => handleDeleteUser(member)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddMember}>Add Family Member</Button>
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
              <Button
                variant="outline"
                onClick={() => setIsGithubConnected(false)}
              >
                Disconnect
              </Button>
            ) : (
              <Button onClick={() => setIsGithubConnected(true)}>
                Connect Account
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog
        open={!!userToDelete}
        onOpenChange={(open) => !open && setUserToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove{' '}
              {userToDelete?.name}'s profile and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setUserToDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteUser}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
