import { useState } from "react";
import Header from "./navbar/header";
import SidebarComponent from "./navbar/sidebar";
import CarouselComponent from "./crousel/crousel";
import '../styles/navbar_home.css';
import HomeBody from "./HomePageBody/homebody";
import ThemedFooter from "./Footer/footer";

function Home(){
    const [showSideBar,setshowSideBar]=useState(true)
    const [showstyle , setshowstyle] = useState(false)
    const handleSidebar=()=>{
        setshowSideBar(!showSideBar)
        setshowstyle(true)
        console.log("button")
    }
    const handleclose =()=>{
        setshowSideBar(true)
        setshowstyle(false)
        console.log("calback")
    }
    
return(
    <div className={showstyle ? 'overlayhome' : ''}>
        <Header callbackToSidebar ={handleSidebar}/>
        <SidebarComponent Openstatus={showSideBar} callbackClose={handleclose}/>
        <CarouselComponent/>
        <HomeBody/>
        <ThemedFooter/>

     
    </div>
)
}
export default Home;
