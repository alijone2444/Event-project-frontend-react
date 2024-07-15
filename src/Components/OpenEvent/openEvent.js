import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import LoginCarousel from '../../Components/LoginCrousel/loginCrousel';
import EventDetail from '../../Components/exploreEvents/eventDetail';
import { Typography, Button, useMediaQuery } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useNavigate } from 'react-router-dom';
import constants from '../../Constants/constants';
import { makeStyles } from '@mui/styles';
import CommentSection from '../comments/commentsSectionComponent';
const useStyles = makeStyles((theme) => ({
  container: {
    scrollbarWidth: 'thin',  // For Firefox
    '&::-webkit-scrollbar': {
      width: '8px',
    },
  },
}));

const OpenEvent = (props) => {
  const classes = useStyles();
  const ismobile = useMediaQuery('(max-width:600px)')
  const [ShowDescription, setShowDescription] = useState(false);
  const [Desc_text, setDesc_text] = useState('');
  const [showMore, setshowMore] = useState(false);
  const navigate = useNavigate();

  const handleSeeLess = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setshowMore(!showMore);
    setShowDescription(false);
  };

  const images = props.eventData.imageFileNames.map((event) => ({
    src: `${constants.BASE_URL}images/${event}`,
    // legend: `Event ${props.eventData.tags}`, 
  }));

  const mainImage = [{ src: `${constants.BASE_URL}images/${props.eventData.dpimageFileName}` }];

  return (
    <div>
      {/* Add your styling or background image here if needed */}
      <Grid container >
        <Grid item xs={12} md={6} style={{ height: !ismobile && '80vh' }}>
          <LoginCarousel mainImage={mainImage} images={images} />
        </Grid>
        <Grid item xs={12} md={6} style={{ padding: '5%', paddingTop: 0, height: !ismobile && '80vh', overflowY: 'auto' }} className={classes.container} >
          <EventDetail
            eventData={props.eventData}
            callback_seemore={(text) => {
              setShowDescription(true);
              setDesc_text(text);
            }}
            showmore={showMore}
          />
        </Grid>
        {ShowDescription && (
          <Grid item xs={12} md={12} style={{ marginTop: '5%', marginBottom: '5%' }}>
            <Typography style={{ color: 'white', filter: 'blur(0px)' }} mt={2}>{Desc_text}{props.eventData.tags[0].split(',').map((item, index) => (
              <Typography variant="body1" key={index} style={{ fontWeight: 'bold', color: 'dodgerBlue' }}>
                #{item}
              </Typography>
            ))}</Typography>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Button
                onClick={handleSeeLess}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'Dodgerblue',
                  width: 'auto',
                }}
              >
                Show less
                <ExpandLessIcon style={{ color: 'Dodgerblue', paddingTop: '2px' }} />
              </Button>
            </div>

          </Grid>
        )}
        <CommentSection eventName={props.eventData.eventName} />

      </Grid>
    </div>
  );
};

export default OpenEvent;
