import React from 'react';
import { Grid, Button } from '@mui/material';
import { Card } from 'antd';
import { Typography} from '@mui/material';
const EventCard = () => {
  return (
    <Grid container spacing={1} style={{padding:"2%"}}>
      <Grid item xs={12} sm={6} md={4} >
        <div style={{border:"1px solid lightgrey",borderRadius:"2%"}}> 
            <img
                src="https://placekitten.com/300/200" // Replace with your image URL
                alt="Event"
                style={{ width: '100%', height: '50%', objectFit: 'cover', clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)'}}
            /> 
          <div style={{padding:"5%"}}>
            <Typography variant='h5' component='h2' style={{marginBottom:"2%"}}>Event Title</Typography>
              <div style={{marginBottom:"5%"}}>Event Data - Event data goes here. You can customize this based on your requirements.</div>
            <Button type="primary" style={{width:'100%',background:"DodgerBlue",color:"white"}}>Visit</Button>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default EventCard;
