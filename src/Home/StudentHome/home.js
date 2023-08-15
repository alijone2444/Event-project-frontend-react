import { useState } from "react";
import CarouselComponent from "./crousel/crousel";
import '../../styles/navbar_home.css';
import HomeBody from "./HomePageBody/homebody";
import ThemedFooter from "./Footer/footer";
import Navbar from "./navbar/navbar";
import ScrollingHorizontally from "./HomePageScrolls/HrScroll";
import ScrollToTopButton from "./scrollToTop/scrollup";
function Home(){
    const imageData = [
        {
          title: 'Image 1',
          image: 'https://via.placeholder.com/150',
        },
        {
          title: 'Image 2',
          image: 'https://via.placeholder.com/150',
        },
        {
          title: 'Image 3',
          image: 'https://via.placeholder.com/150',
        },{
          title: 'Image 4',
          image: 'https://via.placeholder.com/150',
        },{
          title: 'Image 4',
          image: 'https://via.placeholder.com/150',
        },
      ];
    const [showstyle , setshowstyle] = useState(false)
return(
    <div className={showstyle ? 'overlayhome' : ''}>
        <Navbar showstyle={()=>setshowstyle(true)} notshowstyle={()=>setshowstyle(false)}/>
        <CarouselComponent/>
        <ScrollToTopButton/>
        <div style={{marginBottom:"5%"}}>
          <ScrollingHorizontally data={imageData} title={'Recent'}/>
          <ScrollingHorizontally data={imageData} title={'Upcomming'}/>
          <ScrollingHorizontally data={imageData} title={'Hot'}/>
        </div>
        <HomeBody/>
        <ThemedFooter/>
    
    </div>
)
}
export default Home;
