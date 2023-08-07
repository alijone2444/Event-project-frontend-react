import React from 'react';
import { Line } from 'react-chartjs-2';

const LineGraph = ({ none }) => {
    const data = [10, 20, 15, 30, 25, 40]
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Line Graph Data',
        data: data,
        borderColor: 'rgba(75, 192, 192, 1)', // Customize the line color as needed
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Customize the area under the line
        pointRadius: 4, // Customize the point size
        pointHoverRadius: 6, // Customize the point hover size
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Line Graph',
      },
      legend: {
        display: true,
        position: 'bottom',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineGraph;
