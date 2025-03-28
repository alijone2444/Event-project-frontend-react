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
import { setEventsDataUserUpcoming, setEventsDataUserRecent, setEventsDataPopular } from "../../../ReduxStore/actions/eventsDataActionUser";
import constants from "../../../Constants/constants";
import { setupNotifications } from "../../../Components/Firebase/firebase";
import { toastNotification, sendNativeNotification } from "../../../Components/Firebase/notificationHelper";
import useVisibilityChange from "../../../Components/Firebase/usevisibilityChange";
import { register } from "../../../Components/Firebase/serviceWorker";
import Greeting from "../../../Components/notificationsComponents/greeting";
import { setGotTokenFcm } from "../../../ReduxStore/actions/firebaseActions";
import { setProfileData } from "../../../ReduxStore/actions/profileDataAction";
import { setFCMToken } from "../../../ReduxStore/actions/fcmTokenState";
import SocietyCards from "../../../Components/SocietyCards/SocietyCards";
import EventDataProvider from "../../../Components/dataFetchingComponent/dataFetchingComponent";
import MarqueeComponent from "../../../Components/marqueeComponent/marquee";
import TimerComponent from "../../../Components/timer/timer";
function Home() {
  const requestInstance = createAuthenticatedRequest();
  const dispatch = useDispatch();
  const UpcommingEvent = useSelector((state) => state.userUpcomingEvents);
  const recentEvents = useSelector((state) => state.userRecentEvents);
  const popularEvents = useSelector((state) => state.userpopularEvents);
  const threeSocieties = useSelector(state => state.threeSocieties);


  const [showGreeting, setShowGreeting] = useState(false);
  const isForeground = useVisibilityChange();
  const FCMTOKEN = useSelector(state => state.FCMToken.flag); // Assuming FCMToken is your root reducer name
  const profileData = useSelector(state => state.profiledata);
  useEffect(() => {
    const handleNotification = (message) => {
      const { title, body } = message.notification;
      const data = message.data || {};

      const date = data.date || undefined;
      const location = data.location || undefined;

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
      setupNotifications(handleNotification).then((token) => {
        if (token) {
          dispatch(setFCMToken(token));
          dispatch(setGotTokenFcm(true));
        }
      });
    }
  }, [isForeground]);
  useEffect(() => {
    if (!FCMTOKEN) {
      setShowGreeting(true);
    }
  }, [FCMTOKEN])
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await requestInstance.get(`${constants.BASE_URL}get-profile-data`); // Replace with your endpoint
        if (response.data) {
          dispatch(setProfileData(response.data.profile)) // Set profile data upon successful fetch
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    if (Object.keys(profileData).length === 0) {
      fetchProfileData();
    }
  }, [dispatch]);

  useEffect(() => {
    if (popularEvents.length === 0) {
      requestInstance
        .get(`${constants.BASE_URL}get-events`, {
          params: {
            amount: 'get-popular',
          },
        })
        .then(response => {
          dispatch(setEventsDataPopular(response.data.events));
        })
        .catch(err => {
          console.error('Error:', err);
        });
    }
  }, [dispatch])
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
      <EventDataProvider />
      <WrapperComponent showstyle={() => setshowstyle(true)} notshowstyle={() => setshowstyle(false)}>
        {showGreeting && <Greeting message={`Hello ! Welcome to Event Management System Of IST.`} />}
        <CarouselComponent />
        <ScrollToTopButton />
        <div style={{ marginBottom: "5%", marginTop: isSmallScreen ? "10%" : "5%" }}>
          <ScrollingHorizontally data={UpcommingEvent} title={'Upcomming'} subheader={'Future Gatherings'} toNavigate='/Home' DescriptionKey='upcomingEvents' />
        </div>
        <div>
          <TimerComponent startDate={UpcommingEvent[0]?.startDate} startTime={UpcommingEvent[0]?.startTime} eventName={UpcommingEvent[0]?.eventName} />
          <SocietyCards threeSocieties={threeSocieties.societies} />
        </div>
        <HomeBody />
        <MarqueeComponent />

      </WrapperComponent>
    </div>
  )
}
export default Home;
