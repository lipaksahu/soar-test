import React from 'react';
import styled from 'styled-components';
import Header from '../Dashboard/Header';
import Sidebar from '../Sidebar';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>
        <Header />
        {children}
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout; 