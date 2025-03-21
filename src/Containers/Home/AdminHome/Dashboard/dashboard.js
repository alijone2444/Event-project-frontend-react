import React, { useState } from 'react';
import { DashboardData, activities } from '../constants/dashboardConstants';
import { Layout, Card, Button, List } from 'antd';
import welcomeImg from '../../../../images/dashboard_welcome.png'
import './dashboard.css'
import { DashboardOutlined, ClockCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import getRandomColor from './randomBulletcolor';
import ProgressTrackerCard from './progressValue';
import Fourbuttons from './fourbutton';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import BarChart from './charts/bargraph';
import calculateTimeAgo from '../../../../Components/functions/timeElapsedFinder';
import { UserOutlined, BellOutlined } from '@ant-design/icons';
import SocietyAdminConstantsForm from '../../../../Components/societyAdminConstantForm/societyAdminConstantForm';
const { Header, Content } = Layout;
const Dashboard = (props) => {
  const currentDate = new Date().toLocaleDateString();
  const handleFourButtons = (BtnType) => {
    if (BtnType === 'request') {
      props.GoTo('request')
    }
    else if (BtnType === 'crousel-images-component') {
      props.GoTo('crousel-images-component')
    }
    else if (BtnType === 'Active-users') {
      props.GoTo('Active-users')
    }
  }
  let temp = ''
  const tempFuc = () => {
    const val = getRandomColor()
    temp = val
    return val
  }
  return (

    <Grid container>
      <Grid item xs={12} md={12} lg={12} style={{
        position: 'sticky',
        top: 0,
        zIndex: '2',
      }}>
        <Header
          style={{
            background: 'DodgerBlue',
            color: "white",
            padding: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Grid item xs={8} md={8} lg={8}>
            <div style={{ fontSize: '20px', marginLeft: '24px', paddingRight: "2px", }}>Dashboard<span style={{ paddingLeft: "5px" }}><DashboardOutlined /></span></div>
          </Grid>
          <Grid item xs={4} md={4} lg={4}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", paddingRight: "5%" }}><CalendarOutlined />{currentDate}</div>
          </Grid>
        </Header>
      </Grid>
      <Grid container style={{ padding: "5%", paddingBottom: 0, display: "flex", alignItems: "center", paddingTop: "2%" }}>
        <Grid item xs={12} md={9} lg={9}>
          <Typography variant="h5" component="h2" gutterBottom>
            {DashboardData.title}
          </Typography>
          {DashboardData.content}
        </Grid>
        <Grid item xs={12} md={3} lg={3} style={{ display: "flex", justifyContent: "center" }}>
          <img src={welcomeImg} alt='.' className='welcomeimg' />
        </Grid>
      </Grid>
      <Grid container >
        <Grid item xs={12} md={12} lg={12}>
          <SocietyAdminConstantsForm />
        </Grid>
      </Grid>
      <Grid container spacing={1} style={{ padding: "5%" }}>
        <Grid item xs={12} md={6} lg={6}>
          <Card title="Recent Activity" bordered >
            <List
              dataSource={props.Activities}
              style={{ overflowY: "auto", maxHeight: "350px", }}
              renderItem={(item) => (
                <List.Item>
                  <div style={{ display: 'flex', flexDirection: 'row', width: "100%", color: tempFuc() }} >
                    <div style={{ flex: 1 }}>
                      <div style={{ color: 'black' }}>
                        <ClockCircleOutlined style={{ paddingRight: '2%' }} />
                        {calculateTimeAgo(item.timestamp)}
                      </div>
                      <span># <b style={{}}>{item.activityType}</b></span><span style={{ color: 'black' }}> by {item.username}.</span>

                    </div>
                    <div style={{ width: '10%', display: 'flex', alignItems: 'center' }}>
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          backgroundColor: temp, // Use random color
                        }}
                      />
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <ProgressTrackerCard stats={props.totalsize} usersData={props.usersData} />
        </Grid>
      </Grid>
      <Fourbuttons fourbuttonPressed={(BtnType) => { handleFourButtons(BtnType) }} />
      <Grid container spacing={1} style={{ padding: "5%", display: 'flex', justifyContent: "center" }}>
        <Grid item xs={12} md={10} lg={10} >
          <BarChart />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
