import { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from 'react-redux';
import { setEventsDataUserUpcoming, setEventsDataUserRecent } from "../../../ReduxStore/actions/eventsDataActionUser";
import constants from "../../../Constants/constants";
import getAllEvents from "../../../Components/functions/getAllEvents";

function Home() {
  const requestInstance = createAuthenticatedRequest()
  const dispatch = useDispatch()
  const UpcommingEvent = useSelector((state) => state.userUpcomingEvents);
  const recentEvents = useSelector((state) => state.userRecentEvents);

  useEffect(() => {
    if (UpcommingEvent.length === 0) {
      requestInstance
        .get(`${constants.BASE_URL}get-events`, {
          params: {
            amount: 'get-upcoming',
          },
        })
        .then(response => {
          dispatch(setEventsDataUserUpcoming(response.data.events));
        })
        .catch(err => {
          console.error('Error:', err);
        });
    }
  }, [dispatch])
  useEffect(() => {
    if (recentEvents.length === 0) {
      requestInstance
        .get(`${constants.BASE_URL}get-events`, {
          params: {
            amount: 'recent',
          },
        })
        .then(response => {
          dispatch(setEventsDataUserRecent(response.data.events));
          console.log('respones:', response.data.events)
        })
        .catch(err => {
          console.error('Error:', err);
        });
    }
  }, [dispatch])

  getAllEvents(0)
  const [showstyle, setshowstyle] = useState(false)
  const isSmallScreen = useMediaQuery('(max-width:768px)');

  return (
    <div className={showstyle ? 'overlayhome' : ''}>
      <WrapperComponent showstyle={() => setshowstyle(true)} notshowstyle={() => setshowstyle(false)}>
        <CarouselComponent />
        <ScrollToTopButton />
        <div style={{ marginBottom: "5%", marginTop: isSmallScreen ? "10%" : "5%" }}>
          <ScrollingHorizontally data={recentEvents} title={'Recent'} subheader={'Check Latest Happenings'} />
          <ScrollingHorizontally data={UpcommingEvent} title={'Upcomming'} subheader={'Future Gatherings'} />
          <ScrollingHorizontally data={UpcommingEvent} title={'Hot'} subheader={'Find Trending Occasions'} />
        </div>
        <HomeBody />
      </WrapperComponent>
    </div>
  )
}
export default Home;
