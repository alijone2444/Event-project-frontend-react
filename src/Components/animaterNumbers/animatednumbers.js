import React from "react";
import AnimatedNumbers from "react-animated-numbers";
import "./App.css";

function AnimationNumbers() {
    const [num, setNum] = React.useState(331231);
    return (
        <div className="container">
            <AnimatedNumbers
                includeComma
                className={styles.container}
                transitions={(index) => ({
                    type: "spring",
                    duration: index + 0.3,
                })}
                animateToNumber={number}
                fontStyle={{
                    fontSize: 40,
                    color: "red",
                }}
            />
            <div>
                <button onClick={() => setNum((state) => state + 31234)}>+</button>
                <button onClick={() => setNum((state) => state - 31234)}>-</button>
            </div>
        </div>
    );
}

export default AnimationNumbers;