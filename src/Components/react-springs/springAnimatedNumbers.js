import React from "react";
import { useSpring, animated } from "react-spring";
import "./springstyles.css";

export default function SpringAnimatedNums({ num1, num2, num3, Label1, Label2, Label3 }) {
  // Create spring animations for each number with slow animation configuration
  const springConfig = { duration: 2000 }; // Adjust duration as needed

  const springNum1 = useSpring({
    number: num1,
    from: { number: 0 },
    config: springConfig
  });
  const springNum2 = useSpring({
    number: num2,
    from: { number: 0 },
    config: springConfig
  });
  const springNum3 = useSpring({
    number: num3,
    from: { number: 0 },
    config: springConfig
  });

  return (
    <div className="numbers-container">
      <div className="number-container">
        <animated.div
          className="number"
          style={{
            transform: springNum1.number
              .to((n) => n % 1)
              .to({
                range: [0, 0.5, 1],
                output: [1, 1.25, 1]
              })
          }}
        >
          {springNum1.number.to((x) => Math.round(x))}
        </animated.div>
        <div className="label">{Label1}</div>
      </div>
      <div className="number-container">
        <animated.div
          className="number"
          style={{
            transform: springNum2.number
              .to((n) => n % 1)
              .to({
                range: [0, 0.5, 1],
                output: [1, 1.25, 1]
              })
          }}
        >
          {springNum2.number.to((x) => Math.round(x))}
        </animated.div>
        <div className="label">{Label2}</div>
      </div>
      <div className="number-container">
        <animated.div
          className="number"
          style={{
            transform: springNum3.number
              .to((n) => n % 1)
              .to({
                range: [0, 0.5, 1],
                output: [1, 1.25, 1]
              })
          }}
        >
          {springNum3.number.to((x) => Math.round(x))}
        </animated.div>
        <div className="label">{Label3}</div>
      </div>
    </div>
  );
}
