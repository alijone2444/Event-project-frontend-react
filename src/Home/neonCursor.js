import React from 'react';
import AnimatedCursor from 'react-animated-cursor';
import './NeonCursor.css'; // Import custom CSS styles for the neon effect

const NeonCursor = () => {
  return (
    <div className="neon-cursor-container">
      <AnimatedCursor
        innerSize={12} // Customize the size of the inner cursor
        outerSize={24} // Customize the size of the outer cursor
        color="11, 137, 247" // Customize the color of the cursor (e.g., red)
        outerAlpha={0.5} // Customize the transparency of the outer cursor
        innerScale={0.7} // Customize the scaling of the inner cursor
        outerScale={3} // Customize the scaling of the outer cursor
      />
      {/* Add any content or components you want to apply the neon effect to */}
      <div className="neon-effect">
        <h1>Neon Cursor</h1>
        <p>Move the cursor around the screen</p>
      </div>
    </div>
  );
};

export default NeonCursor;
