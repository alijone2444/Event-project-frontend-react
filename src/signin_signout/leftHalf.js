import { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { useMediaQuery } from '@mui/material';

import Image1 from '../images/undraw_login.png';
import Image2 from '../images/event.jpg';
import Image3 from '../images/event_game.png';
import Image4 from '../images/undraw_login2.png';
import Image5 from '../images/undraw_login3.png';
const useStyles = makeStyles((theme) => ({
  card: {
  border: '5% solid white',
  borderRight: 'none',
    paddingLeft:"5%"
  },
  media: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '90vh',
    position: 'relative',
  },
  slideContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    top: '0.9rem',
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    transition: 'opacity 0.5s ease-in-out',
    objectFit: 'cover',
    borderRadius: '5% 5% 10% 10%',
    border: '1px solid 0000',
  },
  activeImage: {
    opacity: 1,
  },
  dotContainer: {
    position: 'absolute',
    bottom: '2%',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: '20%',
    margin: '0 5px',
    backgroundColor: '#c4c4c4',
    cursor: 'pointer',
    transition: 'background-color 0.5s ease-in-out',
  },
  activeDot: {
    backgroundColor: '#808080',
  },
}));

function Logindisplay() {

  const classes = useStyles();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isMobile = useMediaQuery('(max-width:900px)');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 5);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const images = [Image1, Image2, Image3,Image4,Image5];

  return (
    <div>
      <div className={classes.card}>
        {!isMobile && (
          <div className={classes.media}>
            <div className={classes.slideContainer}>
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt='.'
                  className={`${classes.image} ${currentImageIndex === index ? classes.activeImage : ''}`}
                />
              ))}
            </div>
            <div className={classes.dotContainer}>
              {images.map((image, index) => (
                <span
                  key={index}
                  className={`${classes.dot} ${currentImageIndex === index ? classes.activeDot : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Logindisplay;
