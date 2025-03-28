import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Grid, Typography, createTheme, ThemeProvider, IconButton, Skeleton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import constants from '../../../../Constants/constants';
import { useMediaQuery } from '@mui/material';
import createAuthenticatedRequest from '../../../../RequestwithHeader';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setFooterSocieties } from '../../../../ReduxStore/actions/setConstantsAction';
const Footer = (props) => {
  const requestInstance = createAuthenticatedRequest()
  const location = useLocation()
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const societies = useSelector((state) => state.Footersocieties.societies);


  useEffect(() => {
    if (location.pathname === "/login") {
      return null
    }
  }, [])

  const navigate = useNavigate()
  const classes = useStyles();
  const isSmallScreen = useMediaQuery('(max-width: 768px)'); // Adjust the max-width value as needed
  const handleSocieties = () => {
    navigate("/societies")
  }
  const handleCalander = () => {
    navigate("/calander")
  }
  const handleHome = () => {
    navigate("/Home")
  }
  const handleEvents = () => {
    navigate('/events')
  }
  useEffect(() => {
    const fetchSocieties = async () => {
      try {
        const response = await requestInstance.get(`${constants.BASE_URL}footer-popular-societies`);
        if (response.data) {
          dispatch(setFooterSocieties(response.data));
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    if (societies.length === 0) {
      fetchSocieties();
    }
  }, [dispatch]);

  return (
    <footer className={classes.footer} style={{ backgroundColor: props.EditedFooter ? 'rgba(157, 148, 181, 1)' : 'rgba(30, 144, 255, 0.7)' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" className={[classes.text]} >
              Eventive
            </Typography>
            <div style={{ marginTop: '5%' }}>
              <Typography variant="body2" style={{ padding: "1%" }} className={classes.text}>
                Address: 1, Islamabad Expressway, Islamabad
              </Typography>
              <Typography variant="body2" style={{ padding: "1%" }} className={classes.text}>
                Email: info@ist.edu.pk
              </Typography>
              <Typography variant="body2" style={{ padding: "1%" }} className={classes.text}>
                Phone: +923345082594
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" className={classes.text}>
              Societies
            </Typography>
            {!loading ? <div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className={classes.societyContainer}>

                  {societies.map(society => (
                    <div key={society._id} style={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body2" className={classes.text2} onClick={() => {
                        window.open(`${society.social_media_links.instagram || society.social_media_links.facebook}`, "_blank");
                      }}>
                        <ChevronRightIcon className={classes.arrowIcon} /> {society.name}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>

            </div>
              :
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ flexDirection: 'column', marginTop: '5%' }}>
                  <Skeleton variant="text" width={150} height={30} />
                  <Skeleton variant="text" width={150} height={30} />
                  <Skeleton variant="text" width={150} height={30} />
                  <Skeleton variant="text" width={150} height={30} />
                  <Skeleton variant="text" width={150} height={30} />
                </div>
              </div>
            }
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" className={classes.text}>
              Follow us
            </Typography>
            <div className={classes.socialMediaContainer}>
              <IconButton href="https://www.facebook.com" className={classes.iconButton}>
                <FacebookIcon style={{ color: 'white' }} />
              </IconButton>
              <IconButton href="https://www.instagram.com" className={classes.iconButton}>
                <InstagramIcon style={{ color: 'white' }} />
              </IconButton>
              <IconButton href="https://www.twitter.com" className={classes.iconButton}>
                <TwitterIcon style={{ color: 'white' }} />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={12} sm={3} style={{ display: "flex", alignItems: isSmallScreen ? "center" : "flex-start", flexDirection: "column" }}>
            <div style={{ paddingLeft: isSmallScreen ? "0" : "13%" }}>
              <Typography variant="h6" className={classes.texte} >
                Links
              </Typography>
            </div>
            <div style={{
              marginTop: '5%', paddingRight: isSmallScreen ? "5%" : "0%"
            }}>
              {constants.menuitems.map((menuItem, index) => (
                <div key={index} className={classes.menuButton} onClick={
                  menuItem.name === 'Home' ? handleHome :
                    menuItem.name === 'Societies' ? handleSocieties :
                      menuItem.name === 'Calander' ? handleCalander :
                        menuItem.name === 'Events' ? handleEvents :
                          null // Add more cases if needed
                }>
                  <IconButton className={classes.arrowIcone}>
                    <ArrowForwardIcon style={{ color: "white" }} />
                  </IconButton>
                  <Typography variant="body1">{menuItem.name}</Typography>
                </div>
              ))}
            </div>
          </Grid>

        </Grid>
      </Container>
      <Typography variant="body2" style={{ marginTop: "5%" }} className={classes.text}>
        An Event Management Platform
      </Typography>
      <Typography variant="body2" className={classes.text} >
        © {new Date().getFullYear()} Eventive. All rights reserved.
      </Typography>
    </footer>
  );
};

const ThemedFooter = (props) => {
  return (
    <ThemeProvider theme={theme} >
      <Footer EditedFooter={props.EditedFooter} />
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

  },
  text2: {
    display: "flex",
    alignItems: "center",
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
