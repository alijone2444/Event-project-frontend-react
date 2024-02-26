import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import LoginCarousel from '../../Components/LoginCrousel/loginCrousel';
import EventDetail from '../../Components/exploreEvents/eventDetail';
import { Typography, Link } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useMediaQuery } from "@mui/material";
import { Button } from 'antd';
import image1 from '../../images/test1.jpg'
import image2 from '../../images/test2.jpg'
import image3 from '../../images/test3.jpg'
const OpenEvent = (props) => {
  const [ShowDescription, setShowDescription] = useState(false);
  const [Desc_text, setDesc_text] = useState('');
  const [showMore, setshowMore] = useState(false);

  const handleSeeLess = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setshowMore(!showMore);
    setShowDescription(false);
  };
  
  const images = props.eventData.additionalImagesData.map((event) => ({
    src: `data:image/jpeg;base64,${event.imageData}`,
    // legend: `Event ${props.eventData.tags}`, 
  }));
  
  const mainImage = [{src:`data:image/jpeg;base64,${props.eventData.mainImageData}`}]
  

  return (
    <div>
      {/* Add your styling or background image here if needed */}
      <Grid container>
        <Grid item xs={12} md={6}>
          <LoginCarousel mainImage={mainImage} images={images} />
        </Grid>
        <Grid item xs={12} md={6} style={{ padding: '5%', paddingTop: 0 }}>
          <EventDetail
            eventData={props.eventData}
            callback_seemore={(text) => {
              setShowDescription(true);
              setDesc_text(text);
            }}
            showmore={showMore}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} pt={5} pb={5}>
        {ShowDescription && (
          <Grid item xs={12} md={12}>
            <Typography style={{color:'white',filter:'blur(0px)'}} mt={2}>{Desc_text}</Typography>
            <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
            <Button
              onClick={handleSeeLess}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'Dodgerblue',
                width:'auto'
              }}
            >
              Show less
              <ExpandLessIcon style={{ color: 'Dodgerblue', paddingTop: '2px' }} />
            </Button>
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default OpenEvent;
