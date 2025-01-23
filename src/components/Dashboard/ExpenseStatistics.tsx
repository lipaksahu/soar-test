import React from 'react';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin: 24px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const ChartHeader = styled.h2`
  font-size: 18px;
  color: #2C2C54;
  margin-bottom: 20px;
`;

const ExpenseStatistics: React.FC = () => {
  const data = {
    labels: ['Entertainment', 'Bill Expense', 'Investment', 'Others'],
    datasets: [
      {
        data: [30, 15, 20, 35],
        backgroundColor: [
          '#4318FF',
          '#FF8F6B',
          '#6AD2FF',
          '#2C2C54',
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          color: '#2C2C54',
        },
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#2C2C54',
        bodyColor: '#2C2C54',
        borderColor: '#E2E8F0',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context: any) => `${context.label}: ${context.raw}%`,
        },
      },
    },
  };

  return (
    <ChartContainer>
      <ChartHeader>Expense Statistics</ChartHeader>
      <div style={{ height: '300px', position: 'relative' }}>
        <Pie data={data} options={options} />
      </div>
    </ChartContainer>
  );
};

export default ExpenseStatistics; 