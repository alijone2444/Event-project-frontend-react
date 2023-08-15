import React from 'react';
import { Grid, Typography, TextareaAutosize } from '@mui/material';
import { makeStyles } from '@mui/styles';

function HomeBody() {
    const classes = useStyles();
  
    return (
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12} sm={6}>
          <div className={classes.infoDiv}>
                <Typography variant="h3" gutterBottom>
                IST UNIVERSITY & IST HUb 
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ fontSize: '18px' }}>
                Seamless Event Planning Meets Innovative Education: Unleashing the Power of Calendarium at IST University
                </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className={classes.infoDiv}>
                <Typography variant="body1" gutterBottom>
                At IST University, we believe in the transformative power of events and the profound 
                impact they can have on shaping a vibrant society. To ensure a seamless and unforgettable 
                experience for both organizers and participants,
                 we proudly introduce IST HUB, our cutting-edge event management platform.
                </Typography>
                <Typography variant="body1" gutterBottom>
            
                <ul style={{ listStyleType: 'none' ,paddingLeft: "1.5em",textIndent:"-1.5em"}}>
                  <li className={classes.listItemStyle}><span className={classes.tick}>&#10003;</span>Seamless Integration: We connects IST with community events.</li>
                  <li className={classes.listItemStyle}><span className={classes.tick}>&#10003;</span>Effortless Management: Organizers easily plan, promote, and manage diverse events.</li>
                  <li className={classes.listItemStyle}><span className={classes.tick}> &#10003;</span>Inspiring Environment: We create an inclusive, inspiring atmosphere.</li>
                </ul>
                </Typography>
                <Typography variant='body1' gutterBottom>
                We welcome you to a world where innovation meets event management. Calendarium and IST University ignite extraordinary experiences, empowering organizers to curate unforgettable events. 
                Join us as we redefine transformative education within a vibrant society.
                </Typography>
          </div>
        </Grid>
      </Grid>
    );
  }
  
  
    const useStyles = makeStyles((theme) => ({
        infoDiv: {
            padding:"5%"
        },  
        listItemStyle :{
          listStyleType: 'none',
          },
          tick:{
            color:'red'
            ,paddingRight:"10px"
          }
      }));
      
export default HomeBody