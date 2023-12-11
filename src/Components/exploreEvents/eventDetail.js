import React from 'react';
import { Grid, Typography, Button, IconButton } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Link from '@mui/material/Link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const EventDetail = (props) => {
  const desc_text = `Immerse yourself in the upcoming university event, a celebration of knowledge, creativity, and community spirit. Set against the vibrant backdrop of our campus, this event promises a dynamic fusion of academic brilliance and cultural diversity. From insightful panel discussions led by distinguished speakers to captivating performances by talented students, the event is designed to engage, inspire, and foster connections.
  As anticipation builds, attendees can look forward to interactive workshops, showcasing the innovative ideas and talents of our university community. The event will be a melting pot of ideas, where students, faculty, and guests can exchange perspectives and embark on a collective journey of discovery.
  Be prepared to witness a harmonious blend of intellectual stimulation, artistic expression, and collaborative energy. This university event is not just a celebration; it's a testament to the dynamic spirit that defines our academic community. Join us in the coming days for an experience that transcends traditional boundaries, leaving an indelible mark on the university landscape.
`
const handleSeeMore=()=>{
  window.scrollTo({
    top: window.scrollY + window.innerHeight * 0.5,
    behavior: 'smooth'
  });
  props.callback_seemore(desc_text)
}
  return (
    <Grid container spacing={2}>
      {/* Title */}
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Event Title
        </Typography>
      </Grid>

      {/* Subheader */}
      <Grid item xs={12}>
        <Typography variant="h6" fontWeight="lighter">
          Subheader
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body1" style={{ height: '100px',overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100px', zIndex: 1, pointerEvents: 'none', backgroundImage: 'linear-gradient(to bottom, transparent, white)' }} />
          {desc_text}
        </Typography>
        <Link onClick={handleSeeMore} component="button" underline='none' variant="body2">
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' ,alignItems:'center'}}>
                Read more 
                  <ExpandMoreIcon style={{ color: 'Dodgerblue', paddingTop: '2px' }} />
                </div>
          </Link>
 
      </Grid>

      
      {/* Interested Button */}
      <Grid item xs={12}>
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

export default EventDetail;
