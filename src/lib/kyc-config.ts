import { Region } from './types';

// In a real app, you would generate Zod schemas from this config
// and use them in the form resolver for validation.

export const kycFieldConfig: Record<Region, any> = {
  EU: {
    sections: [
      { id: 'identity', title: '1. Identity', description: 'Your legal identification details.' },
      { id: 'contact', title: '2. Contact Information', description: 'How we can reach you.' },
      { id: 'insurance', title: '3. Health Insurance', description: 'Your insurance coverage details.' },
      { id: 'demographics', title: '4. Demographics (Voluntary)', description: 'This information helps us provide better care.' },
      { id: 'emergencyContact', title: '5. Emergency Contact', description: 'Who to contact in an emergency.' },
      { id: 'gdprConsent', title: '6. GDPR Consent', description: 'Your data privacy and communication preferences.' },
    ]
  },
  KE: {
    sections: [
        { id: 'principalMember', title: '1. Principal Member Details', description: 'Your primary identification information.' },
        { id: 'address', title: '2. Address', description: 'Your physical and postal address.' },
        { id: 'nhif', title: '3. NHIF Information', description: 'Your National Hospital Insurance Fund details.' },
        { id: 'nextOfKin', title: '4. Next of Kin', description: 'Your emergency contact person.' },
        { id: 'insurancePayment', title: '5. Insurance & Payment', description: 'How you will cover your medical expenses.' },
        { id: 'declaration', title: '6. Declaration', description: 'Please confirm the accuracy of your information.' },
    ]
  },
  NG: {
    sections: [
        { id: 'personal', title: '1. Personal Information', description: 'Your basic identification details.' },
        { id: 'ids', title: '2. Identification Numbers', description: 'Your official identification numbers.' },
        { id: 'contact', title: '3. Contact Details', description: 'Where you live and how to reach you.' },
        { id: 'emergencyContact', title: '4. Emergency Contact', description: 'Who to contact in an emergency.' },
        { id: 'insurancePayment', title: '5. Insurance & Payment', description: 'Your health insurance and payment details.' },
        { id: 'privacyConsent', title: '6. Privacy Consent', description: 'Your consent for data processing.' },
    ]
  },
  OTHER: {
    sections: [
        { id: 'basicInfo', title: '1. Basic Information', description: 'Please provide your basic contact details.' },
        { id: 'consent', title: '2. Consent', description: 'Please provide your consent.' },
    ]
  },
};
