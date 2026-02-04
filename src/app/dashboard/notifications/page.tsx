'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { notificationsData, Notification } from '@/lib/notifications';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Bell, Archive } from 'lucide-react';
import Link from 'next/link';

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>(notificationsData);

  const handleMarkAsRead = (id: string, href: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    router.push(href);
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotifications = notifications.filter((n) => !n.read);
  const readNotifications = notifications.filter((n) => n.read);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            Manage your alerts and stay up-to-date.
          </p>
        </div>
        {unreadNotifications.length > 0 && (
          <Button onClick={markAllAsRead}>Mark all as read</Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Notifications</CardTitle>
          <CardDescription>
            You have {unreadNotifications.length} unread notifications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {unreadNotifications.length > 0 ? (
            <div className="space-y-4">
              {unreadNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-4 p-4 rounded-lg border cursor-pointer hover:bg-muted"
                  onClick={() => handleMarkAsRead(notification.id, notification.href)}
                >
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{notification.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">You're all caught up!</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Previously Read</CardTitle>
          <CardDescription>
            Your history of previously viewed notifications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {readNotifications.length > 0 ? (
            <div className="space-y-4">
              {readNotifications.map((notification) => (
                 <Link href={notification.href} key={notification.id} className="block">
                    <div
                    className="flex items-start gap-4 p-4 rounded-lg border border-transparent hover:bg-muted"
                    >
                    <div className="bg-muted p-2 rounded-full">
                        <Archive className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold text-muted-foreground">{notification.title}</p>
                        <p className="text-sm text-muted-foreground">
                        {notification.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                        {notification.date}
                        </p>
                    </div>
                    </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No archived notifications.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
