export interface UserProfile {
  id: number;
  name: string;
  email?: string;
  dob?: string;
  relationship: string;
  avatar: string;
  hint: string;

  // 1. PERSONAL DETAILS
  title?: string;
  otherTitle?: string;
  firstName?: string;
  middleNames?: string;
  surname?: string;
  previousSurname?: string;
  preferredName?: string;
  nhsNumber?: string;
  gender?: 'Male' | 'Female';
  preferredPronouns?: string;

  // 2. CONTACT DETAILS
  addressLine1?: string;
  addressLine2?: string;
  townCity?: string;
  county?: string;
  postcode?: string;
  homeTel?: string;
  mobileTel?: string;
  workTel?: string;

  // 3. NHS EQUALITY MONITORING
  countryOfBirth?: string;
  nationality?: string;
  firstLanguage?: 'English' | 'Other';
  firstLanguageOther?: string;
  interpreterNeeded?: 'Yes' | 'No';
  ethnicity?: string;
  disabilities?: string[];
  disabilityOther?: string;

  // 4. EMERGENCY CONTACT
  nextOfKinName?: string;
  nextOfKinRelationship?: string;
  nextOfKinPhone?: string;
  nextOfKinAddress?: string;

  // 5. GP MEDICAL HISTORY
  currentGPPractice?: string;
  previousGPAddress?: string;
}

export const initialUsers: UserProfile[] = [
  {
    id: 1,
    name: 'Jane Doe',
    firstName: 'Jane',
    surname: 'Doe',
    email: 'jane.doe@example.com',
    dob: '1990-05-21',
    relationship: 'Primary',
    avatar: 'https://placehold.co/100x100/E0E0E0/BDBDBD.png',
    hint: 'user avatar',
    title: 'Mrs',
    preferredName: 'Jane',
    nhsNumber: '123 456 7890',
    gender: 'Female',
    addressLine1: '123 Health St',
    townCity: 'Medville',
    county: 'Healthshire',
    postcode: 'MD1 1AA',
    mobileTel: '07123456789',
    nextOfKinName: 'John Doe',
    nextOfKinRelationship: 'Spouse',
    nextOfKinPhone: '07123456780',
  },
  {
    id: 2,
    name: 'John Doe',
    firstName: 'John',
    surname: 'Doe',
    dob: '1988-11-15',
    relationship: 'Spouse',
    avatar: 'https://placehold.co/100x100/A9D5E5/333333.png',
    hint: 'man smiling',
  },
  {
    id: 3,
    name: 'Jimmy Doe',
    firstName: 'Jimmy',
    surname: 'Doe',
    dob: '2015-03-10',
    relationship: 'Child',
    avatar: 'https://placehold.co/100x100/D4EDDA/333333.png',
    hint: 'boy smiling',
  },
];
