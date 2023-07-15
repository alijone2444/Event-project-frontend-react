import Header from './navfiles/header'
import SidebarComponent from './navfiles/sidebar'
import { useState } from "react";
function Navbar(props){    
    const [showSideBar,setshowSideBar]=useState(true)
const handleSidebar=()=>{
    setshowSideBar(!showSideBar)
    props.showstyle()
    console.log("button")
}
const handleclose =()=>{
    setshowSideBar(true)
    props.notshowstyle()
    console.log("calback")
}

    return(
        <div>
        <Header callbackToSidebar ={handleSidebar}/>
        <SidebarComponent Openstatus={showSideBar} callbackClose={handleclose}/>

        </div>
    )
}
export default Navbar