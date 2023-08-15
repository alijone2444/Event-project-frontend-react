import React, { useState } from 'react';
import Lottie from 'lottie-react-web';
import animationData from '../lottie/new_lottie.json';
import { useEffect } from 'react';
import {useMediaQuery} from '@mui/material';

const MyLottie = (props) => {
  const isSmallScreen = useMediaQuery('(max-width: 408px)'); // Adjust the max-width value as needed

  const [isAnimationStopped, setIsAnimationStopped] = useState(false);
    console.log(props)
    useEffect(() => {
        setIsAnimationStopped(props.isAnimationStopped);
      }, [props]);
  return (
    <div>
      <Lottie
        options={{
          animationData: animationData,
          loop: true,
        }}
        isStopped={isAnimationStopped}
      height={300}
      width={300}
      style={{
        position:"absolute",
        top:0,
        left:"50%",
        transform:isSmallScreen?'translate(-50%, -30%)':'translate(-50%, -20%)',
        borderRadius:"50%",
        }}
      />
    </div>
  );
};

export default MyLottie;
