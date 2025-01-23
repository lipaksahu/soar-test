import React from 'react';
import styled from 'styled-components';
import { useApp } from '../../context/AppContext';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  margin-bottom: 24px;
  background-color: #ffffff;
`;

const Title = styled.h1`
  font-size: 28px;
  color: #343C6A;
  font-weight: 600;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const SearchBar = styled.div`
  position: relative;
  width: 255px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 20px;
  padding-left: 55px;
  border-radius: 30px;
  border: none;
  background-color: #F5F7FA;
  font-size: 15px;
  
  &::placeholder {
    color: #A3AED0;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 21px;
  top: 57%;
  transform: translateY(-50%);
  color: #8BA3CB;
`;

const IconButton = styled.button`
  background-color: #F5F7FA;
  border: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #F4F7FE;
  }
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const Header: React.FC = () => {
  const { state } = useApp();
  const { user } = state;

  return (
    <HeaderContainer>
      <Title>Overview</Title>
      <RightSection>
        <SearchBar>
          <SearchIcon>
            <img src="/search.png" width="20" height="20" alt="Search Icon" />
          </SearchIcon>
          <SearchInput 
            type="text" 
            placeholder="Search for something"
          />
        </SearchBar>
        <IconButton>
            <img src="/settings.png" width="20" height="20" alt="Settings Icon" />
        </IconButton>
        <IconButton>
            <img src="/notification.png" width="20" height="20" alt="Notification Icon" />
        </IconButton>
        <ProfileImage 
          src={'/Mask Group (3).png'} 
          alt={user.name}
        />
      </RightSection>
    </HeaderContainer>
  );
};

export default Header; 