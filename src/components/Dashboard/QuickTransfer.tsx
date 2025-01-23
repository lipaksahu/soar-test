import React, { useState } from 'react';
import styled from 'styled-components';
import { useApp } from '../../context/AppContext';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorContainer } from '../common/ErrorMessage';

interface Contact {
  id: number;
  name: string;
  role: string;
  image: string;
}

const TransferContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  flex: 1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
  font-size: 18px;
  color: #2C2C54;
  margin-bottom: 20px;
`;

const ContactsScroll = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  margin-bottom: 24px;
  padding-bottom: 8px;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #E2E8F0;
    border-radius: 4px;
  }
`;

const ContactCard = styled.div<{ isSelected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  min-width: 80px;
  
  ${props => props.isSelected && `
    opacity: 0.7;
  `}
`;

const ContactImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const ContactName = styled.span`
  font-size: 14px;
  color: #2C2C54;
  text-align: center;
`;

const ContactRole = styled.span`
  font-size: 12px;
  color: #A3AED0;
  text-align: center;
`;

const TransferForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AmountInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #4318FF;
  }
`;

const SendButton = styled.button`
  background: #2C2C54;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background: #1a1a32;
  }
`;

const QuickTransfer: React.FC = () => {
  const { state, dispatch } = useApp();
  const { contacts } = state;
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedContact && amount) {
      try {
        setIsLoading(true);
        setError(null);

        const selectedContactDetails = contacts.find(c => c.id === selectedContact);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        dispatch({
          type: 'ADD_TRANSACTION',
          payload: {
            id: Date.now(),
            type: 'transfer',
            name: selectedContactDetails?.name || '',
            date: new Date().toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }),
            amount: `+$${amount}`,
            isPositive: true
          }
        });

        setAmount('');
        setSelectedContact(null);
      } catch (err) {
        setError('Transfer failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <TransferContainer>
      <Title>Quick Transfer</Title>
      
      {error && <ErrorContainer>{error}</ErrorContainer>}
      
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <ContactsScroll>
            {contacts.map(contact => (
              <ContactCard
                key={contact.id}
                isSelected={selectedContact === contact.id}
                onClick={() => setSelectedContact(contact.id)}
              >
                <ContactImage src={contact.image} alt={contact.name} />
                <ContactName>{contact.name}</ContactName>
                <ContactRole>{contact.role}</ContactRole>
              </ContactCard>
            ))}
          </ContactsScroll>
          <TransferForm onSubmit={handleTransfer}>
            <AmountInput
              type="text"
              placeholder="Write Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <SendButton type="submit" disabled={!selectedContact || !amount}>
              Send <span>✈️</span>
            </SendButton>
          </TransferForm>
        </>
      )}
    </TransferContainer>
  );
};

export default QuickTransfer; 