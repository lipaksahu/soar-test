import React, { useState } from 'react';
import styled from 'styled-components';
import { useApp } from '../../context/AppContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileSchema, ProfileFormData } from './validationSchema';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorContainer } from '../../components/common/ErrorMessage';

interface TabProps {
  isActive?: boolean;
}

const SettingsContainer = styled.div`
  padding: 24px;
  flex: 1;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #2C2C54;
  margin-bottom: 24px;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 32px;
  border-bottom: 1px solid #E2E8F0;
  margin-bottom: 32px;
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
`;

const FormContainer = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  max-width: 1200px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #2C2C54;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const SaveButton = styled.button`
  background: #2C2C54;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 24px;
  width: fit-content;
  
  &:hover {
    background: #1a1a32;
  }
`;

const Settings: React.FC = () => {
  const { state, dispatch } = useApp();
  const { user } = state;
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      yourName: user.name,
      userName: user.name,
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
      <Title>Setting</Title>
      
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
          <ProfileImage src={user.avatar} alt="Profile" />
          <EditIcon>✏️</EditIcon>
        </ProfileImageContainer>

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
          <Label>Postal Code</Label>
          <Input
            {...register('postalCode')}
            hasError={!!errors.postalCode}
          />
          {errors.postalCode && (
            <ErrorMessage>{errors.postalCode.message}</ErrorMessage>
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
      </FormContainer>
    </SettingsContainer>
  );
};

export default Settings; 