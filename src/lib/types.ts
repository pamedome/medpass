import { FieldValue } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  email: string | null;
  createdAt: FieldValue;
  acceptedTermsAt?: FieldValue;
  acceptedPrivacyAt?: FieldValue;
  marketingOptIn?: boolean;
}
