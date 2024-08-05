import React from 'react';
import { Card, Progress } from 'antd';
import getRandomColor from './randomBulletcolor';

const ProgressTrackerCard = (props) => {
  const progressValue = 60;
  let percentage;
  percentage = (props.stats?.totalSize / 512000000) * 100
  const rounded = percentage.toFixed(2)
  const users = (props.usersData.activeUsers / props.usersData.NoOfUsers) * 100
  const roundedusers = users.toFixed(2)
  return (
    <Card title="Progress Tracker" bordered>
      <div style={{ textAlign: 'left' }}>
        <div>Active users out of total</div>
        <Progress percent={roundedusers} strokeColor={getRandomColor()} />
        <div> Database Storage</div>
        <Progress percent={rounded} strokeColor={getRandomColor()} />
      </div>
    </Card>
  );
};

export default ProgressTrackerCard;
