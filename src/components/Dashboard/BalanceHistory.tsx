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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const BalanceHistory: React.FC = () => {
  const data = {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
    datasets: [
      {
        fill: true,
        label: 'Balance',
        data: [120, 320, 250, 480, 750, 230, 580],
        borderColor: 'rgb(67, 97, 238)',
        backgroundColor: 'rgba(67, 97, 238, 0.1)',
        tension: 0.35,
        borderWidth: 2,
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
          font: {
            size: 12,
          },
        },
        border: {
          display: false,
        },
      },
      y: {
        min: 0,
        max: 800,
        grid: {
          color: 'rgba(226, 232, 240, 0.5)',
          drawBorder: false,
          borderDash: [5, 5],
        },
        ticks: {
          color: '#A3AED0',
          callback: function(tickValue: number | string) {
            return `${tickValue}`;
          },
          stepSize: 200,
          font: {
            size: 12,
          },
          padding: 10,
        },
        border: {
          display: false,
        },
      },
    },
  } as const;

  return (
    <ChartContainer>
      <div style={{ height: '225px' }}>
        <Line data={data} options={options} />
      </div>
    </ChartContainer>
  );
};

export default BalanceHistory; 