import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Lottie from 'react-lottie';
import HeardBubbling from '../../lottie/heartBubbling.json';
import { Button } from 'antd';

const EventDetail = (props) => {
  const classes = useStyles();
  const [halfDescription, showhalfDescription] = useState(true);
  const desc_text = props.eventData.description;
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleSeeMore = () => {
    window.scrollTo({
      top: window.scrollY + window.innerHeight * 0.5,
      behavior: 'smooth',
    });
    showhalfDescription(false);
    props.callback_seemore(desc_text);
  };

  useEffect(() => {
    showhalfDescription(true);
  }, [props.showmore]);

  return (
    <Grid container spacing={2} style={{ borderRadius: '2%', height: '100%', }}>
      {/* Title */}
      <Grid item xs={12}>
        <Typography variant="h4" mb={0} className={classes.title} gutterBottom>
          {props.eventData.eventName}
        </Typography>
      </Grid>

      {/* Subheader */}
      <Grid item xs={12}>
        <Typography variant="h6" className={classes.subheader}>
          {props.eventData.subheader}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" className={classes.field}>
          <strong>Organizer:</strong> {props.eventData.organizer}
        </Typography>
      </Grid>

      {/* Other fields */}
      <Grid item xs={12}>
        <Typography variant="body1" className={classes.field}>
          <strong>Location:</strong> {props.eventData.location}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body1" className={classes.field}>
          <strong>Start Date:</strong> {new Date(props.eventData.startDate).toLocaleDateString()}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" className={classes.field}>
          <strong>End Date:</strong> {new Date(props.eventData.endDate).toLocaleDateString()}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" className={classes.field}>
          <strong>Registration Deadline:</strong> {new Date(props.eventData.registrationDeadline).toLocaleDateString()}
        </Typography>
      </Grid>
      <Grid item xs={12} style={{ position: 'relative' }}>
        <Typography variant="body1" className={classes.field}>
          <strong>Likes:</strong> {props.eventData.NoOfLikes}
        </Typography>
        {props.eventData.NoOfLikes > 0 && (
          <div style={{ position: 'absolute', top: -80, left: 10 }}>
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: HeardBubbling,
              }}
              height={150}
              width={150}
            />
          </div>
        )}
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body1" className={classes.field}>
          <strong>Registration status:</strong> {props.eventData.registrationOpen ? 'opened' : 'Not opened yet'}
        </Typography>
      </Grid>
      {/* Description */}
      {halfDescription && (
        <Grid item xs={12}>
          {isSmallScreen ? (
            <Typography variant="body1" style={{ color: 'white', filter: 'blur(0px)' }}>
              {desc_text} {props.eventData.tags[0].split(',').map((item, index) => (
                <Typography variant="body1" key={index} style={{ fontWeight: 'bold', color: 'dodgerBlue' }}>
                  #{item}
                </Typography>
              ))}

            </Typography>
          ) : (
            <>
              <Typography variant="body1" className={classes.description} p={2}>
                <div style={{ position: 'absolute', padding: '5%', top: 0, left: 0, width: '100%', height: '100px', zIndex: 1, pointerEvents: 'none', backgroundImage: 'linear-gradient(to bottom, transparent, white)' }} />
                {desc_text}{props.eventData.tags[0].split(',').map((item, index) => (
                  <Typography variant="body1" key={index} style={{ fontWeight: 'bold', color: 'dodgerBlue' }}>
                    #{item}
                  </Typography>
                ))}
              </Typography>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleSeeMore} className={classes.readMoreLink}>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    Read more
                    <ExpandMoreIcon style={{ color: 'Dodgerblue', paddingTop: '2px' }} />
                  </div>
                </Button>
              </div>
            </>
          )}
        </Grid>
      )}
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    filter: 'blur(0px)',
    color: 'white',
  },
  '@media (max-width:600px)': {
    title: {
      color: 'white',
    },
  },
  subheader: {
    fontWeight: 'lighter',
    filter: 'blur(0px)',
    color: 'white',
  },
  description: {
    height: '100px',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1,
    backgroundImage: 'linear-gradient(to bottom, transparent, black)',
    color: 'white',
    filter: 'blur(0px)',
  },
  readMoreLink: {
    paddingTop: '2%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'Dodgerblue',
    marginTop: '10px',
    marginBottom: '5%',
    filter: 'blur(0px)',
    cursor: 'pointer',
  },
  field: {
    color: 'white',
  },
}));

export default EventDetail;
