import { FieldValue } from 'firebase/firestore';

export type Region = 'EU' | 'KE' | 'NG' | 'OTHER';

export type OnboardingStatus =
  | 'account_created'
  | 'kyc_pending'
  | 'verify_pending'
  | 'complete';

export interface UserProfile {
  uid: string;
  email: string | null;
  createdAt: FieldValue;
  onboardingStatus: OnboardingStatus;
  region: Region;
  kyc: any; // To hold region-specific KYC data
  acceptedTermsAt?: FieldValue;
  acceptedPrivacyAt?: FieldValue;
  marketingOptIn?: boolean;
}
