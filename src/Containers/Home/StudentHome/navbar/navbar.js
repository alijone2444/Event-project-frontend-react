import Header from './navfiles/header'
import SidebarComponent from './navfiles/sidebar'
import { useState } from "react";

function Navbar(props) {
  const [showSideBar, setshowSideBar] = useState(true);

  const handleSidebar = () => {
    setshowSideBar(!showSideBar);
    // Check if showstyle prop is provided before calling it
    if (props.showstyle) {
      props.showstyle();
    }
    console.log("button");
  };

  const handleclose = () => {
    setshowSideBar(true);
    // Check if notshowstyle prop is provided before calling it
    if (props.notshowstyle) {
      props.notshowstyle();
    }
    console.log("calback");
  };

  return (
    <div>
      <Header callbackToSidebar={handleSidebar} transparentNavbar={props.transparentNavbar} />
      <SidebarComponent Openstatus={showSideBar} callbackClose={handleclose} />
    </div>
  );
}

export default Navbar;
