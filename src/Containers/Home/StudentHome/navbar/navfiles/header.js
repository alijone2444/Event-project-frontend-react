import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import HomeIcon from '@mui/icons-material/Home';
import Image from '../../../../../images/ist_logo.png';
import makeStyles from '@mui/styles/makeStyles';
import Heading from './heading';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Search from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import constants from '../../../../../Constants/constants';
import HideOnScroll from './hideonScroll';
import { useMediaQuery } from '@mui/material';
import SearchModal from '../../../../../Components/SearchModal/searchModal';
import navbarBackground from '../../../../../images/headerBackground.png';

const Header = (props) => {
  const classes = useStyles();
  const [expandedButton, setExpandedButton] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

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

  const handleSidebar = () => {
    props.callbackToSidebar();
  };

  const handleNavigation = (path) => {
    console.log(path.name)
    navigate(`/${path.name}`);
  };

  const handleDrawer = () => {
    props.showDrawer();
  };

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <HideOnScroll {...props}>
      <AppBar
        style={{
          top: 0,
          left: 0,
          zIndex: 3,
          backgroundColor: 'white',
          backgroundImage: `url(${navbarBackground})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <Toolbar className={classes.toolbar}>
          <Heading heading={isSmallScreen ? 'heading1' : 'heading2'} />

          {!isSmallScreen && (
            <div className={classes.logoContainer}>
              <a>
                <img src={Image} alt="Logo" className={classes.logoImage} />
              </a>
            </div>
          )}

          <div className={classes.rightContent}>
            {!isMobile && (
              <>
                {constants.menuitems.map((item, index) => (
                  (item.name !== 'Calander'&&item.name !== 'IST MAP') &&
                  <Button
                    key={index}
                    className='text-stroke-navbar'
                    style={{ fontWeight: 'bold' }}
                    onClick={() => handleNavigation(item)}
                  >
                    {item.name}
                  </Button>
                ))}

                <Button
                  onClick={handleDrawer}
                  className='text-stroke-navbar'
                  style={{ fontWeight: 'bold' }}>
                  More..
                </Button>
              </>
            )}

            {isMobile && (
              <>
                <IconButton onClick={() => setOpenSearch(true)} color="inherit">
                  <Search style={{ color: '#00abe5' }} />
                </IconButton>
                <IconButton onClick={handleSidebar} color="inherit">
                  <MenuIcon style={{ color: '#00abe5' }} />
                </IconButton>
              </>
            )}

            <SearchModal open={openSearch} onclose={() => { setOpenSearch(false); }} />
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  logoContainer: {
    position: 'absolute',
    left: "50%",
    transform: "translate(-50%, 0)"
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
  '@media (max-width: 900px)': {
    toolbar: {
      // Additional styles for smaller screens can be added here
    }
  },
}));

export default Header;
