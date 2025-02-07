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
import { setCurrentPage, setTotalPages } from "../../ReduxStore/actions/eventsPaginationActions";

function EventDetailPage() {
  const { state } = useLocation();
  const { _id, eventName } = state?.data;
  const Events = useSelector((state) => state.userAllEvents);
  const eventData = Events.find((event) => event._id === _id);
  const [loading, setLoading] = useState(!eventData);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');
  const requestInstance = createAuthenticatedRequest();
  console.log('id is ', _id)
  const dispatch = useDispatch();
  const { currentPage, pageSize } = useSelector((state) => state.eventspagination);
  const [rerun, setrerun] = useState(false)
  useEffect(() => {
    const fetchSingleEvent = async () => {
      try {
        const response = await requestInstance.get(`${constants.BASE_URL}get-events`, {
          params: {
            amount: 'One',
            eventName: eventName
          },
        });
        const newEvent = response.data.events[0];
        if (newEvent && !Events.some(event => event._id === newEvent._id)) {
          dispatch(setEventsDataAll([...Events, newEvent]));
          setrerun(true)
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event:", error);
        setLoading(false);
      }
    };

    if (!eventData) {
      setLoading(true);
      fetchSingleEvent();
    } else {
      setLoading(false);
    }
  }, [eventData, eventName, Events, dispatch, requestInstance]);

  // Effect for fetching all events
  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const response = await requestInstance.get(`${constants.BASE_URL}get-events`, {
          params: {
            amount: 'All',
            page: currentPage,
            pageSize: pageSize,
          },
        });
        if (response && response.data) {
          const newEvents = response.data.events.filter(event => !Events.some(existingEvent => existingEvent._id === event._id));
          if (newEvents.length > 0) {
            dispatch(setEventsDataAll([...Events, ...newEvents]));
          }
          dispatch(setCurrentPage(response.data.currentPage));
          dispatch(setTotalPages(response.data.totalPages));
          setrerun(false)
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    if (rerun) {
      fetchAllEvents();
    }
  }, [rerun]);

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
