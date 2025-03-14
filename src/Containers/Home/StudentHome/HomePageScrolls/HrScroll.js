import React, { useEffect, useState } from 'react';
import './hrscroll.css';
import { animated, useSpring } from "react-spring";
import { useScroll } from "react-use-gesture";
import Typography from '@mui/material/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { useMediaQuery } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import createAuthenticatedRequest from '../../../../RequestwithHeader';
import constants from '../../../../Constants/constants';
import { useSelector, useDispatch } from 'react-redux';
import { setEventsDataAll } from '../../../../ReduxStore/actions/eventsDataActionUser';
const ScrollingHorizontally = (props) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const dispatch = useDispatch()
  const Events = useSelector((state) => state.userAllEvents);
  useEffect(() => {
    // Your useEffect logic here
  }, [props.data]);

  const [style, set] = useSpring(() => ({
    transform: "perspective(500px) rotateY(0deg)"
  }));

  const isSmallScreen = window.innerWidth < 1000;
  const repeatComponent = new Array(5).fill(null);
  const requestInstance = createAuthenticatedRequest()
  const bind = useScroll((event) => {
    if (isSmallScreen) {
      set({
        transform: `perspective(500px) rotateY(${event.scrolling ? event.delta[0] * 0.3 : 0}deg)`
      });
    } else {
      set({
        transform: `perspective(500px) rotateY(${event.scrolling ? event.delta[0] : 0}deg)`
      });
    }
  });
  const handleDelete = async (eventId) => {
    try {
      const response = await requestInstance.delete(`${constants.BASE_URL}delete-event/${eventId}`);
      if (response.data.success) {
        props.deletesucess();
      } else {
        console.error('Failed to delete event:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div>
      <div className='recent-container'>
        <ArrowForward style={{ fontSize: 40, color: 'black' }} />
        <Typography className='recent' style={{ color: "black" }} variant={props.setSmallHeading ? 'h5' : 'h4'}>
          {props.title}
        </Typography>
      </div>
      <div>
        <Typography
          className='subheader'
          style={{
            color: props.subheaderColor ? 'purple' : 'dodgerblue',
            background: 'white',
            display: 'inline-block',
            marginBottom: '4px'  // Adding some space below the subheader
          }}
          variant='h6'
        >
          {props.subheader}
        </Typography>
        {/* 
        <Divider
          style={{
            background: props.subheaderColor ? 'purple' : 'dodgerblue',
            width: '90%',            // Adjust width for alignment with Typography
            marginLeft: '10%',
            marginBottom: '8px',     // Space between Divider and body text
            marginRight: '10%',
            marginTop: '-15px'
          }}
        /> */}
        <Divider style={{ background: props.subheaderColor ? 'purple' : 'dodgerblue', marginTop: '-15px', marginRight: "10%" }} />

        <Typography
          variant='body1'
          style={{
            marginLeft: '12%',       // Align with Divider width
            marginRight: '10%',
            marginTop: '2%',            // Ensure no additional margin at the top
            marginBottom: '0',
            textAlign: 'center'       // No additional bottom margin
          }}
        >
          {constants[props.DescriptionKey]}
        </Typography>
      </div>
      <div style={{ paddingLeft: "5%" }}>
        <div className="container" {...bind()}>
          {props.data.length !== 0 ? (
            props.data.map((index, i) => (
              <div key={index._id}
                style={{ marginTop: isMobile ? "10px" : `${i % 2 === 0 ? 0 : 20}px`, position: 'relative' }}
                onClick={() => {
                  const { _id, eventName } = index
                  dispatch(setEventsDataAll([...Events, index]))
                    ; navigate(`/eventdetail/${eventName}`, { state: { data: { _id, eventName }, toNavigate: props.toNavigate } })
                }}
              >
                {props.showdel && <IconButton
                  aria-label="delete"
                  style={{ position: 'absolute', top: 30, right: 10, color: 'red', zIndex: 1, backgroundColor: 'rgba(0,0,0,0.6)' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(index._id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>}

                <animated.div
                  className="card"
                  style={{
                    ...style,
                    // backgroundImage: `url(data:image/jpeg;base64,${index.mainImageData})`,

                    backgroundImage: `url(${constants.BASE_URL}images/${index.dpimageFileName})`,
                    cursor: "pointer",
                  }}
                />
                <h3 style={{ textAlign: "center", color: "black" }}>{index.eventName}</h3>
              </div>
            ))
          ) : (
            repeatComponent.map((_, index) => (
              <div style={{ marginTop: isMobile ? "10px" : `${index % 2 === 0 ? 0 : 20}px` }}>
                <div key={index} className="container" {...bind()}>
                  <animated.div
                    className="card"
                    style={{
                      ...style,
                      backgroundImage: null,
                      cursor: "pointer",
                    }}
                  >
                    <Skeleton height={isMobile ? 200 : 400} style={{ marginTop: isMobile ? "10px" : `${_ % 2 === 0 ? 0 : 20}px` }} />
                  </animated.div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ScrollingHorizontally;
