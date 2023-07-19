import { useState } from "react";
import CarouselComponent from "./crousel/crousel";
import '../styles/navbar_home.css';
import HomeBody from "./HomePageBody/homebody";
import ThemedFooter from "./Footer/footer";
import Navbar from "./navbar/navbar";

function Home(){

    const [showstyle , setshowstyle] = useState(false)
return(
    <div className={showstyle ? 'overlayhome' : ''}>
        <Navbar showstyle={()=>setshowstyle(true)} notshowstyle={()=>setshowstyle(false)}/>
        <CarouselComponent/>
        <HomeBody/>
        <ThemedFooter/>
    
    </div>
)
}
export default Home;
