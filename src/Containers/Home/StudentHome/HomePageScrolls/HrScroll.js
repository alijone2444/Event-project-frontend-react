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

const ScrollingHorizontally = (props) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)'); // Adjust the max-width value as needed

  useEffect(() => {
    // Your useEffect logic here
  }, [props.data]); // Corrected brackets around props.data

  const [style, set] = useSpring(() => ({
    transform: "perspective(500px) rotateY(0deg)"
  }));

  const isSmallScreen = window.innerWidth < 1000; // Adjust the threshold as needed
  const repeatComponent = new Array(5).fill(null);

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

  return (
    <div>
      <div className='recent-container'>
        <ArrowForward style={{ fontSize: 40, color: 'black' }} />
        <Typography className='recent' style={{ color: "black" }} variant='h4'>
          {props.title}
        </Typography>
      </div>
      <div>
        <Typography
          className='subheader'
          style={{ color: 'DodgerBlue', background: "white", display: 'inline-block' }}
          variant='h6'
        >
          {props.subheader}
        </Typography>
        <Divider style={{ background: 'dodgerblue', marginTop: '-15px', marginRight: "10%" }} />
      </div>
      <div style={{ paddingLeft: "5%" }}>
        <div className="container" {...bind()}>
          {props.data.length !== 0 ? (
            props.data.map((index, i) => (
              <div key={index._id}
                style={{ marginTop: isMobile ? "10px" : `${i % 2 === 0 ? 0 : 20}px` }}
                onClick={() => navigate(`/eventdetail/${index.eventName}`, { state: { data: index, toNavigate: '/Home' } })}
              >
                <animated.div
                  className="card"
                  style={{
                    ...style,
                    backgroundImage: `url(data:image/jpeg;base64,${index.mainImageData})`,
                    cursor: "pointer",
                  }}
                />
                <h3 style={{ textAlign: "center", color: "black" }}>{index.eventName}</h3>
              </div>
            ))
          ) : (
            // Show skeleton placeholders instead of CircularProgress
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
