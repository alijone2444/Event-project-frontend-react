import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import Image from '../../../images/ist_logo.png';
import makeStyles from '@mui/styles/makeStyles';
import Heading from './heading';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate} from "react-router-dom"
import MySettingIcon from './lottieSettingicon'

const Header = (props) => {
  const classes = useStyles();
  const [expandedButton, setExpandedButton] = React.useState(null);
  const [homeButtonActive, setHomeButtonActive] = React.useState(false);
  const [settingsButtonActive, setSettingsButtonActive] = React.useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    handleResize(); // Check initial width
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleButtonClick = (buttonName) => {
    if (expandedButton === buttonName) {
      setExpandedButton(null);
      if (buttonName === 'Home') {
        setHomeButtonActive(false);
      } else if (buttonName === 'Settings') {
        setSettingsButtonActive(false);
      }
    } else {
      setExpandedButton(buttonName);
      if (buttonName === 'Home') {
        setHomeButtonActive(true);
        setSettingsButtonActive(false);
      } else if (buttonName === 'Settings') {
        setSettingsButtonActive(true);
        setHomeButtonActive(false);
      }
    }
  };
  const handleSidebar=()=>{
    props.callbackToSidebar()
  }
  const handleSocieties=()=>{
    navigate("/societies")
  }
  const handleCalander=()=>{
    navigate("/calander")
  }
  const handleHome=()=>{
    navigate("/Home")
  }
  return (
    <AppBar position="static" color="transparent" style={{position:"sticky",top:0,left:0,zIndex:"3",backgroundColor:"white"}}> 
      <Toolbar className={classes.toolbar}>
        <Heading />

        <div className={classes.logoContainer}>
          <a>
            <img src={Image} alt="Logo" className={classes.logoImage} />
          </a>
        </div>

        <div className={classes.rightContent}>
          {!isMobile && (
            <>
            
            <Button color="inherit" onClick={handleHome}>Home</Button>
              <Button color="inherit" onClick={handleSocieties}>Societies</Button>
              <Button color="inherit" onClick={handleCalander}>Calendar</Button>
              <Button color="inherit">Events</Button>
           

            <IconButton
            style={{margin:0,padding:0}}
              onClick={() => handleButtonClick('Settings')}
              color={settingsButtonActive ? 'primary' : 'default'}
            >
              <MySettingIcon onClick={()=>{console.log("hello")}}/>
            </IconButton>
            
            <Collapse
              className={classes.iconbutton}
              in={expandedButton === 'Settings'}
              timeout={1000}
              unmountOnExit
            >
            <div className={classes.collapseContent}>
              <IconButton>
                <Typography variant="body2">Settings</Typography>
              </IconButton>
            </div>
          </Collapse>
          </>
          )}
          {isMobile && <IconButton
            color={settingsButtonActive ? 'primary' : 'default'}
            onClick={handleSidebar}
          >
            <MenuIcon />
          </IconButton>}
        </div>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },logoContainer: {
    position:'absolute',
    left:"50%",
    transform: "translate(-50%, 0)"
  },
  Middlecontent: {
   
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Added line

  },
  rightContent: {
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    color:"#00adef"
  },
  logoImage: {
    height: '60px',
  },
  iconbutton: {
    borderBottom: '3px solid #0090d6',
  },
  collapseContent: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginLeft: '100%',
    transition: 'transform 0.3s ease',
    transform: 'translateX(-100%)',
  },
  '@media (max-width: 600px)': {
    logoImage: {
      display: 'none',
    },
  },
  '@media (max-width: 900px)': {
    toolbar:{
      paddingLeft:"0 !important"
    }
  },
}));

export default Header;
