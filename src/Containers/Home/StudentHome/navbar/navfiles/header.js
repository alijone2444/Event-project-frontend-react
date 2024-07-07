import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import Image from '../../../../../images/ist_logo.png';
import makeStyles from '@mui/styles/makeStyles';
import Heading from './heading';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Search from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom"
import MySettingIcon from './lottieSettingicon'
import constants from '../../../../../Constants/constants'
import HideOnScroll from './hideonScroll';
import { useMediaQuery } from '@mui/material';
import { SearchOutlined } from '@ant-design/icons';
import SearchModal from '../../../../../Components/SearchModal/searchModal';
const Header = (props) => {
  const classes = useStyles();
  const [expandedButton, setExpandedButton] = React.useState(null);
  const [homeButtonActive, setHomeButtonActive] = React.useState(false);
  const [settingsButtonActive, setSettingsButtonActive] = React.useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [opensearh, setopensearh] = useState(false);

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
  const handleSidebar = () => {
    props.callbackToSidebar()
  }
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
    navigate("/events")
  }
  const handleDrawer = () => {
    props.showDrawer()
  }
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  return (

    <HideOnScroll {...props}>
      <AppBar style={{ top: 0, left: 0, zIndex: "3", backgroundColor: !props.transparentNavbar ? "white" : "white" }}>
        <Toolbar className={classes.toolbar}>
          <Heading heading={isSmallScreen ? 'heading1' : 'heading2'} />

          {!isSmallScreen &&
            <div className={classes.logoContainer}>
              <a>
                <img src={Image} alt="Logo" className={classes.logoImage} />
              </a>
            </div>}

          <div className={classes.rightContent}>
            {!isMobile && (
              <>
                {!isMobile && (
                  <>
                    {constants.menuitems.map((item, index) => (
                      <Button
                        key={index}
                        color="inherit"
                        onClick={
                          item.name === 'Home' ? handleHome :
                            item.name === 'Societies' ? handleSocieties :
                              item.name === 'Calander' ? handleCalander :
                                item.name === 'Events' ? handleEvents :
                                  null // Add more cases if needed
                        }
                      >
                        {item.name}
                      </Button>
                    ))}

                    <IconButton
                      style={{ margin: 0, padding: 0 }}
                      onClick={() => handleButtonClick('Settings')}
                      color={settingsButtonActive ? 'primary' : 'default'}
                    >
                      <MySettingIcon onClick={() => { console.log("hello"); }} start={settingsButtonActive} />
                    </IconButton>
                  </>
                )}

                <Collapse
                  className={classes.iconbutton}
                  in={expandedButton === 'Settings'}
                  timeout={1000}
                  unmountOnExit
                >
                  <div className={classes.collapseContent}>
                    <IconButton onClick={handleDrawer}>
                      <Typography variant="body2">Settings</Typography>
                    </IconButton>
                  </div>
                </Collapse>
              </>
            )}
            {isMobile &&
              <>
                <IconButton
                  color={settingsButtonActive ? 'primary' : 'default'}
                  onClick={() => { setopensearh(true) }}
                >
                  <Search style={{ color: '#00abe5' }} />
                </IconButton>
                <IconButton
                  color={settingsButtonActive ? 'primary' : 'default'}
                  onClick={handleSidebar}
                >
                  <MenuIcon style={{ color: '#00abe5' }} />
                </IconButton>
              </>}

            <SearchModal open={opensearh} onclose={() => { setopensearh(false) }} />
          </div>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    left: "50%",
    transform: "translate(-50%, 0)"
  },
  Middlecontent: {

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Added line

  },
  rightContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: "#0292c2"
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
  '@media (max-width: 900px)': {
    toolbar: {
      // paddingLeft:"0 !important"
    }
  },
}));

export default Header;
