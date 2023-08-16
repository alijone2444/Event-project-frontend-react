import React, { useEffect, useState } from 'react';
import './hrscroll.css'
import { animated, useSpring } from "react-spring";
import { useScroll } from "react-use-gesture";
import Typography from '@mui/material/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';

const ScrollingHorizontally = (props) => {
  const navigate = useNavigate();
    useEffect(()=>{

    },props.data)
      const [style, set] = useSpring(() => ({
        transform: "perspective(500px) rotateY(0deg)"
      }));
      const isSmallScreen = window.innerWidth < 1000; // Adjust the threshold as needed
      const bind = useScroll((event) => {
        if (isSmallScreen) {
          set({
            transform: `perspective(500px) rotateY(${
              event.scrolling ? event.delta[0] * 0.3 : 0
            }deg)`,
          });
        } else {
          set({
            transform: `perspective(500px) rotateY(${
              event.scrolling ? event.delta[0] : 0
            }deg)`,
          });
        }
      });
//   const handleImageClick=(index)=>{

//     history.push({
//       pathname: `/products/${index.title.replace(/\s/g, '-').toLowerCase()}`,
//       state: { data: index }
//     });  
//   }
return (
  <div>
    <div className='recent-container'>
      <ArrowForward style={{ fontSize: 40, color: 'black' }}/>
      <Typography className='recent' style={{color:"black"}} variant='h4'>
        {props.title}
      </Typography>
    </div>
    <div >
      <Typography
        className='subheader'
        style={{ color: 'DodgerBlue',background:"white", display: 'inline-block'}}
        variant='h6'
      >
        {props.subheader}
      </Typography>
      <Divider style={{ background: 'dodgerblue', marginTop: '-15px' ,marginRight:"10%"}} />
    </div>
    <div style={{paddingLeft:"5%"}}>
      <div className="container" {...bind()}>
        {props.data ? (
          props.data.map((index, i) => (
            <div key={index.image} style={{ marginTop: `${i % 2 === 0 ? 20 : 0}px` }}>
                <animated.div
                className="card"
                style={{
                  ...style,
                  backgroundImage: `url(${index.image})`,
                  cursor: "pointer",
                }}
              />
              <h3 style={{ textAlign: "center", color: "black" }}>{index.title}</h3>
            </div>
          ))
        ) : (
          <div style={{ display: "flex", justifyContent: "center"}}>
            <CircularProgress style={{ color: "yellow" }} />
          </div>
        )}
      </div>
    </div>
  </div>
);
};
export default ScrollingHorizontally;
