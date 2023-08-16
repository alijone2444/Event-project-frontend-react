import React from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Grid, Typography, Link, createTheme, ThemeProvider, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ScrollingText from './footerMarquee/marquee';
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // Replace with your desired primary color
    },
    common: {
      white: '#ffffff', // Replace with your desired text color
    },
  },
});

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: theme.spacing(1, 0),
  },
  link: {
    margin: theme.spacing(1, 2),
    color: theme.palette.common.white,
  },
  text: {
    textAlign: 'center',
  },
  iconButton: {
    color: theme.palette.common.white,
  },
  socialMediaContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  societyContainer: {
    marginTop: theme.spacing(2),
    display:"flex",
    justifyContent:"center",
  },
  text2:{
    display:"flex",
    alignItems:"center",
    paddingLeft: theme.spacing(1),
  },
  arrowIcon: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(1),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
       <Grid container  style={{display:"flex",justifyContent:"center",marginBottom:"5%",padding:"2%"}}>
          <Grid item xs={12} sm={12}>
            
      <ScrollingText/>
          </Grid>
          </Grid>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" className={classes.text} >
              IST Hub
            </Typography>
           
            <Typography variant="body2"style={{padding:"1%"}} className={classes.text}>
              Address: 123 Street, City, Country
            </Typography>
            <Typography variant="body2"style={{padding:"1%"}} className={classes.text}>
              Email: info@isthub.com
            </Typography>
            <Typography variant="body2"style={{padding:"1%"}} className={classes.text}>
              Phone: +1234567890
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" className={classes.text}>
              Societies
            </Typography>
            <div className={classes.societyContainer}>
              <div>
                <Typography variant="body2" className={classes.text2}>
                  <ChevronRightIcon className={classes.arrowIcon} /> Media Club
                </Typography>
                <Typography variant="body2" className={classes.text2}>
                  <ChevronRightIcon className={classes.arrowIcon} /> Youth Club
                </Typography>
                <Typography variant="body2" className={classes.text2}>
                  <ChevronRightIcon className={classes.arrowIcon} /> Art Club 
                </Typography>
                <Typography variant="body2" className={classes.text2}>
                  <ChevronRightIcon className={classes.arrowIcon} /> Adventure Club
                </Typography>
                <Typography variant="body2" className={classes.text2}>
                  <ChevronRightIcon className={classes.arrowIcon} /> Sports Club
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" className={classes.text}>
              Follow us
            </Typography>
            <div className={classes.socialMediaContainer}>
              <IconButton href="https://www.facebook.com" className={classes.iconButton}>
                <FacebookIcon style={{color:'white'}}/>
              </IconButton>
              <IconButton href="https://www.instagram.com" className={classes.iconButton}>
                <InstagramIcon style={{color:'white'}}/>
              </IconButton>
              <IconButton href="https://www.twitter.com" className={classes.iconButton}>
                <TwitterIcon style={{color:'white'}}/>
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Typography variant="body2"style={{marginTop:"5%"}}className={classes.text}>
              An Event Management Platform
            </Typography>
      <Typography variant="body2" className={classes.text} >
        © {new Date().getFullYear()} IST Hub. All rights reserved.
      </Typography>
    </footer>
  );
};

const ThemedFooter = () => {
  return (
    <ThemeProvider theme={theme}>
      <Footer />
    </ThemeProvider>
  );
};

export default ThemedFooter;
