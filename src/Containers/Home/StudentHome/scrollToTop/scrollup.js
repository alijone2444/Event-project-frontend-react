import React, { useState, useEffect } from 'react';
import './scrollup.css';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import { Button } from 'antd';
function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button
      className={`scroll-to-top-button ${isVisible ? 'active' : ''}`}
      onClick={scrollToTop}
      title="Scroll to Top"
      style={{display:"flex",justifyContent:"center",alignItems:"center"}}
    >
      <KeyboardDoubleArrowUpRoundedIcon/>
    </Button>
  );
}

export default ScrollToTopButton;
