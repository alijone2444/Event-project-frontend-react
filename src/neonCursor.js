import React from 'react';
import AnimatedCursor from 'react-animated-cursor';
import './NeonCursor.css'; // Import custom CSS styles for the neon effect

const NeonCursor = () => {
  return (
    <div className="neon-cursor-container">
      <AnimatedCursor
        innerSize={12} // Customize the size of the inner cursor
        outerSize={24} // Customize the size of the outer cursor
        color="0, 102, 255" // Customize the color of the cursor (e.g., red)
        outerAlpha={0.5} // Customize the transparency of the outer cursor
        innerScale={0.7} // Customize the scaling of the inner cursor
        outerScale={3} // Customize the scaling of the outer cursor
        innerStyle={{border:"1px solid white"}}
        outerStyle={{border:"1px solid white"}}
      />
    </div>
  );
};

export default NeonCursor;
