import React from 'react';
import { Grid, Button } from '@mui/material';
import { Card } from 'antd';
import { Typography } from '@mui/material';
import './gridview.css'
const EventCard = () => {
  const eventData = [
    {
      id: 1,
      eventName: 'Event 1',
      eventData: 'Event data goes here. You can customize this based on your requirements.',
    },
    {
      id: 2,
      eventName: 'Event 2',
      eventData: 'Event data goes here. You can customize this based on your requirements.',
    },
    // Add more event data here
  ];

  return (
    <Grid container spacing={3} style={{ padding: '2%' }}>
      {eventData.map((event) => (
        <Grid key={event.id} item xs={12} sm={6} md={4}>
          <div style={{ border: '1px solid lightgrey', borderRadius: '2%' }}>
            <div style={{padding:"5%"}}>
              <img
              className="event-image "
                src="https://placekitten.com/300/200" // Replace with your image URL
                alt="Event"
              />
            </div>
            <div style={{ padding: '5%',paddingTop:0 }}>
              <Typography variant="h5" component="h2" style={{ marginBottom: '2%' }} className='hover-3'>
                {event.eventName}
              </Typography>
              <div style={{ marginBottom: '5%' }}>{event.eventData}</div>
              <Button type="primary" style={{ width: '100%', background: 'DodgerBlue', color: 'white' }}>
                Visit
              </Button>
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default EventCard;
