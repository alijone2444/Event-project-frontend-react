import { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { useMediaQuery } from '@mui/material';

import Image1 from '../images/ist.jpg';
import Image2 from '../images/event.jpg';
import Image3 from '../images/event_game.png';

const useStyles = makeStyles((theme) => ({
  card: {
  height: '96vh',
  background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 0%, rgba(234, 246, 255, 1) 70%, rgba(234, 246, 255, 1) 100%, rgba(255, 255, 255, 0.3) 100%)',
  border: '5% solid white',
  borderRight: 'none',

  },
  media: {
    paddingTop: '10%',
    paddingLeft: '10%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '70vh',
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
    borderRadius: '50%',
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
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const images = [Image1, Image2, Image3];

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
