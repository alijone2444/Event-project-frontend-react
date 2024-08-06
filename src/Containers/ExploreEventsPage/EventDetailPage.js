import OpenEvent from "../../Components/OpenEvent/openEvent";
import React, { useEffect, } from 'react';
import WrapperComponent from '../../FooterAndHeaderwrapper';
import { useLocation } from "react-router-dom";
import AppBarComponent from "../../Components/SubAppbar/appbar";
import { useNavigate } from "react-router-dom";
import constants from "../../Constants/constants";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
function EventDetailPage() {
  const { state } = useLocation();
  const id = state?.data;
  const Events = useSelector((state) => state.userAllEvents);
  const eventData = Events.find((event) => event._id === id);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');


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
        {eventData ? (
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
            <CircularProgress />
          </Box>
        )}
      </div>
    </WrapperComponent>
  );
}

export default EventDetailPage;
