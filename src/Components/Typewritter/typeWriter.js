// LeftDiv.js
import React from 'react';
import './typewriter.css';
import Typewriter from 'typewriter-effect';

function TypewriterEffect() {
  return (
    <div className="left">
      <Typewriter
        options={{
          delay: 30,            // Adjust the delay between each character
          cursorColor: '#00ff00', // Customize the cursor color
          deleteSpeed: 30,      // Adjust the speed of the delete animation
          cursorClassName: 'cursorSize',
          wrapperClassName: 'Typewriter__wrapper'

        }} onInit={(typewriter) => {
          typewriter
            .typeString('<span style="color: #fff; font-size: 55px; font-weight: bolder;">Welcome to EMS</span></br>')
            .pauseFor(500)
            .typeString('<span style="color: #fff; font-size: 40px;">Event Management System of Institute of Space and Technology</span>')
            .pauseFor(1500)
            .deleteChars(60)
            .typeString('<span style="color: #fff; font-size: 40px;">Explore a world of vibrant activities and engaging gatherings.</span>')
            .pauseFor(1500)
            .deleteChars(62)
            .typeString('<span style="color: #fff; font-size: 40px;">Plan, organize, and execute memorable events effortlessly.</span>')
            .pauseFor(1500)
            .deleteChars(59)
            .typeString('<span style="color: #fff; font-size: 40px;">Join us in creating unforgettable moments for every occasion.</span>')
            .pauseFor(1500)
            .deleteChars(61)
            .typeString('<span style="color: #fff; font-size: 40px;">Login to the portal and enjoy amazing events.</span>')
            .pauseFor(1000)
            .start();
        }}

      />

    </div>
  );
}

export default TypewriterEffect;