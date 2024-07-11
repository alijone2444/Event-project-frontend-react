import React from 'react';
import { Typography, Button } from 'antd';
import './dashboard.css'
import { RightOutlined } from '@ant-design/icons';
import { Grid } from '@mui/material';
import { buttonConfig } from '../constants/dashboardConstants';
const Fourbuttons = (props) => {
  return (
    <Grid container spacing={1} style={{ padding: '5%' }}>
      {buttonConfig.map((button) => (
        <Grid key={button.key} item xs={12} md={4} lg={4}>
          <div className='buttonContainer' style={{ background: button.background }}>
            <Typography>
              <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '70%', textAlign: 'center' }}>
                  <Typography className='buttons-text' strong>
                    {button.title}
                  </Typography>
                  <Typography className='buttons-text'>{button.sub}</Typography>
                </div>
                <div style={{ width: '30%', padding: '5%', display: 'flex', alignItems: 'center' }}>
                  {button.icon}
                </div>
              </div>
              <Button
                size='large'
                type='link'
                className='buttons-text'
                style={{ display: 'flex', justifyContent: 'space-between', padding: 0, width: '100%' }}
                onClick={() => button.onClick(props)}
              >
                <div>{button.title}</div>
                <div><RightOutlined style={{ color: 'white' }} /></div>
              </Button>
            </Typography>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};
export default Fourbuttons;
