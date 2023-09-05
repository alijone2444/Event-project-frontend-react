import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import WAVES from "vanta/dist/vanta.waves.min.js";

const InteractiveBackground = (props) => {
  const vantaRef = useRef(null);
  console.log(props.gettheme)
  const colorArray = [0x2e70,0x1020f,0x12a0]
  useEffect(() => {
    const vantaEffect = WAVES({
      el: vantaRef.current,
      THREE: THREE,
      mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: colorArray[props.gettheme] || 0x2e70,
        shininess: 150.00,
        waveHeight: 20.50,
        waveSpeed: 0.70,
        zoom: 0.84
    });

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [props.gettheme]);

  return (
    <div>
    <div style={{ height: "100vh",width:'100vw',position:'relative' }} ref={vantaRef}>

    </div>
    </div>
  );
};

export default InteractiveBackground;
