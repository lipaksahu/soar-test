import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../Dashboard/Header';
import Sidebar from '../Sidebar';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    position: relative;
    display: block;
  }
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
`;

const HamburgerButton = styled.button`
  display: none;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  @media (max-width: 768px) {
    display: block;
  }

  div {
    width: 25px;
    height: 3px;
    background-color: #333;
    margin: 5px 0;
    transition: 0.4s;
  }
`;

const SidebarWrapper = styled.div<{ isOpen: boolean }>`
  @media (max-width: 768px) {
    position: fixed;
    left: ${({ isOpen }) => (isOpen ? '0' : '-250px')};
    top: 0;
    height: 100vh;
    transition: left 0.3s ease-in-out;
    z-index: 999;
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <LayoutContainer>
      <HamburgerButton onClick={toggleSidebar}>
        <div></div>
        <div></div>
        <div></div>
      </HamburgerButton>
      <SidebarWrapper isOpen={isSidebarOpen}>
        <Sidebar />
      </SidebarWrapper>
      <MainContent>
        <Header />
        {children}
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout; 