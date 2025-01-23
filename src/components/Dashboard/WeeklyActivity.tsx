import React from 'react';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin: 24px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ChartTitle = styled.h2`
  font-size: 18px;
  color: #2C2C54;
`;

const LegendX = styled.div`
  display: flex;
  gap: 16px;
  color: #718EBF;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LegendDot = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const WeeklyActivity: React.FC = () => {
  const data = {
    labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Deposit',
        data: [200, 100, 250, 350, 200, 200, 300],
        backgroundColor: '#396AFF',
        borderRadius: 8,
        barThickness: 15,
      },
      {
        label: 'Withdraw',
        data: [400, 300, 300, 450, 150, 400, 350],
        backgroundColor: '#232323',
        borderRadius: 8,
        barThickness: 15,
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
        displayColors: false,
        callbacks: {
          title: () => '',
          label: (context: any) => `${context.dataset.label}: $${context.raw}`,
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
          callback: (value: number) => `${value}`,
          stepSize: 100,
        },
      },
    },
  };

  return (
    <ChartContainer>
      <ChartHeader>
        <ChartTitle>Weekly Activity</ChartTitle>
        <LegendX>
          <LegendItem>
            <LegendDot color="#396AFF" />
            <span>Deposit</span>
          </LegendItem>
          <LegendItem>
            <LegendDot color="#232323" />
            <span>Withdraw</span>
          </LegendItem>
        </LegendX>
      </ChartHeader>
      <div style={{ height: '300px' }}>
        <Bar data={data} options={options} />
      </div>
    </ChartContainer>
  );
};

export default WeeklyActivity; 