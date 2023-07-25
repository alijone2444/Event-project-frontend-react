import React from 'react';
import {DashboardData,activities} from '../constants/dashboardConstants';
import { Layout, Card, Button,List,Typography } from 'antd';
import welcomeImg from '../../../images/dashboard_welcome.png'
import './dashboard.css'
import { DashboardOutlined,ClockCircleOutlined,CalendarOutlined } from '@ant-design/icons';
import getRandomColor from './randomBulletcolor';
import ProgressTrackerCard from './progressValue';
import Fourbuttons from './fourbutton';
const { Header, Content } = Layout;
const Dashboard = () => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <Layout style={{ marginLeft: 'auto', height: '100vh' }}>
      <Header
        style={{
            
          background: 'blue',
          color:"white",
          padding: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: '20px', marginLeft: '24px' ,paddingRight:"2px"}}>Dashboard<span style={{paddingLeft:"5px"}}><DashboardOutlined/></span></div>
        <div style={{ marginRight: '24px' }}><span style={{paddingRight:"5px"}}><CalendarOutlined/></span>{currentDate}</div>
      </Header>
      <Content style={{ padding: '24px', display: 'grid', gridGap: '24px' }}>
      <Card bordered>
            <div style={{ display: "flex" }}>
                <div>
                <h1 className='heading-h1'>{DashboardData.title}</h1>
                {DashboardData.content}
                </div>
                <img src={welcomeImg} alt='.' className='welcomeimg' />
            </div>
        </Card>
        <div style={{ display: 'grid', gridGap: '24px', gridTemplateColumns: '1fr 1fr' }}>
        <Card title="Recent Activity" bordered >
            <List
                dataSource={activities}
                style={{overflowY:"auto",maxHeight:"350px",}}
                renderItem={(item) => (
                <List.Item>
                    <div className='list-item-container'>
                    <span style={{ paddingRight: '2%' }}>
                        <ClockCircleOutlined style={{ marginLeft: 8 }} />
                        {item.daysAgo}
                    </span>
                    <div
                        style={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        backgroundColor: getRandomColor(), // Use random color
                        marginLeft: 'auto',
                        marginRight: 8,
                        }}
                    />
                    <span style={{ flex: '1' }}>{item.description}</span>
                    </div>
                </List.Item>
                )}
            />
            </Card>
            <ProgressTrackerCard/>
        </div>
        <Fourbuttons/>
        <div style={{ display: 'grid', gridGap: '24px', gridTemplateColumns: '1fr 1fr' }}>
          {/* Placeholder for the Bar Graph */}
          <div style={{ backgroundColor: '#f0f0f0', height: '300px' }}>
            Placeholder for Bar Graph
          </div>
          {/* Placeholder for the Line Chart */}
          <div style={{ backgroundColor: '#f0f0f0', height: '300px' }}>
            Placeholder for Line Chart
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Dashboard;
