import { FieldValue } from 'firebase/firestore';

export type UserRole = 'patient' | 'clinician' | 'admin';
export type OnboardingStatus = 'country_pending' | 'kyc_pending' | 'verify_pending' | 'complete';
export type KycStatus = 'pending' | 'complete';
export type Region = 'EU' | 'KE' | 'NG' | 'OTHER';

export interface UserProfile {
  uid: string;
  email: string | null;
  role: UserRole;
  createdAt: FieldValue;
  onboardingStatus: OnboardingStatus;
  region?: Region;
  kyc: {
    kycStatus: KycStatus;
    region?: Region;
    eu?: EUKyc;
    ke?: KenyaKyc;
    ng?: NigeriaKyc;
  };
  acceptedTermsAt?: FieldValue;
  acceptedPrivacyAt?: FieldValue;
  marketingOptIn?: boolean;
}

// EU KYC Interfaces
export interface EUKyc {
  identity: EuIdentity;
  contact: EuContact;
  insurance: EuInsurance;
  demographics?: EuDemographics;
  emergencyContact: EuEmergencyContact;
  gdprConsent: EuGdprConsent;
}

export interface EuIdentity {
  firstNames: string;
  middleNames?: string;
  surname: string;
  previousNames?: string;
  preferredName?: string;
  dateOfBirth: string;
  placeOfBirthCity: string;
  placeOfBirthCountry: string;
  sexAtBirth: 'male' | 'female' | 'intersex' | 'prefer_not_to_say';
  genderIdentity: 'man' | 'woman' | 'nonbinary' | 'other' | 'prefer_not_to_say';
  preferredPronouns?: string;
}

export interface EuContact {
  residentialAddress: Address;
  mailingSameAsResidential: boolean;
  mailingAddress?: Address;
  mobilePhone: string;
  homePhone?: string;
  email: string;
  preferredContactMethod: 'phone' | 'sms' | 'email' | 'post';
}

export interface Address {
  street: string;
  number: string;
  city: string;
  postalCode: string;
  regionState: string;
  country: string;
}

export interface EuInsurance {
  nationalPersonalIdNumber?: string;
  healthInsuranceProvider: string;
  insurancePolicyNumber: string;
  insuredPersonName?: string;
  insuredRelationshipToPatient?: string;
  treatingFacilityRecordId?: string;
}

export interface EuDemographics {
  countryOfCitizenship?: string;
  countryOfResidence?: string;
  primaryLanguage?: string;
  otherLanguages?: string[];
  interpreterNeeded?: boolean;
  ethnicCulturalBackground?: string;
  religionBelief?: 'none' | 'christian' | 'muslim' | 'jewish' | 'hindu' | 'buddhist' | 'other' | 'prefer_not_to_say';
  occupation?: string;
  employer?: string;
  employmentStatus?: 'employed' | 'self_employed' | 'student' | 'unemployed' | 'retired' | 'homemaker' | 'other';
}

export interface EuEmergencyContact {
  name: string;
  relationship: string;
  primaryPhone: string;
  secondaryPhone?: string;
  address?: string;
}

export interface EuGdprConsent {
  coreAccepted: boolean;
  appointmentSms: boolean;
  appointmentEmail: boolean;
  nonClinicalInfo: boolean;
  researchConsent: boolean;
  consentTimestamp: FieldValue;
}

// Kenya KYC Interfaces
export interface KenyaKyc {
  principalMember: KenyaPrincipalMember;
  address: KenyaAddress;
  nhif?: KenyaNhif;
  nextOfKin: KenyaNextOfKin;
  insurancePayment: KenyaInsurancePayment;
  declaration: KenyaDeclaration;
}

export interface KenyaPrincipalMember {
  surname: string;
  otherNames: string;
  nationalIdOrPassportOrAlienId: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  mobilePhone: string;
}

export interface KenyaAddress {
  residentialPlotStreet: string;
  residentialEstateArea: string;
  townCity: string;
  county: string;
  postalAddress?: string;
}

export interface KenyaNhif {
  nhifNumber?: string;
  employerName?: string;
  memberCategory: 'employed' | 'self_employed' | 'voluntary' | 'indigent';
}

export interface KenyaNextOfKin {
  fullName: string;
  relationship: 'spouse' | 'parent' | 'child' | 'sibling' | 'other';
  idNumber?: string;
  phoneNumber: string;
  address?: string;
}

export interface KenyaInsurancePayment {
  paymentType: 'cash' | 'nhif' | 'private_insurance' | 'sha';
  nhifMembershipNumber?: string;
  privateInsuranceName?: string;
  sponsorName?: string;
  sponsorIdNumber?: string;
  preferredOutpatientFacilityCode: string;
  preferredOutpatientFacilityName: string;
}

export interface KenyaDeclaration {
  informationTrueConfirmed: boolean;
  dataProtectionNoticeAcknowledged?: boolean;
  declarationTimestamp: FieldValue;
}

// Nigeria KYC Interfaces
export interface NigeriaKyc {
  personal: NigeriaPersonal;
  ids: NigeriaIds;
  contact: NigeriaContact;
  emergencyContact: NigeriaEmergencyContact;
  insurancePayment: NigeriaInsurancePayment;
  privacyConsent: NigeriaPrivacyConsent;
}

export interface NigeriaPersonal {
  title: 'mr' | 'mrs' | 'miss' | 'ms' | 'dr' | 'chief' | 'other';
  surname: string;
  firstName: string;
  otherNames?: string;
  dateOfBirth: string;
  ageYears?: number;
  sex: 'male' | 'female';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  nationality: string;
  stateOfOrigin: string;
  lgaOfOrigin: string;
  tribeEthnicGroup?: string;
  religion?: 'christian' | 'muslim' | 'traditional' | 'other';
  occupation: string;
}

export interface NigeriaIds {
  nhisNumber?: string;
  nationalIdNin: string;
  bvn?: string;
}

export interface NigeriaContact {
  residentialHouseNumberStreet: string;
  residentialAreaStreet: string;
  townCity: string;
  lga: string;
  state: string;
  mobilePhone: string;
  alternatePhone?: string;
  email?: string;
}

export interface NigeriaEmergencyContact {
  fullName: string;
  relationship: 'spouse' | 'parent' | 'child' | 'sibling' | 'other';
  phoneNumber: string;
  address?: string;
}

export interface NigeriaInsurancePayment {
  paymentType: 'cash' | 'nhis' | 'hmo' | 'private_insurance';
  nhisOrHmoName?: string;
  membershipNumber?: string;
  sponsorName?: string;
  sponsorRelationshipToPatient?: string;
}

export interface NigeriaPrivacyConsent {
  coreAccepted: boolean;
  smsReminders: boolean;
  consentTimestamp: FieldValue;
}
