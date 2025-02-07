import React, { useState, useEffect } from "react";
import ImageMapper from "react-image-mapper";

const IcogramsMap = () => {
    const [text, setText] = useState('')
    useEffect(() => {
        window.addEventListener("message", (event) => {
            console.log("Message received:", event.data);
        });

        return () => {
            window.removeEventListener("message", (event) => {
                console.log("Message removed:", event.data);
            });
        };
    }, []);

    // Define clickable areas (adjust coordinates according to your PNG map)
    const MAP = {
        name: "university-map",
        areas: [
            { name: "Library", shape: "rect", coords: [50, 60, 200, 150], preFillColor: "rgba(255,0,0,0.3)" },
            { name: "Block A", shape: "rect", coords: [220, 80, 350, 200], preFillColor: "rgba(0,255,0,0.3)" },
            { name: "Cafeteria", shape: "rect", coords: [400, 150, 550, 250], preFillColor: "rgba(0,0,255,0.3)" }
        ]
    };

    // Function to handle click events on the map
    const handleClick = (area) => {
        console.log("Clicked location:", area.name);
        setText(area.name)
    };

    return (
        <div>
            <h2>University Map</h2>
            <ImageMapper
                src="/icogram.png"
                map={MAP}
                width={800}
                onClick={handleClick}
            />
            <div style={{ width: '100%', textAlign: 'center' }}>
                <h5>{text}</h5>
            </div>
        </div>
    );
};

export default IcogramsMap;
