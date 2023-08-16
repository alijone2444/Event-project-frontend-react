import React from 'react';
import './marquee.css'; // Make sure to create this CSS file and add the provided styles
import { Typography } from '@mui/material';
import AnnouncementIcon from '@mui/icons-material/Announcement';
function ScrollingText() {
  return (
    <div className="marquee">
      <marquee><Typography variant='h6' className='banner'>
        Welcome to IST HUB . Join us in creating unforgettable experiences
        <AnnouncementIcon/>
      </Typography>
      </marquee>
    </div>
  );
}

export default ScrollingText;