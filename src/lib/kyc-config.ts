
import { Region } from './types';
import { countries } from './countries';

// In a real app, you would generate Zod schemas from this config
// and use them in the form resolver for validation.

const countryOptions = countries.map(c => ({ value: c, label: c }));

export const kycFieldConfig: Record<Region, any> = {
  EU: {
    sections: [
      { 
        id: 'identity', 
        title: '1. Identity', 
        description: 'Your legal identification details.',
        fields: [
          { name: 'identity.firstNames', label: 'First Name(s)', type: 'text', required: true, fullWidth: true },
          { name: 'identity.middleNames', label: 'Middle Name(s)', type: 'text' },
          { name: 'identity.surname', label: 'Surname', type: 'text', required: true },
          { name: 'identity.previousNames', label: 'Previous Name(s)', type: 'text' },
          { name: 'identity.preferredName', label: 'Preferred Name', type: 'text' },
          { name: 'identity.dateOfBirth', label: 'Date of Birth', type: 'date', required: true },
          { name: 'identity.placeOfBirthCity', label: 'City of Birth', type: 'text', required: true },
          { name: 'identity.placeOfBirthCountry', label: 'Country of Birth', type: 'select', options: countryOptions, required: true },
          { name: 'identity.sexAtBirth', label: 'Sex at Birth', type: 'select', required: true, options: [{value: 'male', label: 'Male'}, {value: 'female', label: 'Female'}, {value: 'intersex', label: 'Intersex'}, {value: 'prefer_not_to_say', label: 'Prefer not to say'}]},
          { name: 'identity.genderIdentity', label: 'Gender Identity', type: 'select', required: true, options: [{value: 'man', label: 'Man'}, {value: 'woman', label: 'Woman'}, {value: 'nonbinary', label: 'Non-binary'}, {value: 'other', label: 'Other'}, {value: 'prefer_not_to_say', label: 'Prefer not to say'}]},
          { name: 'identity.preferredPronouns', label: 'Preferred Pronouns', type: 'text' },
        ]
      },
      { 
        id: 'contact', 
        title: '2. Contact Information', 
        description: 'How we can reach you.',
        fields: [
            { name: 'contact.residentialAddress.street', label: 'Street', type: 'text', required: true },
            { name: 'contact.residentialAddress.number', label: 'Number', type: 'text', required: true },
            { name: 'contact.residentialAddress.city', label: 'City', type: 'text', required: true },
            { name: 'contact.residentialAddress.postalCode', label: 'Postal Code', type: 'text', required: true },
            { name: 'contact.residentialAddress.regionState', label: 'Region/State', type: 'text', required: true },
            { name: 'contact.residentialAddress.country', label: 'Country', type: 'select', options: countryOptions, required: true },
            { name: 'contact.mailingSameAsResidential', label: 'Mailing Address', type: 'boolean', description: 'Mailing address is the same as residential', fullWidth: true },
            // Conditional fields for mailing address would be handled in the component logic
            { name: 'contact.mobilePhone', label: 'Mobile Phone', type: 'text', required: true },
            { name: 'contact.homePhone', label: 'Home Phone', type: 'text' },
            { name: 'contact.email', label: 'Email', type: 'email', required: true },
            { name: 'contact.preferredContactMethod', label: 'Preferred Contact Method', type: 'radio', required: true, options: [{value: 'phone', label: 'Phone'}, {value: 'sms', label: 'SMS'}, {value: 'email', label: 'Email'}, {value: 'post', label: 'Post'}]},
        ]
      },
      { 
        id: 'insurance', 
        title: '3. Health Insurance', 
        description: 'Your insurance coverage details.',
        fields: [
            { name: 'insurance.nationalPersonalIdNumber', label: 'National Personal ID Number', type: 'text'},
            { name: 'insurance.healthInsuranceProvider', label: 'Health Insurance Provider', type: 'text', required: true },
            { name: 'insurance.insurancePolicyNumber', label: 'Insurance Policy Number', type: 'text', required: true },
            { name: 'insurance.insuredPersonName', label: 'Insured Person\'s Name (if not you)', type: 'text' },
            { name: 'insurance.insuredRelationshipToPatient', label: 'Relationship to Patient', type: 'text' },
            { name: 'insurance.treatingFacilityRecordId', label: 'Treating Facility Record ID', type: 'text' },
        ]
      },
      { 
        id: 'demographics', 
        title: '4. Demographics (Voluntary)', 
        description: 'This information helps us provide better care.',
        fields: [
            { name: 'demographics.countryOfCitizenship', label: 'Country of Citizenship', type: 'select', options: countryOptions },
            { name: 'demographics.countryOfResidence', label: 'Country of Residence', type: 'select', options: countryOptions },
            { name: 'demographics.primaryLanguage', label: 'Primary Language', type: 'text' },
            { name: 'demographics.otherLanguages', label: 'Other Languages (comma-separated)', type: 'text' },
            { name: 'demographics.interpreterNeeded', label: 'Interpreter Needed', type: 'boolean', description: 'Do you require an interpreter for your appointments?' },
            { name: 'demographics.ethnicCulturalBackground', label: 'Ethnic/Cultural Background', type: 'text' },
            { name: 'demographics.religionBelief', label: 'Religion/Belief', type: 'select', options: ['None', 'Christian', 'Muslim', 'Jewish', 'Hindu', 'Buddhist', 'Other', 'Prefer not to say'].map(o => ({value: o.toLowerCase(), label: o}))},
            { name: 'demographics.occupation', label: 'Occupation', type: 'text' },
            { name: 'demographics.employer', label: 'Employer', type: 'text' },
            { name: 'demographics.employmentStatus', label: 'Employment Status', type: 'select', options: ['Employed', 'Self-employed', 'Student', 'Unemployed', 'Retired', 'Homemaker', 'Other'].map(o => ({value: o.toLowerCase(), label: o}))},
        ]
      },
      { 
        id: 'emergencyContact', 
        title: '5. Emergency Contact', 
        description: 'Who to contact in an emergency.',
        fields: [
            { name: 'emergencyContact.name', label: 'Full Name', type: 'text', required: true },
            { name: 'emergencyContact.relationship', label: 'Relationship', type: 'text', required: true },
            { name: 'emergencyContact.primaryPhone', label: 'Primary Phone', type: 'text', required: true },
            { name: 'emergencyContact.secondaryPhone', label: 'Secondary Phone', type: 'text' },
            { name: 'emergencyContact.address', label: 'Address', type: 'textarea', fullWidth: true },
        ]
      },
      { 
        id: 'gdprConsent', 
        title: '6. GDPR Consent', 
        description: 'Your data privacy and communication preferences. Please review our Privacy Notice before proceeding.',
        fields: [
            { name: 'gdprConsent.coreAccepted', label: 'Core Data Processing', type: 'boolean', description: 'I consent to the processing of my personal and health data for the purpose of receiving clinical services.', required: true, fullWidth: true },
            { name: 'gdprConsent.appointmentSms', label: 'SMS Reminders', type: 'boolean', description: 'I consent to receive appointment reminders via SMS.', fullWidth: true },
            { name: 'gdprConsent.appointmentEmail', label: 'Email Reminders', type: 'boolean', description: 'I consent to receive appointment reminders via email.', fullWidth: true },
            { name: 'gdprConsent.nonClinicalInfo', label: 'Non-Clinical Info', type: 'boolean', description: 'I consent to receive non-clinical information and updates from Medpass.', fullWidth: true },
            { name: 'gdprConsent.researchConsent', label: 'Research', type: 'boolean', description: 'I consent to my anonymized data being used for medical research purposes.', fullWidth: true },
        ]
      },
    ]
  },
  KE: {
    sections: [
        { 
            id: 'principalMember', 
            title: '1. Principal Member Details', 
            description: 'Your primary identification information.',
            fields: [
                { name: 'principalMember.surname', label: 'Surname', type: 'text', required: true },
                { name: 'principalMember.otherNames', label: 'Other Names', type: 'text', required: true },
                { name: 'principalMember.nationalIdOrPassportOrAlienId', label: 'National ID / Passport / Alien ID', type: 'text', required: true },
                { name: 'principalMember.dateOfBirth', label: 'Date of Birth', type: 'date', required: true },
                { name: 'principalMember.gender', label: 'Gender', type: 'radio', required: true, options: [{value: 'male', label: 'Male'}, {value: 'female', label: 'Female'}] },
                { name: 'principalMember.maritalStatus', label: 'Marital Status', type: 'select', required: true, options: ['Single', 'Married', 'Divorced', 'Widowed'].map(o => ({value: o.toLowerCase(), label: o})) },
                { name: 'principalMember.mobilePhone', label: 'Mobile Phone', type: 'text', required: true },
            ]
        },
        { 
            id: 'address', 
            title: '2. Address', 
            description: 'Your physical and postal address.',
            fields: [
                { name: 'address.residentialPlotStreet', label: 'Residential Plot/Street', type: 'text', required: true },
                { name: 'address.residentialEstateArea', label: 'Residential Estate/Area', type: 'text', required: true },
                { name: 'address.townCity', label: 'Town/City', type: 'text', required: true },
                { name: 'address.county', label: 'County', type: 'text', required: true },
                { name: 'address.postalAddress', label: 'Postal Address (if different)', type: 'text' },
            ]
        },
        { 
            id: 'nhif', 
            title: '3. NHIF Information', 
            description: 'Your National Hospital Insurance Fund details.',
            fields: [
                { name: 'nhif.nhifNumber', label: 'NHIF Number (if known)', type: 'text' },
                { name: 'nhif.employerName', label: 'Employer Name (if employed)', type: 'text' },
                { name: 'nhif.memberCategory', label: 'Member Category', type: 'select', required: true, options: ['Employed', 'Self-employed', 'Voluntary', 'Indigent'].map(o => ({value: o.toLowerCase(), label: o}))},
            ]
        },
        { 
            id: 'nextOfKin', 
            title: '4. Next of Kin', 
            description: 'Your emergency contact person.',
            fields: [
                { name: 'nextOfKin.fullName', label: 'Full Name', type: 'text', required: true },
                { name: 'nextOfKin.relationship', label: 'Relationship', type: 'select', required: true, options: ['Spouse', 'Parent', 'Child', 'Sibling', 'Other'].map(o => ({value: o.toLowerCase(), label: o})) },
                { name: 'nextOfKin.idNumber', label: 'ID Number', type: 'text' },
                { name: 'nextOfKin.phoneNumber', label: 'Phone Number', type: 'text', required: true },
                { name: 'nextOfKin.address', label: 'Address', type: 'textarea', fullWidth: true },
            ]
        },
        { 
            id: 'insurancePayment', 
            title: '5. Insurance & Payment', 
            description: 'How you will cover your medical expenses.',
            fields: [
                { name: 'insurancePayment.paymentType', label: 'Payment Type', type: 'select', required: true, options: ['Cash', 'NHIF', 'Private Insurance', 'SHA'].map(o => ({value: o.toLowerCase().replace('_', ''), label: o})) },
                { name: 'insurancePayment.nhifMembershipNumber', label: 'NHIF Membership Number', type: 'text' },
                { name: 'insurancePayment.privateInsuranceName', label: 'Private Insurance Name', type: 'text' },
                { name: 'insurancePayment.sponsorName', label: 'Sponsor Name (if dependent)', type: 'text' },
                { name: 'insurancePayment.sponsorIdNumber', label: 'Sponsor ID Number', type: 'text' },
                { name: 'insurancePayment.preferredOutpatientFacilityCode', label: 'Preferred Outpatient Facility Code', type: 'text', required: true },
                { name: 'insurancePayment.preferredOutpatientFacilityName', label: 'Preferred Outpatient Facility Name', type: 'text', required: true },
            ]
        },
        { 
            id: 'declaration', 
            title: '6. Declaration', 
            description: 'Please confirm the accuracy of your information.',
            fields: [
                { name: 'declaration.informationTrueConfirmed', label: 'Declaration', type: 'boolean', description: 'I confirm that the information provided is true and correct.', required: true, fullWidth: true },
                { name: 'declaration.dataProtectionNoticeAcknowledged', label: 'Data Protection', type: 'boolean', description: 'I acknowledge the data protection notice.', fullWidth: true },
            ]
        },
    ]
  },
  NG: {
    sections: [
        {
            id: 'personal',
            title: '1. Personal Information',
            description: 'Your basic identification details.',
            fields: [
                { name: 'personal.title', label: 'Title', type: 'select', required: true, options: ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Chief', 'Other'].map(o => ({value: o.toLowerCase(), label: o})) },
                { name: 'personal.surname', label: 'Surname', type: 'text', required: true },
                { name: 'personal.firstName', label: 'First Name', type: 'text', required: true },
                { name: 'personal.otherNames', label: 'Other Names', type: 'text' },
                { name: 'personal.dateOfBirth', label: 'Date of Birth', type: 'date', required: true },
                { name: 'personal.sex', label: 'Sex', type: 'radio', required: true, options: [{value: 'male', label: 'Male'}, {value: 'female', label: 'Female'}] },
                { name: 'personal.maritalStatus', label: 'Marital Status', type: 'select', required: true, options: ['Single', 'Married', 'Divorced', 'Widowed'].map(o => ({value: o.toLowerCase(), label: o})) },
                { name: 'personal.nationality', label: 'Nationality', type: 'select', required: true, options: countryOptions },
                { name: 'personal.stateOfOrigin', label: 'State of Origin', type: 'text', required: true },
                { name: 'personal.lgaOfOrigin', label: 'LGA of Origin', type: 'text', required: true },
                { name: 'personal.tribeEthnicGroup', label: 'Tribe/Ethnic Group', type: 'text' },
                { name: 'personal.religion', label: 'Religion', type: 'select', options: ['Christian', 'Muslim', 'Traditional', 'Other'].map(o => ({value: o.toLowerCase(), label: o})) },
                { name: 'personal.occupation', label: 'Occupation', type: 'text', required: true },
            ]
        },
        {
            id: 'ids',
            title: '2. Identification Numbers',
            description: 'Your official identification numbers.',
            fields: [
                { name: 'ids.nhisNumber', label: 'NHIS Number', type: 'text' },
                { name: 'ids.nationalIdNin', label: 'National ID (NIN)', type: 'text', required: true },
                { name: 'ids.bvn', label: 'BVN (Bank Verification Number)', type: 'text' },
            ]
        },
        {
            id: 'contact',
            title: '3. Contact Details',
            description: 'Where you live and how to reach you.',
            fields: [
                { name: 'contact.residentialHouseNumberStreet', label: 'Residential House No. & Street', type: 'text', required: true },
                { name: 'contact.residentialAreaStreet', label: 'Residential Area/Street', type: 'text', required: true },
                { name: 'contact.townCity', label: 'Town/City', type: 'text', required: true },
                { name: 'contact.lga', label: 'LGA', type: 'text', required: true },
                { name: 'contact.state', label: 'State', type: 'text', required: true },
                { name: 'contact.mobilePhone', label: 'Mobile Phone', type: 'text', required: true },
                { name: 'contact.alternatePhone', label: 'Alternate Phone', type: 'text' },
                { name: 'contact.email', label: 'Email Address', type: 'email' },
            ]
        },
        {
            id: 'emergencyContact',
            title: '4. Emergency Contact',
            description: 'Who to contact in an emergency.',
            fields: [
                { name: 'emergencyContact.fullName', label: 'Full Name', type: 'text', required: true },
                { name: 'emergencyContact.relationship', label: 'Relationship', type: 'select', required: true, options: ['Spouse', 'Parent', 'Child', 'Sibling', 'Other'].map(o => ({value: o.toLowerCase(), label: o})) },
                { name: 'emergencyContact.phoneNumber', label: 'Phone Number', type: 'text', required: true },
                { name: 'emergencyContact.address', label: 'Address', type: 'textarea', fullWidth: true },
            ]
        },
        {
            id: 'insurancePayment',
            title: '5. Insurance & Payment',
            description: 'Your health insurance and payment details.',
            fields: [
                { name: 'insurancePayment.paymentType', label: 'Payment Type', type: 'select', required: true, options: ['Cash', 'NHIS', 'HMO', 'Private Insurance'].map(o => ({value: o.toLowerCase().replace(/ /g, '_'), label: o})) },
                { name: 'insurancePayment.nhisOrHmoName', label: 'NHIS/HMO Name', type: 'text' },
                { name: 'insurancePayment.membershipNumber', label: 'Membership Number', type: 'text' },
                { name: 'insurancePayment.sponsorName', label: 'Sponsor Name (if dependent)', type: 'text' },
                { name: 'insurancePayment.sponsorRelationshipToPatient', label: 'Sponsor\'s Relationship to Patient', type: 'text' },
            ]
        },
        {
            id: 'privacyConsent',
            title: '6. Privacy Consent',
            description: 'Your consent for data processing under NDPR.',
            fields: [
                { name: 'privacyConsent.coreAccepted', label: 'Privacy Consent', type: 'boolean', description: 'I consent to the collection and processing of my personal data as described in the Privacy Policy.', required: true, fullWidth: true },
                { name: 'privacyConsent.smsReminders', label: 'SMS Reminders', type: 'boolean', description: 'I consent to receive SMS reminders for appointments and other services.', fullWidth: true },
            ]
        },
    ]
  },
  OTHER: {
    sections: [
        { 
            id: 'basicInfo', 
            title: '1. Basic Information', 
            description: 'Please provide your basic contact details.',
            fields: [
                { name: 'fullName', label: 'Full Name', type: 'text', required: true },
                { name: 'email', label: 'Email Address', type: 'email', required: true },
                { name: 'countryOfResidence', label: 'Country of Residence', type: 'select', required: true, options: countryOptions },
            ]
        },
        { 
            id: 'consent', 
            title: '2. Consent', 
            description: 'Please provide your consent.',
            fields: [
                { name: 'consent.termsAccepted', label: 'Terms of Service', type: 'boolean', description: 'I have read and agree to the Terms of Service.', required: true, fullWidth: true },
                { name: 'consent.privacyAccepted', label: 'Privacy Policy', type: 'boolean', description: 'I have read and agree to the Privacy Policy.', required: true, fullWidth: true },
            ]
        },
    ]
  },
};
