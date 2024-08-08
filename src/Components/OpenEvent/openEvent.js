import React, { useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import LoginCarousel from '../../Components/LoginCrousel/loginCrousel';
import EventDetail from '../../Components/exploreEvents/eventDetail';
import { Typography, Button, useMediaQuery } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useNavigate, useLocation } from 'react-router-dom';
import constants from '../../Constants/constants';
import { makeStyles } from '@mui/styles';
import CommentSection from '../comments/commentsSectionComponent';
import ShareComponent from '../shareComponent/shareEvent';
import LikeCommentShare from '../commentShareLike/commentShareLike';
import MapComponent from '../MapComponent.js/googleMaps';
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
  const commentsRef = useRef(null);
  const images = props.eventData.imageFileNames.map((event) => ({
    src: `${constants.BASE_URL}images/${event}`,
    // legend: `Event ${props.eventData.tags}`, 
  }));
  const [shareOpen, setShareOpen] = useState(false);


  const handleCloseShare = () => {
    setShareOpen(false);
  };

  const location = useLocation();
  const currentPath = location.pathname;
  const fullUrl = window.location.href;

  const mainImage = [{ src: `${constants.BASE_URL}images/${props.eventData.dpimageFileName}` }];

  return (
    <div>
      {/* Add your styling or background image here if needed */}
      <Grid container >
        <Grid item xs={12} md={6} style={{ height: !ismobile && '80vh' }}>
          <LoginCarousel mainImage={mainImage} images={images} />
          {ismobile && <LikeCommentShare isLiked={props.eventData.isLiked} id={props.eventData._id} commentsCalled={() => commentsRef.current.scrollIntoView({ behavior: 'smooth' })} showshare={() => setShareOpen(true)} />}

        </Grid>
        <Grid item xs={12} md={6} style={{ padding: '5%', paddingBottom: 0, paddingTop: 0, height: !ismobile && '80vh', overflowY: !ismobile && 'auto' }} className={classes.container} >

          <EventDetail
            eventData={props.eventData}
            commentsCalled={() => {
              commentsRef.current.scrollIntoView({ behavior: 'smooth' });
            }}
            showshare={() => setShareOpen(true)}
          />
        </Grid>

        <Grid item xs={12} md={12} style={{ marginTop: '5%' }}>
          <Typography style={{ color: 'white', filter: 'blur(0px)' }} mt={2}>{props.eventData.description}{props.eventData.tags[0].split(',').map((item, index) => (
            <Typography variant="body1" key={index} style={{ fontWeight: 'bold', color: 'dodgerBlue' }}>
              #{item}
            </Typography>
          ))}</Typography>
        </Grid>

      </Grid>

      <MapComponent locationName={props.eventData.location} />
      <ShareComponent
        open={shareOpen}
        handleClose={handleCloseShare}
        url={fullUrl}
        title={`Check out ${props.eventData.eventName}`}
      />
      <div ref={commentsRef}>
        <CommentSection eventName={props.eventData.eventName} />
      </div>
    </div>
  );
};

export default OpenEvent;
