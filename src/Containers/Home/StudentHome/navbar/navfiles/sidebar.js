import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Image from '../../../../../images/navbackground.jpg';
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { makeStyles } from '@mui/styles';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import StarBorderOutlined from '@mui/icons-material/StarBorderOutlined';
import societyicon from '../../../../../images/societyicon.png'
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarTodayOutlined from '@mui/icons-material/CalendarTodayOutlined';
import ist_logo2 from '../../../../../images/editedlogo_2.png'
import { useMediaQuery, IconButton } from '@mui/material';
import constants from '../../../../../Constants/constants';
import LogOut from '../../../../../Components/logout/logout';
import { Avatar, Box, Typography } from '@mui/material'; // Import Avatar, Box, and Typography from MUI

import Profile from '../../../../../images/noProfile.png';
import EditIcon from '@mui/icons-material/Edit';
function SidebarComponent(props) {
  const [openSlide, setopenSlide] = useState("");
  const sideNavRef = useRef(null);
  const [showsidebar, setshowsidebar] = useState(true)
  const [logout, setlogout] = useState(false)
  const classes = useStyles()
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const token = localStorage.getItem('userType');
  useEffect(() => {
    if (props.Openstatus === false) {
      setshowsidebar(true)
      // Add event listener to the document object
      document.addEventListener('mousedown', handleClickOutside);
    }

    <MenuItem className={classes.menuitem} onClick={handleSocieties}><div style={{ display: "flex", justifyContent: "space-between" }}><div style={{ display: "flex", alignItems: "center" }}> Societies </div><div> <img alt="Event Icon" src={societyicon} className={classes.icon} /></div></div></MenuItem>
    // Remove event listener when the component unmounts or when props.Openstatus changes to true
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [props.Openstatus]);

  function handleClickOutside(event) {
    if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
      console.log("bello");
      props.callbackClose();
      setshowsidebar(false)
    }
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
  return (
    <div className={classes.parent} >
      <div className={classes.parent2} >
        <Sidebar rootStyles={{ border: "0px" }} ref={sideNavRef} className={classes.sidebar} image={Image} transitionDuration={1000} collapsed={props.Openstatus} collapsedWidth={'0'}>
          {isMobile && <img src={ist_logo2} alt="Event Icon" style={{ position: "absolute", left: "-20px", top: '150px' }} />}
          <Menu closeOnClick={true} >

            <Box sx={{ background: 'rgba(255,255,255,0.5)', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
              <Avatar sx={{ width: 64, height: 64, mb: 1 }}
                onClick={() => {
                  navigate('/user-profile');
                }}>U</Avatar>
              <IconButton sx={{ position: 'absolute', top: 10, right: 10, backgroundColor: 'white', zIndex: 999 }}
                onClick={() => {
                  navigate('/user-profile', { state: { data: 'edit' } });
                }}>
                <EditIcon style={{ fontSize: 15 }} />
              </IconButton>
              <Typography variant="h6" style={{ zIndex: 999 }}>username</Typography>
              <Typography variant="body1" style={{ zIndex: 999, textAlign: 'justify' }}>Welcome aboard, username!</Typography>
            </Box>

            {constants.menuitems.map((menuItem, index) => (
              <MenuItem
                key={index}
                className={classes.menuitem}
                onClick={
                  menuItem.name === 'Home' ? handleHome :
                    menuItem.name === 'Societies' ? handleSocieties :
                      menuItem.name === 'Calander' ? handleCalander :
                        menuItem.name === 'Events' ? handleEvents :
                          null // Add more cases if needed
                }
              >

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {menuItem.name}
                  </div>
                  <div>
                    {menuItem.icon}
                  </div>
                </div>
              </MenuItem>

            ))}

            <SubMenu label="Settings" className={classes.menuitem}>
              {(token !== 'student' && token !== 'undefined') && constants.settings.map((val, index) => {
                return <MenuItem style={{ background: 'rgba(255,255,255,0.3)' }}>{val.name}</MenuItem>
              })}

            </SubMenu>
            <MenuItem className={classes.menuitem} onClick={() => { setlogout(true) }}>
              {logout && <LogOut pageToGo={'/'} />}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  logout
                </div>
                <div>
                  <LogoutIcon style={{ color: "black" }} />
                </div>
              </div>
            </MenuItem>

          </Menu>
        </Sidebar>
      </div>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  parent: {
    position: "fixed",
    top: 0,
    width: "100%"
    , zIndex: 4,
  },
  parent2: {
    position: "absolute"
    , top: 0,
    zIndex: 4,
    width: "0%",
    height: "100vh"
  },
  sidebar: {
    zIndex: "4",
    height: "100vh", // Set a fixed height, adjust as needed
    bottom: 0,
    overflowY: "auto", // or "scroll"
  },
  menuitem: {
    background: "rgba(255, 255, 255, 0.3)",
    color: "black",
    padding: "2%",
    fontFamily: "arial",
    borderTop: "2px solid white"
  },

}));
export default SidebarComponent;
