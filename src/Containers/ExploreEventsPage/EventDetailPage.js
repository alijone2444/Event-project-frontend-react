import OpenEvent from "../../Components/OpenEvent/openEvent";
import React, { useEffect, useState } from 'react';
import WrapperComponent from '../../FooterAndHeaderwrapper';
import { useLocation } from "react-router-dom";
import AppBarComponent from "../../Components/SubAppbar/appbar";
import { useNavigate } from "react-router-dom";
import constants from "../../Constants/constants";
import createAuthenticatedRequest from "../../RequestwithHeader";
import { useMediaQuery } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { setEventsDataAll } from "../../ReduxStore/actions/eventsDataActionUser";

function EventDetailPage() {
  const { state } = useLocation();
  const { _id, eventName } = state?.data;
  const Events = useSelector((state) => state.userAllEvents);
  const eventData = Events.find((event) => event._id === _id);
  const [loading, setLoading] = useState(!eventData); // Initialize loading state based on eventData
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');
  const requestInstance = createAuthenticatedRequest();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!eventData) {
      setLoading(true); // Set loading to true when starting fetch
      requestInstance.get(`${constants.BASE_URL}get-events`, {
        params: {
          amount: 'One',
          eventName: eventName
        },
      })
        .then((response) => {
          dispatch(setEventsDataAll([...Events, response.data.events[0]]));
          setLoading(false); // Update loading state
        })
        .catch((error) => {
          console.error("Error fetching event:", error);
          setLoading(false); // Update loading state on error
        });
    } else {
      setLoading(false); // No need to fetch, data is already available
    }
  }, [_id, eventData, eventName, Events, dispatch, requestInstance]);

  const backgroundImage = eventData ? {
    backgroundImage: `url(${constants.BASE_URL}images/${eventData.dpimageFileName})`,
    backgroundSize: 'cover',
    filter: 'blur(30px)',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    zIndex: -1,
  } : {};

  return (
    <WrapperComponent>
      <AppBarComponent title={'Back'} onBackButtonClick={() => { navigate(state.toNavigate) }} />
      <div style={{
        position: 'relative',
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: '5%',
        paddingTop: isMobile ? '5%' : '2%'
      }}>
        {loading ? (
          <Box
            sx={{
              width: '100%',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          >
            <CircularProgress />
          </Box>
        ) : eventData ? (
          <>
            <div style={backgroundImage} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <OpenEvent eventData={eventData} />
            </div>
          </>
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          >
            <div>Event not found</div>
          </Box>
        )}
      </div>
    </WrapperComponent>
  );
}

export default EventDetailPage;
