export type Notification = {
  id: string;
  title: string;
  description: string;
  date: string;
  href: string;
  read: boolean;
};

export const notificationsData: Notification[] = [
  {
    id: 'notif1',
    title: 'New lab results available',
    description: 'Annual Check-up Results are ready for review.',
    date: '2 hours ago',
    href: '/dashboard/documents/doc1',
    read: false,
  },
  {
    id: 'notif2',
    title: 'Appointment reminder',
    description: 'Dr. Sarah Johnson - Dec 1, 2024',
    date: '1 day ago',
    href: '/dashboard/appointments/appt-1',
    read: false,
  },
  {
    id: 'notif3',
    title: 'Prescription ready',
    description: 'Your prescription for Amoxicillin is ready for pickup.',
    date: '3 days ago',
    href: '/dashboard/documents/doc3',
    read: false,
  },
  {
    id: 'notif4',
    title: 'Vaccination record updated',
    description: 'Your Influenza (Flu) shot has been recorded.',
    date: '1 week ago',
    href: '/dashboard/vaccinations/vax1',
    read: true,
  },
  {
    id: 'notif5',
    title: 'Emergency Card Verified',
    description: 'Your Emergency QR code profile has been successfully updated.',
    date: '2 weeks ago',
    href: '/dashboard/emergency-card',
    read: true,
  },
    {
    id: 'notif6',
    title: 'New Document Shared',
    description: 'Dr. Alan Grant shared "MRI Scan - Left Knee".',
    date: '1 month ago',
    href: '/dashboard/documents/doc2',
    read: true,
  },
];
