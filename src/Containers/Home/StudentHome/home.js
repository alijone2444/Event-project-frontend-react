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
import { setupNotifications } from "../../../Components/Firebase/firebase";
import { toastNotification, sendNativeNotification } from "../../../Components/Firebase/notificationHelper";
import useVisibilityChange from "../../../Components/Firebase/usevisibilityChange";
import { register } from "../../../Components/Firebase/serviceWorker";
import Greeting from "../../../Components/notificationsComponents/greeting";
import { setGotTokenFcm } from "../../../ReduxStore/actions/firebaseActions";
function Home() {
  const requestInstance = createAuthenticatedRequest()
  const dispatch = useDispatch()
  const UpcommingEvent = useSelector((state) => state.userUpcomingEvents);
  const recentEvents = useSelector((state) => state.userRecentEvents);
  const [showGreeting, setShowGreeting] = useState(false);
  const isForeground = useVisibilityChange();
  const FCMTOKEN = useSelector(state => state.FCMToken.flag); // Assuming FCMToken is your root reducer name

  useEffect(() => {
    const handleNotification = (message) => {
      const { title, body } = message.notification;
      const { date, location } = message.data

      console.log(message.notification, message.data)
      if (isForeground) {
        toastNotification({
          title,
          date,
          location,
          body,
        });
      } else {
        sendNativeNotification({
          title,
          body,
        });
      }

    };
    if (!FCMTOKEN) {
      setShowGreeting(true);
      setupNotifications(handleNotification).then(() => {

        // const handleNotification = (payload) => {
        //   console.log(payload)
        // }
      });
      dispatch(setGotTokenFcm(true));

    }
  }, [isForeground]);
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

  const [showstyle, setshowstyle] = useState(false)
  const isSmallScreen = useMediaQuery('(max-width:768px)');

  return (
    <div className={showstyle ? 'overlayhome' : ''}>
      <WrapperComponent showstyle={() => setshowstyle(true)} notshowstyle={() => setshowstyle(false)}>
        {showGreeting && <Greeting message={`Hello ! Welcome to Event Management System Of IST.`} />}
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
