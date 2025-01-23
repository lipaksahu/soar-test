import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorContainer } from '../common/ErrorMessage';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';

import MyCards from './MyCards';
import WeeklyActivity from './WeeklyActivity';
import RecentTransactions from './RecentTransactions';
import ExpenseStatistics from './ExpenseStatistics';
import QuickTransfer from './QuickTransfer';
import BalanceHistory from './BalanceHistory';

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  padding: 0 40px 30px;

  @media (max-width: 1024px) { // iPad Pro and smaller
    grid-template-columns: 1fr;
    padding: 0 24px 20px;
  }

  @media (max-width: 768px) { // iPad Mini and smaller
    gap: 20px;
    padding: 0 16px 16px;
  }

  @media (max-width: 480px) { // Mobile
    gap: 16px;
    display: block;
    padding: 0 12px 12px;
  }
`;

const DashboardGridBottom = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;
  padding: 0 40px 30px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    padding: 0 24px 20px;
  }

  @media (max-width: 768px) {
    gap: 20px;
    padding: 0 16px 16px;
  }

  @media (max-width: 480px) {
    gap: 16px;
    display: block;
    padding: 0 12px 12px;
  }
`;

const Title2 = styled.h2`
  color: #343C6A;
  font-weight: 600;
  font-size: 22px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

const MyCardsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 480px) {
    button {
      font-size: 14px;
    }
  }
`;

const DashboardContent = styled.div`
  flex: 1;
  padding: 0 0 24px;

  @media (max-width: 768px) {
    padding: 0 0 16px;
    display: block;
  }
`;

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { dispatch } = useApp();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [cards, transactions] = await Promise.all([
          api.getCards(),
          api.getTransactions()
        ]);

        dispatch({ type: 'UPDATE_CARDS', payload: cards });
        // Update transactions in state...

      } catch (err) {
        setError('Failed to load dashboard data. Please refresh the page.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [dispatch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  return (
    <DashboardContent>
      <DashboardGrid>
        <div>
          <MyCardsHeader>
            <Title2>
                My Cards
            </Title2>
            <button style={{ color: '#343C6A', fontSize: 17 }} onClick={() => alert("See all cards")}>See All</button>
          </MyCardsHeader>
          <MyCards />
          <Title2>
            Weekly Activity
          </Title2>
          <WeeklyActivity />
        </div>
        <div>
          <Title2>
            Recent Transaction
          </Title2>
          <RecentTransactions />
          <Title2>
            Expense Statistics
          </Title2>
          <ExpenseStatistics />
        </div>
      </DashboardGrid>
      <DashboardGridBottom>
        <div>
            <Title2>
              Quick Transfer
            </Title2>
            <QuickTransfer />
        </div>
        <div>
            <Title2>
              Balance History
            </Title2>
            <BalanceHistory />
        </div>
      </DashboardGridBottom>
    </DashboardContent>
  );
};

export default Dashboard; 