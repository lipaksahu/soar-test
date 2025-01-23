import React from 'react';
import styled from 'styled-components';

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HomeIcon: React.FC = () => (
  <IconWrapper>
    <img src="/home.png" width="20" height="20" alt="Home" />
  </IconWrapper>
);

export const TransactionIcon: React.FC = () => (
  <IconWrapper>
    <img src="/transaction.png" width="20" height="20" alt="Transaction" />
  </IconWrapper>
);

export const AccountIcon: React.FC = () => (
  <IconWrapper>
    <img src="/account.png" width="20" height="20" alt="Account" />
  </IconWrapper>
);

export const InvestmentIcon: React.FC = () => (
  <IconWrapper>
    <img src="/investment.png" width="20" height="20" alt="Investment" />
  </IconWrapper>
);

export const CreditCardIcon: React.FC = () => (
  <IconWrapper>
    <img src="/credit-card.png" width="20" height="20" alt="Credit Card" />
  </IconWrapper>
);

export const LoanIcon: React.FC = () => (
  <IconWrapper>
    <img src="/loan.png" width="20" height="20" alt="Loan" />
  </IconWrapper>
);

export const ServiceIcon: React.FC = () => (
  <IconWrapper>
    <img src="/service.png" width="20" height="20" alt="Service" />
  </IconWrapper>
);

export const PrivilegeIcon: React.FC = () => (
  <IconWrapper>
    <img src="/privilege.png" width="20" height="20" alt="Privilege" />
  </IconWrapper>
);

export const SettingIcon: React.FC = () => (
  <IconWrapper>
    <img src="/setting.png" width="20" height="20" alt="Setting" />
  </IconWrapper>
); 