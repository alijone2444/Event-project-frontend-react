import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import FOG from "vanta/dist/vanta.fog.min.js";

const VantaBackground = () => {
    const vantaRef = useRef(null);

    useEffect(() => {
        const vantaEffect = FOG({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            highlightColor: 0xff0000,
            midtoneColor: 0x83ff,
            lowlightColor: 0x0,
            baseColor: 0xfaffff,
            blurFactor: 0.52,
            speed: 1.20,
            zoom: 1.90
        });

        return () => {
            if (vantaEffect) {
                vantaEffect.destroy();
            }
        };
    }, []);

    return (
        <div >
            <div style={{ height: "90vh", position: "relative", zIndex: -1 }} ref={vantaRef}></div>
        </div>
    );
};

export default VantaBackground;
