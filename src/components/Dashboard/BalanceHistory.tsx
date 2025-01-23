import React from 'react';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

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

const BalanceHistory: React.FC = () => {
  const data = {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
    datasets: [
      {
        fill: true,
        label: 'Balance',
        data: [200, 400, 600, 400, 500, 300, 500],
        borderColor: '#4318FF',
        backgroundColor: 'rgba(67, 24, 255, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#2C2C54',
        bodyColor: '#2C2C54',
        borderColor: '#E2E8F0',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context: any) => `Balance: $${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#A3AED0',
        },
      },
      y: {
        grid: {
          color: '#E2E8F0',
          drawBorder: false,
        },
        ticks: {
          color: '#A3AED0',
          callback: (value: number) => `$${value}`,
          stepSize: 200,
        },
      },
    },
  };

  return (
    <ChartContainer>
      <ChartHeader>Balance History</ChartHeader>
      <div style={{ height: '300px' }}>
        <Line data={data} options={options} />
      </div>
    </ChartContainer>
  );
};

export default BalanceHistory; 