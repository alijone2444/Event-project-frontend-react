import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Image from '../../../images/navbackground.jpg';
import { useRef, useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { makeStyles } from '@mui/styles';

function SidebarComponent(props) {
  const [openSlide, setopenSlide] = useState("");
  const sideNavRef = useRef(null);
  const [showsidebar,setshowsidebar] = useState(true)
  const classes = useStyles() 
  const navigate = useNavigate();
  useEffect(() => {
    if (props.Openstatus===false) {
      // Add event listener to the document object
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Remove event listener when the component unmounts or when props.Openstatus changes to true
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [props.Openstatus]);

  function handleClickOutside(event) {
    if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
      console.log("bello");
      setshowsidebar(false)
      props.callbackClose();
    }
  }
const handleSocieties =()=>{
  navigate("/societies")
}
const handleCalander=()=>{
  navigate("/calander")
}
  return (
    <div className={classes.parent} >
      {<div className={classes.parent2} >
        <Sidebar ref={sideNavRef} className={classes.sidebar} image={Image} transitionDuration={1000} collapsed={props.Openstatus} collapsedWidth='0px'>
            <Menu closeOnClick={true} >
            <SubMenu label="Events" style={{marginTop:"15%"}}>
                <MenuItem defaultOpen={true} > In Side University </MenuItem>
                <MenuItem> Out Side University </MenuItem>
            </SubMenu>
            <MenuItem className={classes.menuitem} onClick={handleSocieties}> Societies </MenuItem>
            <MenuItem className={classes.menuitem} onClick={handleCalander}> Calendar </MenuItem>
            <MenuItem className={classes.menuitem}> Settings </MenuItem>
            </Menu>
        </Sidebar>
        </div>}
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
  sidebar:{
    zIndex:"4",
    height:"100vh"
    ,bottom: 0, 
    
  },
  menuitem:{
    background:"rgba(154, 177, 255, 0.3)",
    color:"black",
    padding:"2%",
    fontFamily:"arial",
  }
}));
export default SidebarComponent;
