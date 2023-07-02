import React, { useState } from 'react';
import Lottie from 'lottie-react-web';
import animationData from '../lottie/mylottie.json';
import { useEffect } from 'react';

const MyLottie = (props) => {
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
      />
    </div>
  );
};

export default MyLottie;
