import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Image from '../../images/navbackground.jpg';
import { useRef, useState, useEffect } from "react";

function SidebarComponent(props) {
  const [openSlide, setopenSlide] = useState("");
  const sideNavRef = useRef(null);
  const [showsidebar,setshowsidebar] = useState(true)

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

  return (
    <div style={{ position: "fixed", top:35, width: "100%" ,zIndex: 2}}>
      {<div style={{ position: "absolute", top: 35, zIndex: 1, width: "0%", height: "80vh",background:"red" }}>
        <Sidebar ref={sideNavRef} rootStyles={{zIndex:"2",height:"80vh",bottom: 0, }} image={Image} transitionDuration={1000} collapsed={props.Openstatus} collapsedWidth='0px'>
            <Menu closeOnClick={true}>
            <SubMenu label="Events" >
                <MenuItem defaultOpen={true}> In Side University </MenuItem>
                <MenuItem> Out Side University </MenuItem>
            </SubMenu>
            <MenuItem > Societies </MenuItem>
            <MenuItem> Calendar </MenuItem>
            <MenuItem> Settings </MenuItem>
            </Menu>
        </Sidebar>
        </div>}
    </div>
  );
}

export default SidebarComponent;
