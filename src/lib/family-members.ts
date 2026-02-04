export interface UserProfile {
  id: number;
  name: string;
  email?: string;
  dob?: string;
  relationship: string;
  avatar: string;
  hint: string;
}

export const initialUsers: UserProfile[] = [
  {
    id: 1,
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    dob: '1990-05-21',
    relationship: 'Primary',
    avatar: 'https://placehold.co/100x100/E0E0E0/BDBDBD.png',
    hint: 'user avatar',
  },
  {
    id: 2,
    name: 'John Doe',
    dob: '1988-11-15',
    relationship: 'Spouse',
    avatar: 'https://placehold.co/100x100/A9D5E5/333333.png',
    hint: 'man smiling',
  },
  {
    id: 3,
    name: 'Jimmy Doe',
    dob: '2015-03-10',
    relationship: 'Child',
    avatar: 'https://placehold.co/100x100/D4EDDA/333333.png',
    hint: 'boy smiling',
  },
];
