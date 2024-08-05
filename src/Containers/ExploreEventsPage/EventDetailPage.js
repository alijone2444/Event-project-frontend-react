
import OpenEvent from "../../Components/OpenEvent/openEvent";
import React from 'react';
import WrapperComponent from '../../FooterAndHeaderwrapper';
import imagePath from '../../images/EventDetails_background_eddited.jpg';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import AppBarComponent from "../../Components/SubAppbar/appbar";
import { useNavigate } from "react-router-dom";
import constants from "../../Constants/constants";
import { useMediaQuery } from "@mui/material";

function EventDetailPage() {
  const { state } = useLocation();
  const eventData = state?.data;
  const navigate = useNavigate()
  const ismobile = useMediaQuery('(max-width:600px)')
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  const backgroundImage = {
    backgroundImage: `url(${constants.BASE_URL}images/${eventData.dpimageFileName})`,
    backgroundSize: 'cover',
    filter: 'blur(30px)',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    zIndex: -1,
  }
  return (
    <WrapperComponent>
      <AppBarComponent title={'Back'} onBackButtonClick={() => { navigate(state.toNavigate) }} />
      <div style={{
        position: 'relative', backgroundColor: 'rgba(0,0,0,0.2)', padding: '5%', paddingTop: ismobile ? '5%' : '2%'
      }}>
        < div style={backgroundImage} />
        <div style={{ position: 'relative', zIndex: 1 }}>

          <OpenEvent eventData={eventData} />

        </div>
      </div>
    </WrapperComponent >
  );
}

export default EventDetailPage;
