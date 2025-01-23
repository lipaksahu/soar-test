import React from 'react';
import styled from 'styled-components';
import { useApp } from '../../context/AppContext';
import { useLocation } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 19px 40px;
  margin-bottom: 24px;
  background-color: #ffffff;
  @media (max-width: 480px) {
    padding-bottom: 100px;
    padding-right: 20px;
    padding-top: 23px;
    justify-content: center;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  color: #343C6A;
  font-weight: 600;
  @media (max-width: 480px) {
    text-align: center;
    font-size: 20px;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;

const SearchBar = styled.div`
  position: relative;
  width: 255px;
  @media (max-width: 480px) {
    display: none;
  }
`;

const SearchBarMobile = styled.div`
  position: absolute;
  width: 255px;
  display: none;
  top: 80px; 
  width: 320px;
  background: #fff;
  @media (max-width: 480px) {
    display: block;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 15px 20px;
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
  @media (max-width: 768px) {
    display: none;
  }
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  @media (max-width: 480px) {
    position: absolute;
    right: 20px;
    top: 20px;
  }
`;

const Header: React.FC = () => {
  const { state } = useApp();
  const { user } = state;
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case '/settings':
        return 'Settings';
      case '/':
      default:
        return 'Overview';
    }
  };

  return (
    <HeaderContainer>
      <Title>{getTitle()}</Title>
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
      <SearchBarMobile>
        <SearchIcon>
         <img src="/search.png" width="20" height="20" alt="Search Icon" />
        </SearchIcon>
        <SearchInput 
            type="text" 
            placeholder="Search for something"
        />
    </SearchBarMobile>
    </HeaderContainer>
  );
};

export default Header; 