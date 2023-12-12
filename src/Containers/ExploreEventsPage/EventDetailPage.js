import React from 'react';
import imagePath from '../../images/EventDetails_background_eddited.jpg';
import Navbar from '../Home/StudentHome/navbar/navbar';
import LoginCarousel from '../../Components/LoginCrousel/loginCrousel';
import { ClassNames } from '@emotion/react';
import Grid from '@mui/material/Grid';
import { useMediaQuery } from "@mui/material";
import EventDetail from '../../Components/exploreEvents/eventDetail';
import { useState } from 'react';
import { Typography } from 'antd';
import Link from '@mui/material/Link';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import WrapperComponent from '../../FooterAndHeaderwrapper';
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
        const [ShowDescription,setShowDescription] = useState(false)
        const isSmallScreen = useMediaQuery('(max-width:768px)');
        const [Desc_text,setDesc_text] = useState('')
        const [showMore , setshowMore] = useState(false)
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
      
      const handleSeeLess=()=>{
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        setshowMore(!showMore)
        setShowDescription(false)
      }
  return (
    <WrapperComponent>
    <div style={{ position: 'relative',padding:'5%'}}>
      <div
        style={backgroundImage}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Grid container >
          <Grid item xs={12} md={6} >
            <LoginCarousel images={images}/>
          </Grid>
            <Grid item xs={12} md={6} style={{padding:'5%',paddingTop:0}}>
          <EventDetail callback_seemore={(text)=>{setShowDescription(true);setDesc_text(text);}} showmore={showMore}/>
          </Grid>
        </Grid>
        <Grid container spacing={2} pt={5} pb={5}>
          {ShowDescription && 
          <Grid item xs={12} md={12} >
              <Typography mt={2}>
                {Desc_text}
              </Typography>
              <Link onClick={handleSeeLess} component="button" underline='none' variant="body2" width={'100%'}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' ,alignItems:'center',paddingTop:'1%'}}>
                 show less
                  <ExpandLessIcon style={{ color: 'Dodgerblue', paddingTop: '2px' }} />
                </div>
              </Link>

            </Grid>}
        </Grid>
      </div>
    </div>
    </WrapperComponent>
  );
}

export default EventDetailPage;
