import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import { Chart as ChartJS } from 'chart.js/auto';
import Skeleton from 'react-loading-skeleton'; // Skeleton loader component
import createAuthenticatedRequest from '../../../../../RequestwithHeader';
import constants from '../../../../../Constants/constants';

const BarChart = () => {
  const requestInstance = createAuthenticatedRequest();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  ChartJS.register(CategoryScale);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        const response = await requestInstance.get(`${constants.BASE_URL}barchart-data`);
        if (response.data) {
          setData(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
  }, []);

  // Prepare data for the BarChart component
  const chartData = {
    labels: data.map(item => {
      const [year, month] = item.month.split('-');
      return `${month}/${year}`;
    }),
    datasets: [
      {
        label: 'Users Registered',
        data: data.map(item => item.count),
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Customize the color as needed
      },
    ],
  };

  return (
    <div>
      <h2>User Registration Statistics</h2>
      {loading ? (
        <div className="loading-container">
          {/* Display skeleton loaders while data is being fetched */}
          <Skeleton count={6} height={40} />
          <Skeleton count={6} height={40} style={{ marginTop: '10px' }} />
        </div>
      ) : (
        <div className="chart-container">
          <Bar
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Users Gained Monthly"
                },
                legend: {
                  display: false
                }
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default BarChart;
