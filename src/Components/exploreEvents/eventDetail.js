import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, IconButton, Link } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';
import '@fontsource/roboto/400.css';


const EventDetail = (props) => {
  const classes = useStyles();
  const [halfDescription , showhalfDescription] = useState(true)
  const desc_text = `Immerse yourself in the upcoming university event, a celebration of knowledge, creativity, and community spirit. Set against the vibrant backdrop of our campus, this event promises a dynamic fusion of academic brilliance and cultural diversity. From insightful panel discussions led by distinguished speakers to captivating performances by talented students, the event is designed to engage, inspire, and foster connections.
  As anticipation builds, attendees can look forward to interactive workshops, showcasing the innovative ideas and talents of our university community. The event will be a melting pot of ideas, where students, faculty, and guests can exchange perspectives and embark on a collective journey of discovery.
  Be prepared to witness a harmonious blend of intellectual stimulation, artistic expression, and collaborative energy. This university event is not just a celebration; it's a testament to the dynamic spirit that defines our academic community. Join us in the coming days for an experience that transcends traditional boundaries, leaving an indelible mark on the university landscape.
`;

  const handleSeeMore = () => {
    window.scrollTo({
      top: window.scrollY + window.innerHeight * 0.5,
      behavior: 'smooth',
    });
    showhalfDescription(false)
    props.callback_seemore(desc_text);
  };
  useEffect(()=>{
    showhalfDescription(true)
  },[props.showmore])

  return (
    <Grid container spacing={2} pt={5}>
      {/* Title */}
      <Grid item xs={12}>
        <Typography variant="h4" mb={0} className={classes.title} gutterBottom>
          Event Title
        </Typography>
      </Grid>

      {/* Subheader */}
      <Grid item xs={12}>
        <Typography variant="h6" className={classes.subheader}>
          Subheader
        </Typography>
      </Grid>

      {halfDescription &&
        <Grid item xs={12}>
        <Typography variant="body1" className={classes.description}p={2}>
          <div style={{ position: 'absolute',padding:'5%', top: 0, left: 0, width: '100%', height: '100px', zIndex: 1, pointerEvents: 'none', backgroundImage: 'linear-gradient(to bottom, transparent, white)' }} />
          {desc_text}
        </Typography>
        <Link onClick={handleSeeMore}  component="button" underline="none" variant="body2" className={classes.readMoreLink}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            Read more
            <ExpandMoreIcon style={{ color: 'Dodgerblue', paddingTop: '2px' }} />
          </div>
        </Link>
      </Grid>}

      {/* Interested Button */}
      <Grid item xs={12} className={classes.buttonContainer}>
        <Button variant="contained" color="primary">
          Interested
          <IconButton color="inherit">
            <CheckCircleOutlineIcon />
          </IconButton>
        </Button>
      </Grid>
    </Grid>
  );
};
const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
  subheader: {
    fontWeight: 'lighter',
  },
  description: {
    height: '100px',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1,
    backgroundImage: 'linear-gradient(to bottom, transparent, white)',
  },
  readMoreLink: {
    width:'100%',
    paddingTop:'2%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'Dodgerblue',
    cursor: 'pointer',
  },
  buttonContainer: {
  },
}));

export default EventDetail;
