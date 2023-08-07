import React from 'react';
import { Bar } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import { Chart as ChartJS } from 'chart.js/auto';

export const BarChart = ({ data }) => {
  const chartData = {
    labels: ['2016', '2017', '2018', '2019', '2020'],
    datasets: [
      {
        label: 'Users Gained',
        data: [100, 200, 300, 400, 500],
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Customize the color as needed
      },
    ],
  };

  ChartJS.register(CategoryScale);

  return (
    <div className="chart-container">
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};
