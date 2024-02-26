import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Grid, Typography,  createTheme, ThemeProvider, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import constants from '../../../../Constants/constants';
import { useMediaQuery } from '@mui/material';
import { useNavigate,useLocation } from 'react-router-dom';

const Footer = () => {
  
  const location = useLocation()
  useEffect(()=>{
    if(location.pathname === "/login") {
      return null
    }
  },[])
  
  const navigate = useNavigate()
  const classes = useStyles();
  const isSmallScreen = useMediaQuery('(max-width: 768px)'); // Adjust the max-width value as needed
  const handleSocieties =()=>{
    navigate("/societies")
    console.log("societies")
  }
  const handleCalander=()=>{
    navigate("/calander")
    console.log("calander")
  }
  const handleHome=()=>{
    navigate("/Home")
    console.log("Home")
  }
  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3}>
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
          <Grid item xs={12} sm={3}>
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
          <Grid item xs={12} sm={3}>
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
          <Grid item xs={12} sm={3} style={{display:"flex",alignItems:isSmallScreen?"center":"flex-start",flexDirection:"column"}}> 
            <div style={{paddingLeft:isSmallScreen?"0":"13%"}}>
              <Typography variant="h6" className={classes.texte} >
                Links
              </Typography>
            </div>
            {constants.menuitems.map((menuItem, index) => (
              <div key={index} className={classes.menuButton}  style={{paddingRight:isSmallScreen?"10%":"0%"}}  onClick={
                menuItem.name === 'Home' ? handleHome :
                menuItem.name === 'Societies' ? handleSocieties :
                menuItem.name === 'Calander' ? handleCalander :
                null // Add more cases if needed
              }>
                <IconButton className={classes.arrowIcone}>
                  <ArrowForwardIcon style={{ color: "white" }} />
                </IconButton>
                <Typography variant="body1">{menuItem.name}</Typography>
              </div>
            ))}
            
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
    backgroundColor: ' rgba(30, 144, 255, 0.7)',
    color: theme.palette.common.white,
    padding: theme.spacing(6, 0),
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
  texte: {
    fontWeight: 'bold',
  },
  menuButton: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: '0.3s',
    '&:hover': {
      paddingLeft: '8px', // Add space for the arrow icon
      '& $arrowIcone': {
        opacity: 1,
        transform: 'translateX(0)',
      },
    },
  },
  arrowIcone: {
    opacity: 0,
    transform: 'translateX(-10px)',
    transition: '0.3s',
  },
}));

export default ThemedFooter;
