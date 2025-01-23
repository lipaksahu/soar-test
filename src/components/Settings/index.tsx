import React, { useState } from 'react';
import styled from 'styled-components';
import { useApp } from '../../context/AppContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileSchema, ProfileFormData } from './validationSchema';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorContainer } from '../common/ErrorMessage';

interface TabProps {
  isActive?: boolean;
}

const SettingsContainer = styled.div`
  padding: 24px;
  margin: 0 30px 20px;
  background: #fff;
  border-radius: 20px;
  flex: 1;

  @media (max-width: 1024px) {
    padding: 20px;
    margin: 0 20px 20px;
  }

  @media (max-width: 768px) {
    padding: 16px;
    margin: 0 16px 16px;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 32px;
  border-bottom: 2px solid #E2E8F0;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    gap: 24px;
    margin-bottom: 28px;
  }

  @media (max-width: 768px) {
    gap: 16px;
    margin-bottom: 24px;
    overflow-x: auto;
    padding-bottom: 8px;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Tab = styled.button<TabProps>`
  padding: 12px 0;
  background: none;
  border: none;
  font-size: 16px;
  color: ${props => props.isActive ? '#2C2C54' : '#A3AED0'};
  cursor: pointer;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #2C2C54;
    display: ${props => props.isActive ? 'block' : 'none'};
  }

  @media (max-width: 1024px) {
    padding: 10px 0;
  }

  @media (max-width: 768px) {
    padding: 8px 0;
    white-space: nowrap;
  }
`;

const FormContainer = styled.form`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  max-width: 1200px;
  
  @media (max-width: 1024px) {
    gap: 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 15px;

  @media (max-width: 1024px) {
    margin-bottom: 12px;
  }
`;

const Label = styled.label`
  font-size: 14px;
  color: #2C2C54;
`;

const ErrorMessage = styled.span`
  color: #FF0000;
  font-size: 12px;
  margin-top: 4px;
`;

const Input = styled.input<{ hasError?: boolean }>`
  padding: 12px;
  border: 1px solid ${props => props.hasError ? '#FF0000' : '#E2E8F0'};
  border-radius: 8px;
  font-size: 14px;

  @media (max-width: 1024px) {
    padding: 10px;
  }

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#FF0000' : '#4318FF'};
  }
`;

const ProfileImageContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin-bottom: 24px;

  @media (max-width: 1024px) {
    width: 90px;
    height: 90px;
    margin-bottom: 22px;
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    margin: 0 auto 20px;
  }
`;

const FormMainContainer = styled.div`
  width: 43%;

  @media (max-width: 1024px) {
    width: 48%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const EditIcon = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const SaveButton = styled.button`
  background: #232323;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 50px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 24px;
  width: fit-content;
  float: right;
  &:hover {
    background: #1a1a32;
  }

  @media (max-width: 1024px) {
    padding: 10px 40px;
    margin-top: 20px;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 16px;
    float: none;
    padding: 12px;
  }
`;

const Settings: React.FC = () => {
  const { state, dispatch } = useApp();
  const { user } = state;
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState('/Mask Group (3).png');
  
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      // Here you would typically upload the image to your server
      // and update the user's profile with the new image URL
    }
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      yourName: user.name,
      userName: user.name,
      password: '',
      email: user.email,
      dateOfBirth: '25 January 1990',
      presentAddress: 'San Jose, California, USA',
      permanentAddress: 'San Jose, California, USA',
      city: 'San Jose',
      postalCode: '45962',
      country: 'USA',
    }
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await dispatch({
        type: 'UPDATE_USER',
        payload: {
          name: data.yourName,
          email: data.email
        }
      });
      
      alert('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <SettingsContainer>
      {error && <ErrorContainer>{error}</ErrorContainer>}
      <TabsContainer>
        <Tab 
          isActive={activeTab === 'profile'} 
          onClick={() => setActiveTab('profile')}
        >
          Edit Profile
        </Tab>
        <Tab 
          isActive={activeTab === 'preferences'} 
          onClick={() => setActiveTab('preferences')}
        >
          Preferences
        </Tab>
        <Tab 
          isActive={activeTab === 'security'} 
          onClick={() => setActiveTab('security')}
        >
          Security
        </Tab>
      </TabsContainer>

      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <ProfileImageContainer>
          <ProfileImage src={profileImage} alt="Profile" />
          <EditIcon onClick={handleEditClick}>
            <img src="/edit.png" width="20" height="20" alt="Edit Icon" />
          </EditIcon>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </ProfileImageContainer>
        <FormMainContainer>
          <FormGroup>
            <Label>Your Name</Label>
            <Input
              {...register('yourName')}
              hasError={!!errors.yourName}
            />
            {errors.yourName && (
              <ErrorMessage>{errors.yourName.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              {...register('email')}
              hasError={!!errors.email}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>Date of Birth</Label>
            <Input
              {...register('dateOfBirth')}
              hasError={!!errors.dateOfBirth}
            />
            {errors.dateOfBirth && (
              <ErrorMessage>{errors.dateOfBirth.message}</ErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <Label>Permanent Address</Label>
            <Input
              {...register('permanentAddress')}
              hasError={!!errors.permanentAddress}
            />
            {errors.permanentAddress && (
              <ErrorMessage>{errors.permanentAddress.message}</ErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <Label>Postal Code</Label>
            <Input
              {...register('postalCode')}
              hasError={!!errors.postalCode}
            />
            {errors.postalCode && (
              <ErrorMessage>{errors.postalCode.message}</ErrorMessage>
            )}
          </FormGroup>
        </FormMainContainer>
        <FormMainContainer>
          <FormGroup>
            <Label>User Name</Label>
            <Input
              {...register('userName')}
              hasError={!!errors.userName}
            />
            {errors.userName && (
              <ErrorMessage>{errors.userName.message}</ErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              {...register('password')}
              hasError={!!errors.password}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>Present Address</Label>
            <Input
              {...register('presentAddress')}
              hasError={!!errors.presentAddress}
            />
            {errors.presentAddress && (
              <ErrorMessage>{errors.presentAddress.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>City</Label>
            <Input
              {...register('city')}
              hasError={!!errors.city}
            />
            {errors.city && (
              <ErrorMessage>{errors.city.message}</ErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <Label>Country</Label>
            <Input
              {...register('country')}
              hasError={!!errors.country}
            />
            {errors.country && (
              <ErrorMessage>{errors.country.message}</ErrorMessage>
            )}
          </FormGroup>
          <SaveButton type="submit">Save</SaveButton>
        </FormMainContainer>
      </FormContainer>
    </SettingsContainer>
  );
};

export default Settings; 