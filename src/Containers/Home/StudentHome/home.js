import { useState } from "react";
import CarouselComponent from "./crousel/crousel";
import '../../../styles/navbar_home.css';
import HomeBody from "./HomePageBody/homebody";
import ThemedFooter from "./Footer/footer";
import Navbar from "./navbar/navbar";
import ScrollingHorizontally from "./HomePageScrolls/HrScroll";
import ScrollToTopButton from "./scrollToTop/scrollup";
import { useMediaQuery } from "@mui/material";
import WrapperComponent from "../../../FooterAndHeaderwrapper";
import { useSelector } from "react-redux";
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
    const isSmallScreen = useMediaQuery('(max-width:768px)');

return(
    <div className={showstyle ? 'overlayhome' : ''}> 
      <WrapperComponent showstyle={() => setshowstyle(true)} notshowstyle={() => setshowstyle(false)}>
        <CarouselComponent/>
        <ScrollToTopButton/>
        <div style={{marginBottom:"5%",marginTop:isSmallScreen?"10%":"5%"}}>
          <ScrollingHorizontally data={imageData} title={'Recent'} subheader={'Check Latest Happenings'}/>
          <ScrollingHorizontally data={imageData} title={'Upcomming'} subheader={'Future Gatherings'}/>
          <ScrollingHorizontally data={imageData} title={'Hot'} subheader={'Find Trending Occasions'}/>
        </div>
        <HomeBody/>
      </WrapperComponent>
    </div>
)
}
export default Home;
