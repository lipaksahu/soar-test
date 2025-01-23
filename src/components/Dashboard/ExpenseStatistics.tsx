import React from 'react';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const ExpenseStatistics: React.FC = () => {
  const data = {
    labels: ['Entertainment', 'Others', 'Investment', 'Bill Expense'],
    datasets: [
      {
        data: [30, 15, 20, 35],
        backgroundColor: [
          '#343C6A',
          '#FC7900',
          '#396AFF',
          '#232323',
        ],
        borderWidth: 0,
        offset: [80, 25, 25, 25],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          color: '#2C2C54',
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        display: true,
        color: '#fff',
        formatter: (value: number) => `${value}%\n${data.labels[data.datasets[0].data.indexOf(value)]}`,
        font: {
          size: 12,
        },
        anchor: 'center' as const,
        align: 'center' as const,
      },
    },
  } as const;

  return (
    <ChartContainer>
      <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
        <Pie 
          data={data} 
          options={options} 
          plugins={[ChartDataLabels]}
        />
      </div>
    </ChartContainer>
  );
};

export default ExpenseStatistics; 