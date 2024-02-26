
import OpenEvent from "../../Components/OpenEvent/openEvent";
import React from 'react';
import WrapperComponent from '../../FooterAndHeaderwrapper';
import imagePath from '../../images/EventDetails_background_eddited.jpg';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
function EventDetailPage() {
  const { state } = useLocation();
    const eventData = state?.data; 
    
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  const backgroundImage = {
    backgroundImage:`url('data:image/jpeg;base64,${eventData.mainImageData}')`,
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
      <div style={{ position: 'relative', padding: '5%' }}>
        <div style={backgroundImage} />

        <div style={{ position: 'relative', zIndex: 1 }}>
         
          <OpenEvent eventData={eventData}/>

        </div>
      </div>
    </WrapperComponent>
  );
}

export default EventDetailPage;
