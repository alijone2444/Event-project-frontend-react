import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Image from '../../../../../images/navbackground.jpg';
import { useRef, useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { makeStyles } from '@mui/styles';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import StarBorderOutlined from '@mui/icons-material/StarBorderOutlined';
import societyicon from '../../../../../images/societyicon.png'
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import CalendarTodayOutlined from '@mui/icons-material/CalendarTodayOutlined';
import ist_logo2 from '../../../../../images/editedlogo_2.png'
import { useMediaQuery } from '@mui/material';
import constants from '../../../../../Constants/constants';
function SidebarComponent(props) {
  const [openSlide, setopenSlide] = useState("");
  const sideNavRef = useRef(null);
  const [showsidebar,setshowsidebar] = useState(true)
  const classes = useStyles() 
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');
  useEffect(() => {
    if (props.Openstatus===false) {
      setshowsidebar(true)
      // Add event listener to the document object
      document.addEventListener('mousedown', handleClickOutside);
    }

    <MenuItem className={classes.menuitem} onClick={handleSocieties}><div style={{display:"flex",justifyContent:"space-between"}}><div style={{display:"flex",alignItems:"center"}}> Societies </div><div> <img  alt="Event Icon" src={societyicon} className={classes.icon} /></div></div></MenuItem>
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
const handleSocieties =()=>{
  navigate("/societies")
}
const handleCalander=()=>{
  navigate("/calander")
}
const handleHome=()=>{
  navigate("/Home")
}
  return (
    <div className={classes.parent} >
      <div className={classes.parent2} >
        <Sidebar rootStyles={{border:"0px"}} ref={sideNavRef} className={classes.sidebar} image={Image} transitionDuration={1000} collapsed={props.Openstatus}   collapsedWidth={'0'}>
        {isMobile &&<img src={ist_logo2} alt="Event Icon" style={{position:"absolute",left:"-20px"}}/>}
            <Menu closeOnClick={true} >
            {constants.menuitems.map((menuItem, index) => (
              <MenuItem
                key={index}
                className={classes.menuitem}
                onClick={
                  menuItem.name === 'Home' ? handleHome :
                  menuItem.name === 'Societies' ? handleSocieties :
                  menuItem.name === 'Calander' ? handleCalander :
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
            <MenuItem className={classes.menuitem} ><div style={{display:"flex",justifyContent:"space-between"}}><div style={{display:"flex",alignItems:"center"}}> Settings </div><div><SettingsOutlined style={{color:"black"}}/></div></div></MenuItem>
                      
          </Menu>
        </Sidebar>
        </div>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  parent: {
    position: "fixed",
     top:0,
      width: "100%" 
    ,zIndex: 4,
  },  
  parent2 :{
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
  menuitem:{
    background:"rgba(255, 255, 255, 0.3)",
    color:"black",
    padding:"2%",
    fontFamily:"arial",
    borderTop:"2px solid white"
  },

}));
export default SidebarComponent;
