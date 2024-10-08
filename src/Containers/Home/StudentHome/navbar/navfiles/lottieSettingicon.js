import React, { useState } from 'react';
import Lottie from 'lottie-react-web';
import animationData from '../../../../../lottie/lottiesettingicon.json';
import { useEffect } from 'react';

const MySettingIcon = (props) => {
  const [isAnimationStopped, setIsAnimationStopped] = useState(false);
  useEffect(() => {
    setIsAnimationStopped(!isAnimationStopped);
  }, [props.start]);
  return (
    <div>
      <Lottie
        options={{
          animationData: animationData,
          loop: true,
        }}
        isStopped={isAnimationStopped}
        height={50}
        width={50}

      />
    </div>
  );
};

export default MySettingIcon;
