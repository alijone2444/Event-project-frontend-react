import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { CircularProgress, Paper } from '@mui/material'

import { Button } from 'antd';
import '../../../../styles/navbar_home.css'
import { makeStyles } from '@mui/styles';
import { useMediaQuery, createTheme } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import createAuthenticatedRequest from '../../../../RequestwithHeader';
import { useDispatch, useSelector } from 'react-redux';
import { setcrouselImagesData } from '../../../../ReduxStore/actions/crouselImagesAction';
import constants from '../../../../Constants/constants';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import ToolbarBelowNavbar from '../../../../Components/ChatbotBar/chatbotToolbar';
import { setEventsDataAll } from '../../../../ReduxStore/actions/eventsDataActionUser';
import { useState } from 'react';
function CarouselComponent(props) {
  const classes = useStyles(); // Use the useStyles hook
  const isSmallScreen = useMediaQuery('(max-width: 600px)'); // Adjust the max-width value as needed
  const CrouselDataFetched = useSelector((state) => state.crouselData);
  const requestInstance = createAuthenticatedRequest()
  const dispatch = useDispatch()
  const [showloading, setshowloading] = useState(false)

  useEffect(() => {
    if (CrouselDataFetched.length === 0) {
      requestInstance
        .get(`${constants.BASE_URL}get-carousel-images`)
        .then(response => {
          dispatch(setcrouselImagesData(response.data));
        })
        .catch(err => {
          console.error('Error:', err);
        });
    }
  }, [dispatch])

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, zIndex: 2, width: '100%' }}>
        <ToolbarBelowNavbar />
      </div>
      <Carousel duration={1000} navButtonsAlwaysVisible={true} height={"95vh"} animation={'slide'} indicatorContainerProps={{
        style: {
          position: "absolute",
          bottom: "0",
          color: "white",
          left: "50%",
          transform: "translate(-50%,0)", // 3
          zIndex: 1 // 5
        }
      }}
        navButtonsWrapperProps={{   // Move the buttons to the bottom. Unsetting top here to override default style.
          style: {
            bottom: isSmallScreen ? '100px' : '50px',
            top: 'unset'
          }
        }}
        indicatorIconButtonProps={{
          ...classes.indicatorIconButtonProps,
          style: {
            ...classes.indicatorIconButtonProps.style,
            marginBottom: isSmallScreen ? '25%' : '5%', // Apply different margin based on screen size
          },
        }}>


        {
          CrouselDataFetched.map((item, i) => <Item key={i} item={item} showloading={showloading} setshowloading={setshowloading} />)
        }
      </Carousel>
    </div>
  )
}

function Item(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setloading] = useState(false)
  const Events = useSelector((state) => state.userAllEvents);
  const getParticularEvent = async (eventname) => {
    const requestInstance = createAuthenticatedRequest()
    try {
      setloading(true)
      props.setshowloading(true)
      const response = await requestInstance.get(`${constants.BASE_URL}get-events`, {
        params: {
          amount: 'One',
          eventName: eventname
        },

      })
      if (response && response.data) {
        dispatch(setEventsDataAll([...Events, response.data.events[0]]))
        props.setshowloading(false)
        const { _id, eventName } = response.data.events[0]
        navigate(`/eventdetail/${eventName}`, { state: { data: { _id, eventName }, toNavigate: '/Home' } });
        setloading(false)
      }
    }
    catch (error) {
      console.error('Error fetching events:', error);
      props.setshowloading(false)
      setloading(false)
    }
  }
  const Loader = () => (
    <div style={{ textAlign: 'center', marginTop: 16 }}>
      <Spin size="large" />
    </div>
  );
  console.log('props item', props.item)
  const isSmallScreen = useMediaQuery('(max-width: 600px)'); // Adjust the max-width value as needed
  return (
    <Paper style={{ height: isSmallScreen ? "90vh" : '95vh' }} >
      <div style={{ position: "relative" }}>
        {props.item ? <img
          src={`${constants.BASE_URL}${props.item.path}${props.item.dpimageFileName}`}
          alt='.'
          style={{
            height: isSmallScreen ? "90vh" : '95vh',
            width: "100%",
            objectFit: "cover",
          }}
        />
          :
          <Skeleton height={isSmallScreen ? "90vh" : '95vh'} />}
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: isSmallScreen ? "90vh" : '95vh',
          background: "rgba(0, 0, 0, 0.5)", // Adjust the opacity as desired
        }}
      ></div>
      <div style={{
        position: "absolute", top: isSmallScreen ? "35%" : "40%", left: "50%", transform: "translate(-50%,-40%)", width: "70%",
        display: "flex", justifyContent: "center", flexDirection: "column"
      }}>
        <h3 style={{ textAlign: "Center", color: "rgba(255,255,255,0.9)", marginTop: 0 }}>{props.item.subheader}</h3>
        <p
          style={{
            textAlign: "center",
            color: "rgba(255,255,255,0.9)",
            marginTop: 0,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            overflow: "hidden",
          }}
        >
          {props.item.description}
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button className="CheckButton" style={{ backgroundColor: "#f4373a", color: "white", maxWidth: "150px" }}
            onClick={() => {
              getParticularEvent(props.item.eventName)
            }}>
            Check it out!  {loading && <CircularProgress style={{ color: 'white', marginLeft: 8 }} size={15} />}
          </Button></div>
      </div>
      {props.showloading && <Loader />}
    </Paper>
  )
}
const useStyles = makeStyles((theme) => ({
  // Your other styles...
  indicatorIconButtonProps: {
    style: {
      padding: '2px',
      marginBottom: '10%', // Default value for bigger screens
    },
  },
  // Your other styles...
}));
export default CarouselComponent;