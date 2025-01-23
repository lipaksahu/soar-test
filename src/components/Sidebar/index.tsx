import styled from 'styled-components';
import { IconType } from './types';
import { 
  HomeIcon, 
  TransactionIcon, 
  AccountIcon,
  InvestmentIcon,
  CreditCardIcon,
  LoanIcon,
  ServiceIcon,
  PrivilegeIcon,
  SettingIcon 
} from './Icons';
import { useNavigate, useLocation } from 'react-router-dom';

interface MenuItem {
  id: number;
  title: string;
  icon: IconType;
  path: string;
  isActive?: boolean;
}

const SidebarContainer = styled.aside`
  width: 250px;
  background: white;
  min-height: 100vh;
  padding: 24px 0;
  border-right: 1px solid #E2E8F0;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 24px;
  margin-bottom: 40px;
`;

const LogoText = styled.h1`
  font-size: 20px;
  color: #2C2C54;
  font-weight: 600;
`;

const MenuList = styled.nav`
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${props => props.isActive ? '#232323' : '#B1B1B1'};
  background: ${props => props.isActive ? '#F4F7FE' : 'transparent'};
  border-left: ${props => props.isActive ? '5px solid #232323' : 'transparent'};
  &:hover {
    background: ${props => !props.isActive && '#F8F9FA'};
    color: #2C2C54;
  }
`;

const MenuText = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems: MenuItem[] = [
    { id: 1, title: 'Dashboard', icon: HomeIcon, path: '/' },
    { id: 2, title: 'Transactions', icon: TransactionIcon, path: '/transactions' },
    { id: 3, title: 'Accounts', icon: AccountIcon, path: '/accounts' },
    { id: 4, title: 'Investments', icon: InvestmentIcon, path: '/investments' },
    { id: 5, title: 'Credit Cards', icon: CreditCardIcon, path: '/credit-cards' },
    { id: 6, title: 'Loans', icon: LoanIcon, path: '/loans' },
    { id: 7, title: 'Services', icon: ServiceIcon, path: '/services' },
    { id: 8, title: 'My Privileges', icon: PrivilegeIcon, path: '/privileges' },
    { id: 9, title: 'Setting', icon: SettingIcon, path: '/settings' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <SidebarContainer>
      <Logo>
        <img src="/logo.png" width="20" height="20" alt="Transaction" />
        <LogoText>Soar Task</LogoText>
      </Logo>
      
      <MenuList>
        {menuItems.map(item => (
          <MenuItem 
            key={item.id} 
            isActive={location.pathname === item.path}
            onClick={() => handleNavigation(item.path)}
          >
            <item.icon />
            <MenuText>{item.title}</MenuText>
          </MenuItem>
        ))}
      </MenuList>
    </SidebarContainer>
  );
};

export default Sidebar; 