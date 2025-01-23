import * as yup from 'yup';

export const profileSchema = yup.object({
  yourName: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  
  userName: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  
  email: yup
    .string()
    .required('Email is required')
    .email('Must be a valid email'),
  
  dateOfBirth: yup
    .string()
    .required('Date of birth is required')
    .matches(
      /^(0[1-9]|[12][0-9]|3[01]) (January|February|March|April|May|June|July|August|September|October|November|December) \d{4}$/,
      'Date must be in format: DD Month YYYY'
    ),
  
  presentAddress: yup
    .string()
    .required('Present address is required'),
  
  permanentAddress: yup
    .string()
    .required('Permanent address is required'),
  
  city: yup
    .string()
    .required('City is required'),
  
  postalCode: yup
    .string()
    .required('Postal code is required')
    .matches(/^\d{5}$/, 'Postal code must be 5 digits'),
  
  country: yup
    .string()
    .required('Country is required')
});

export type ProfileFormData = yup.InferType<typeof profileSchema>; 