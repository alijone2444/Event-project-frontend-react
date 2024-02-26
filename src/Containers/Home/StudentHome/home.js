import { useState ,useEffect} from "react";
import CarouselComponent from "./crousel/crousel";
import '../../../styles/navbar_home.css';
import HomeBody from "./HomePageBody/homebody";
import ThemedFooter from "./Footer/footer";
import Navbar from "./navbar/navbar";
import ScrollingHorizontally from "./HomePageScrolls/HrScroll";
import ScrollToTopButton from "./scrollToTop/scrollup";
import { useMediaQuery } from "@mui/material";
import WrapperComponent from "../../../FooterAndHeaderwrapper";
import createAuthenticatedRequest from "../../../RequestwithHeader";
import { useDispatch,useSelector } from 'react-redux';
import { setEventsDataUserUpcoming } from "../../../ReduxStore/actions/eventsDataActionUser";
import constants from "../../../Constants/constants";
function Home(){
  const requestInstance = createAuthenticatedRequest()
  const dispatch = useDispatch()
  const UpcommingEvent = useSelector((state) => state.userUpcomingEvents);

  useEffect(()=>{
    if(UpcommingEvent.length===0){
      requestInstance
      .get(`${constants.BASE_URL}get-events`,{    
        params: {
        amount:'get-upcoming',
      },})
      .then(response => {
        dispatch(setEventsDataUserUpcoming(response.data.events));
        console.log('respones:',response.data.events)
      })
      .catch(err => {
        console.error('Error:', err);
      });
    }
  },[dispatch])

    const [showstyle , setshowstyle] = useState(false)
    const isSmallScreen = useMediaQuery('(max-width:768px)');

return(
    <div className={showstyle ? 'overlayhome' : ''}> 
      <WrapperComponent showstyle={() => setshowstyle(true)} notshowstyle={() => setshowstyle(false)}>
        <CarouselComponent/>
        <ScrollToTopButton/>
        <div style={{marginBottom:"5%",marginTop:isSmallScreen?"10%":"5%"}}>
          <ScrollingHorizontally data={UpcommingEvent} title={'Recent'} subheader={'Check Latest Happenings'}/>
          <ScrollingHorizontally data={UpcommingEvent} title={'Upcomming'} subheader={'Future Gatherings'}/>
          <ScrollingHorizontally data={UpcommingEvent} title={'Hot'} subheader={'Find Trending Occasions'}/>
        </div>
        <HomeBody/>
      </WrapperComponent>
    </div>
)
}
export default Home;
