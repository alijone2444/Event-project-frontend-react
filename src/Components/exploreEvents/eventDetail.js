import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Lottie from 'react-lottie';
import HeardBubbling from '../../lottie/heartBubbling.json';
import LikeCommentShare from '../commentShareLike/commentShareLike';
const EventDetail = (props) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} style={{ height: '100%', }}>
      {/* Title */}
      <Grid item xs={12} >
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

      <LikeCommentShare isLiked={props.eventData.isLiked} id={props.eventData._id} commentsCalled={props.commentsCalled} showshare={props.showshare} />
      {/* Description */}
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
