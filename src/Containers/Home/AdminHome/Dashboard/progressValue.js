import React from 'react';
import { Card, Progress } from 'antd';
import getRandomColor from './randomBulletcolor';

const ProgressTrackerCard = () => {
  const progressValue = 60; // Change this value to set the progress (0-100)

  return (
    <Card title="Progress Tracker" bordered>
      <div style={{ textAlign: 'left' }}>
      <div>Account Setup</div>
        <Progress percent={progressValue} strokeColor={getRandomColor()}/>
       <div>Customer Database</div>
        <Progress percent={progressValue} strokeColor={getRandomColor()}/>
      </div>
    </Card>
  );
};

export default ProgressTrackerCard;
