import React, { useState } from 'react';
import styled from 'styled-components';
import { useApp } from '../../context/AppContext';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorContainer } from '../common/ErrorMessage';

const TransferContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 45px 25px;
  flex: 1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    @media (max-width: 480px) {
    margin: 0 0 15px 0;
  }
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
    opacity: 0.9;
  `}
`;

const ContactImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 5px;
`;

const ContactName = styled.span<{ isSelected: boolean | null }>`
  font-size: 16px;
  color: #232323;
  text-align: center;
  font-weight: ${props => (props.isSelected ? 'bold' : 'normal')};
  line-height: 1;
`;

const ContactRole = styled.span<{ isSelected: boolean | null }>`
  font-size: 15px;
  color: #718EBF;
  text-align: center;
  font-weight: ${props => (props.isSelected ? 'bold' : 'normal')};
  line-height: 1;
`;

const TransferForm = styled.form`
  display: flex;
  gap: 16px;
  position: relative;
  justify-content: space-between;
  align-items: center;
`;

const AmountLabel= styled.div`
   font-size: 16px;
   color: #718EBF;
   text-wrap: nowrap;
`;

const AmountInput = styled.input`
  width: 100%;
  padding: 16px;
  border: 1px solid #E2E8F0;
  border-radius: 30px;
  font-size: 14px;
  color: #718EBF;
  background: #EDF1F7;
  &:focus {
    outline: none;
    border-color: #4318FF;
  }
`;

const SendButton = styled.button`
  background: #232323;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 14px 35px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: absolute;
  right: 0;
  &:hover {
    background: #1a1a32;
  }
`;

const IconButton = styled.button`
  background-color: #fff;
  border: none;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px #E7E4E8;
  margin: 30px 0 0 55px;
  &:hover {
    background-color: #F4F7FE;
  }
  @media (max-width: 480px) {
    margin: 20px 0 0 10px;
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
      {error && <ErrorContainer>{error}</ErrorContainer>}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <ContactsScroll aria-label="Contact list for quick transfer">
            {contacts.map(contact => (
              <ContactCard
                key={contact.id}
                isSelected={selectedContact === contact.id}
                onClick={() => setSelectedContact(contact.id)}
                aria-label={`Select ${contact.name}, ${contact.role}`}
                role="button"
                aria-pressed={selectedContact === contact.id}
              >
                <ContactImage src={contact.image} alt={`${contact.name}'s profile`} />
                <ContactName isSelected={selectedContact === contact.id}>{contact.name}</ContactName>
                <ContactRole isSelected={selectedContact === contact.id}>{contact.role}</ContactRole>
              </ContactCard>
            ))}
            <IconButton aria-label="Scroll contacts right">
                <img src="/right_arrow.svg" alt="Scroll right" />
            </IconButton>
          </ContactsScroll>
          <TransferForm onSubmit={handleTransfer} aria-label="Money transfer form">
            <AmountLabel>
                Write Amount
            </AmountLabel>
            <AmountInput
              type="text"
              placeholder="525.50"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              aria-label="Transfer amount"
            />
            <SendButton 
              type="submit" 
              disabled={!selectedContact || !amount}
              aria-label="Send transfer"
            >
              Send  <img src={'/send.png'} alt="Send icon" />
            </SendButton>
          </TransferForm>
        </>
      )}
    </TransferContainer>
  );
};

export default QuickTransfer; 