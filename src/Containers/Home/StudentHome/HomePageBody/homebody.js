import React from 'react';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ScrollAnimation from 'react-animate-on-scroll';
import constants from '../../../../Constants/constants';
function HomeBody() {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.container}>

      <Grid item xs={12} sm={12}>
        <Typography variant="h4" gutterBottom>
          IST UNIVERSITY & IST EMS
        </Typography>

      </Grid>
      <Grid item xs={12} sm={6}>
        <div className={classes.infoDiv}>

          <ScrollAnimation animateIn='fadeIn' animateOut='fadeOut'>
            <Typography variant="body1" gutterBottom style={{ paddingRight: '1%' }}>
              Seamless Event Planning Meets Innovative Education: Unleashing the Power of EMS at IST University. Our Event Management System (EMS) is designed to streamline and enhance the planning and execution of university events, providing a comprehensive platform that integrates advanced scheduling, real-time updates, and user-friendly interfaces. By leveraging cutting-edge technology and innovative educational tools, EMS empowers students and faculty to coordinate and manage events with unparalleled efficiency and ease. At IST University, we are committed to transforming event management into a seamless, engaging experience that supports the dynamic needs of our academic community, fosters collaboration, and promotes a culture of excellence and innovation.
            </Typography>

          </ScrollAnimation>
        </div>
      </Grid>

      <Grid item xs={12} sm={6}>
        <div className={classes.infoDiv}>
          <ScrollAnimation animateIn='fadeInUp' animateOut='fadeOutDown'>
            <Typography variant="body1" gutterBottom>
              At IST University, we believe in the transformative power of events and the profound
              impact they can have on shaping a vibrant society. To ensure a seamless and unforgettable
              experience for both organizers and participants,
              we proudly introduce IST EMS, our cutting-edge event management platform.
            </Typography>
          </ScrollAnimation>

          <ScrollAnimation animateIn='fadeInUp' animateOut='fadeOutDown'>
            <ul style={{ listStyleType: 'none', paddingLeft: "1.5em", textIndent: "-1.5em" }}>
              <li className={classes.listItemStyle}><span className={classes.tick}>&#10003;</span>Seamless Integration: We connects IST with community events.</li>
              <li className={classes.listItemStyle}><span className={classes.tick}>&#10003;</span>Effortless Management: Organizers easily plan, promote, and manage diverse events.</li>
              <li className={classes.listItemStyle}><span className={classes.tick}> &#10003;</span>Inspiring Environment: We create an inclusive, inspiring atmosphere.</li>
            </ul>
          </ScrollAnimation>

          <ScrollAnimation animateIn='fadeIn' animateOut='fadeOut'>
            <Typography variant='body1' gutterBottom>
              We welcome you to a world where innovation meets event management. IST Event Management System  ignite extraordinary experiences, empowering organizers to curate unforgettable events.

            </Typography>
          </ScrollAnimation>
        </div>
      </Grid>
      <Grid item xs={12} sm={12}>
        <ScrollAnimation animateIn='bounceInRight' animateOut='bounceOutLeft'>
          <Typography variant='body1' gutterBottom>

            {constants.societiesDescription}
          </Typography>
        </ScrollAnimation>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '5%'
  },
  infoDiv: {
    paddingLeft: '1%'
  },
  listItemStyle: {
    listStyleType: 'none',
  },
  tick: {
    color: 'red',
    paddingRight: "10px",
  },
}));

export default HomeBody;
