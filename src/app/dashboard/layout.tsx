'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import Image from 'next/image';
import {
  LayoutDashboard,
  FileText,
  ShieldAlert,
  Settings,
  User,
  LogOut,
  HelpCircle,
  Search,
  Bell,
  MessageSquare,
  DownloadCloud,
  AreaChart,
  Syringe,
} from 'lucide-react';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { notificationsData, Notification } from '@/lib/notifications';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';
import placeholderImages from '@/lib/placeholder-images.json';

const menuItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/vaccinations', icon: Syringe, label: 'Vaccinations' },
  { href: '/dashboard/analytics', icon: AreaChart, label: 'Analytics' },
  { href: '/dashboard/documents', icon: FileText, label: 'Documents' },
  { href: '/dashboard/emergency-card', icon: ShieldAlert, label: 'Emergency Card' },
];

const generalItems = [
    { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
    { href: '#', icon: HelpCircle, label: 'Help' },
    { href: '/', icon: LogOut, label: 'Logout' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [notifications, setNotifications] = React.useState<Notification[]>(notificationsData);
  const { user } = useAuth();

  const unreadNotifications = notifications.filter(n => !n.read);

  const handleNotificationClick = (notification: Notification) => {
    setNotifications(currentNotifications =>
      currentNotifications.map(n =>
        n.id === notification.id ? { ...n, read: true } : n
      )
    );
    router.push(notification.href);
  };

  return (
    <SidebarProvider>
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarHeader>
          <div className="flex h-16 items-center justify-center gap-2.5 px-3">
            <Link href="/dashboard" className="flex items-center gap-2.5">
              <Image
                src="/logo.svg"
                width={200}
                height={46}
                alt="Medpass Logo"
              />
            </Link>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <div className="flex flex-col gap-y-6">
            <div className='px-2'>
                <p className="px-2 mb-2 text-xs font-semibold uppercase text-muted-foreground/80 tracking-wider">Menu</p>
                <SidebarMenu>
                    {menuItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <Link href={item.href}>
                        <SidebarMenuButton
                            isActive={item.href === '/dashboard' ? pathname === item.href : pathname.startsWith(item.href)}
                            tooltip={item.label}
                        >
                            <item.icon />
                            <span>{item.label}</span>
                        </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </div>
            <div className='px-2'>
                <p className="px-2 mb-2 text-xs font-semibold uppercase text-muted-foreground/80 tracking-wider">General</p>
                <SidebarMenu>
                    {generalItems.map((item) => (
                    <SidebarMenuItem key={item.label}>
                        <Link href={item.href}>
                        <SidebarMenuButton
                            isActive={item.href !== '/' && item.href !== '#' && pathname.startsWith(item.href)}
                            tooltip={item.label}
                        >
                            <item.icon />
                            <span>{item.label}</span>
                        </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </div>
          </div>
        </SidebarContent>
        <SidebarFooter>
           <Card className="mx-2 my-4 bg-primary/[.08] dark:bg-primary/20 border-none shadow-none">
               <CardContent className="p-4 flex flex-col items-center text-center">
                   <div className="bg-primary/20 p-2 rounded-full mb-3">
                      <DownloadCloud className="text-primary size-5"/>
                   </div>
                   <p className="text-sm font-semibold">Download our Mobile App</p>
                   <p className="text-xs text-muted-foreground mt-1">Get easy access on the go</p>
                   <Button size="sm" className="mt-4 w-full bg-primary text-primary-foreground">Download</Button>
               </CardContent>
           </Card>
        </SidebarFooter>
      </Sidebar>
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    type="search" 
                    placeholder="Search records..." 
                    className="w-full rounded-full bg-secondary pl-10 h-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                 />
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                    <MessageSquare className="size-5" />
                    <span className="sr-only">Messages</span>
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative rounded-full">
                             {unreadNotifications.length > 0 && (
                                <Badge
                                variant="destructive"
                                className="absolute -top-1 -right-1 h-4 w-4 justify-center p-0 text-xs"
                                >
                                {unreadNotifications.length}
                                </Badge>
                            )}
                            <Bell className="size-5" />
                            <span className="sr-only">Notifications</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {unreadNotifications.length > 0 ? (
                           unreadNotifications.map((notification) => (
                             <DropdownMenuItem key={notification.id} onSelect={() => handleNotificationClick(notification)} className="cursor-pointer">
                                <div className="flex flex-col">
                                    <span className="font-medium">{notification.title}</span>
                                    <span className="text-xs text-muted-foreground">{notification.date}</span>
                                </div>
                            </DropdownMenuItem>
                           ))
                        ) : (
                            <div className="p-4 text-center text-sm text-muted-foreground">
                                No new notifications
                            </div>
                        )}
                         <DropdownMenuSeparator />
                         <DropdownMenuItem asChild className="justify-center text-sm text-primary cursor-pointer">
                            <Link href="/dashboard/notifications">
                                View all notifications
                            </Link>
                         </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="overflow-hidden rounded-full p-0 w-9 h-9"
                    >
                        <Avatar className="h-9 w-9">
                        <AvatarImage
                            src={placeholderImages.userAvatar.src}
                            alt={placeholderImages.userAvatar.alt}
                            data-ai-hint={placeholderImages.userAvatar.hint}
                        />
                        <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        <div className="flex flex-col">
                            <span>Jane Doe</span>
                            <span className="text-xs font-normal text-muted-foreground">{user?.email ?? 'jane.doe@example.com'}</span>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <Link href="/dashboard/settings">
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <Link href="/">
                        <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                        </DropdownMenuItem>
                    </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}
