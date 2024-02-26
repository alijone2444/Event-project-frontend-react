import React, { useState } from 'react';
import { Grid} from '@mui/material';
import { Typography } from '@mui/material';
import './gridview.css';
import { Spin } from 'antd';
import { Button, Space} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

const EventCard = (props) => {
  
  return (
    <Grid container spacing={3} style={{ padding: '2%' }}>
      {props.eventData.map((event) => (
        <Grid key={event._id} item xs={12} sm={6} md={4} >
       
          <div style={{ border: '1px solid lightgrey', borderRadius: '2%' }}>
            <div style={{ padding: '5%' }}>
              <img
                className="event-image"
                style={{height:'150px',}}
                src={`data:image/jpeg;base64,${event.mainImageData}`}
                alt="Event"
              />
              
            </div>
            <div style={{ padding: '5%', paddingTop: 0 }}>
              <Typography variant="h5" component="h2" style={{ marginBottom: '2%' }} className='hover-3 trucate-title'>
                {event.eventName}
              </Typography>
              {/* Assuming you want to display event description */}
              <div style={{ marginBottom: '5%' }} className='event-description-truncate'>{event.description}</div>
              
              <div style={{display:'flex',flexDirection:'row'}}> 
                <Button type="primary" style={{ width: '100%', background: 'DodgerBlue', color: 'white' }} onClick={() => {props.openEvent(event._id)}}>
                  Visit
                </Button>
              {props.showEditDelete &&  
                <Space style={{paddingLeft:'2%'}}>editEvent
                     <Button icon={<EditOutlined />} onClick={()=>{props.editEvent(event._id)}}/>
                     {props.showLoading ? <Spin/> :<Button icon={<DeleteOutlined />} danger onClick={()=>{props.handleDeleteEvent(event._id)}} />}
                </Space>}
              </div>
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default EventCard;