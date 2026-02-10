'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Github,
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
import { initialUsers, UserProfile } from '@/lib/family-members';
import { Skeleton } from '@/components/ui/skeleton';


export default function SettingsPage() {
  const router = useRouter();
  const [isGithubConnected, setIsGithubConnected] = useState(false);
  const { toast } = useToast();

  const [users, setUsers] = useState<UserProfile[]>(initialUsers);
  const [activeUser, setActiveUser] = useState<UserProfile | null>(null);
  const [userToDelete, setUserToDelete] = useState<UserProfile | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('activeFamilyMemberId');
    const activeId = storedUserId ? parseInt(storedUserId, 10) : 1;
    const currentUser = users.find(u => u.id === activeId) || users.find(u => u.relationship === 'Primary') || users[0];
    setActiveUser(currentUser);
  }, [users]);


  const handleSwitchUser = (user: UserProfile) => {
    setActiveUser(user);
    localStorage.setItem('activeFamilyMemberId', user.id.toString());
    window.dispatchEvent(new Event('familyMemberChanged'));
    toast({
      title: 'Account Switched',
      description: `You are now viewing the dashboard for ${user.name}.`,
    });
  };

  const handleAddMember = () => {
    router.push('/dashboard/settings/profile/new');
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
    if (userToDelete && activeUser) {
      const remainingUsers = users.filter((u) => u.id !== userToDelete.id)
      setUsers(remainingUsers);

      toast({
        title: 'Member Removed',
        description: `${userToDelete.name} has been removed from the family.`,
      });

      if (activeUser.id === userToDelete.id) {
        const newActiveUser = remainingUsers.find((u) => u.relationship === 'Primary') || remainingUsers[0];
        if (newActiveUser) {
            handleSwitchUser(newActiveUser);
        }
      }
      setUserToDelete(null);
    }
  };

  if (!activeUser) {
    return (
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-96" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
                <Skeleton className="h-9 w-24 rounded-md" />
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-40 rounded-md" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Family Accounts</CardTitle>
          <CardDescription>
            Manage profiles for your family members. You are currently viewing the dashboard for{' '}
            <span className="font-semibold text-foreground">{activeUser.name}</span>.
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
              <div className="flex flex-1 items-center gap-4 overflow-hidden">
                <Avatar className="h-12 w-12">
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
                <div className="flex-1 overflow-hidden">
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {member.relationship}
                  </p>
                  {member.dob && (
                    <p className="text-xs text-muted-foreground">
                      {`DOB: ${member.dob}`}
                    </p>
                  )}
                  {member.email && (
                    <p className="truncate text-xs text-muted-foreground">
                      {member.email}
                    </p>
                  )}
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
                        router.push(`/dashboard/settings/profile/${member.id}`)
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
