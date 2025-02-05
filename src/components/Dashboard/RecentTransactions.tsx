import React from 'react';
import styled from 'styled-components';
import { useApp } from '../../context/AppContext';

const TransactionsContainer = styled.div`
  height: 235px;
  overflow-y: scroll;
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TransactionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TransactionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconWrapper = styled.div<{ type: string }>`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => 
    props.type === 'card' ? '#FFF5D9' :
    props.type === 'paypal' ? '#E7EDFF' : '#DCFAF8'};
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-weight: 500;
  color: #2C2C54;
`;

const Date = styled.span`
  font-size: 12px;
  color: #A3AED0;
`;

const Amount = styled.span<{ isPositive: boolean }>`
  color: ${props => props.isPositive ? '#05CD99' : '#FF0000'};
  font-weight: 500;
`;

const RecentTransactions: React.FC = () => {
  const { state } = useApp();
  const { transactions } = state;

  return (
    <TransactionsContainer aria-label="Recent transactions">
      <TransactionList role="list">
        {transactions.map(transaction => (
          <TransactionItem 
            key={transaction.id} 
            role="listitem"
            aria-label={`${transaction.name} transaction of ${transaction.amount} on ${transaction.date}`}
          >
            <TransactionInfo>
              <IconWrapper 
                type={transaction.type}
                aria-label={`Payment method: ${transaction.type}`}
              >
                {transaction.type === 'card' && <img src="/cards.png" alt="Credit card payment" />}
                {transaction.type === 'paypal' && <img src="/paypal.png" alt="PayPal payment" />}
                {transaction.type === 'transfer' && <img src="/currency.png" alt="Bank transfer" />}
              </IconWrapper>
              <Details>
                <Name>{transaction.name}</Name>
                <Date aria-label={`Transaction date: ${transaction.date}`}>{transaction.date}</Date>
              </Details>
            </TransactionInfo>
            <Amount 
              isPositive={transaction.isPositive}
              aria-label={`Amount: ${transaction.amount}`}
            >
              {transaction.amount}
            </Amount>
          </TransactionItem>
        ))}
      </TransactionList>
    </TransactionsContainer>
  );
};

export default RecentTransactions; 