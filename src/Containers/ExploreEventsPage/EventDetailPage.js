import React from 'react';
import imagePath from '../../images/EventDetails_background_eddited.jpg';
import Navbar from '../Home/StudentHome/navbar/navbar';
import LoginCarousel from '../../Components/LoginCrousel/loginCrousel';
import { ClassNames } from '@emotion/react';
import Grid from '@mui/material/Grid';
import { useMediaQuery } from "@mui/material";
import EventDetail from '../../Components/exploreEvents/eventDetail';
function EventDetailPage() {
    const backgroundImage = {
        backgroundImage: `url('${imagePath}')`,
        backgroundSize: 'cover',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: -1, 
      } 
      
        const isSmallScreen = useMediaQuery('(max-width:768px)');
      const images = [
        {
          src: "test1.jpg",
          legend: "Login and enjoy",
        },
        {
          src: "test2.jpg",
          legend: "Explore  Events, Attendance, Finance, and More",
        },
        {
          src: "test3.jpg",
          legend: "Welcome to our Secure Dashboard App",
        },
      ];
  return (
    <div style={{ position: 'relative',padding:'5%'}}>
      <div
        style={backgroundImage}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Grid container  >
        <Grid item xs={12} md={6} style={{border:'2px solid red'}}>
                <LoginCarousel images={images}/>
        </Grid>
        <Grid item xs={12} md={6} style={{padding:'5%'}}>
        <EventDetail/>
        </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default EventDetailPage;
