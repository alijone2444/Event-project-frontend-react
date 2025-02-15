import React, { useState, useEffect, useRef } from "react";
import ImageMapper from "react-image-mapper";

const IcogramsMap = () => {
    const [text, setText] = useState('');
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [start, setStart] = useState({ x: 0, y: 0 });
    const mapContainerRef = useRef(null);

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
  const MAP = {
    name: "university-map",
    areas: [
        { name: "Mess & Library", shape: "rect", coords: [240, 123, 322, 166], preFillColor: "rgba(255,0,0,0.3)" },
        { name: "Girls Hostel", shape: "rect", coords: [10, 129, 78, 190], preFillColor: "rgba(0,255,0,0.3)" },
        { name: "Boys Hostel", shape: "rect", coords: [201, 11, 361, 69], preFillColor: "rgba(0,0,255,0.3)" },
        { name: "ACM", shape: "rect", coords: [562, 76, 660, 115], preFillColor: "rgba(255,165,0,0.3)" },
        { name: "Block 6", shape: "rect", coords: [523, 157, 690, 258], preFillColor: "rgba(255,0,255,0.3)" },
        { name: "Block 2", shape: "rect", coords: [135, 212, 231, 247], preFillColor: "rgba(255,0,255,0.3)" },
        { name: "Raza Block", shape: "rect", coords: [266, 276, 360, 318], preFillColor: "rgba(0,255,255,0.3)" },
        { name: "Basket ball Court", shape: "rect", coords: [85, 172, 140, 197], preFillColor: "rgba(255,255,0,0.3)" },
        { name: "Mosque", shape: "rect", coords: [50,254, 125, 296], preFillColor: "rgba(255,255,0,0.3)" },
        { name: "DHA", shape: "rect", coords: [18, 13, 126, 66], preFillColor: "rgba(255,255,0,0.3)" },
        { name: "Canteen 1", shape: "rect", coords: [445, 154, 466, 173], preFillColor: "rgba(255,255,0,0.3)" },
        { name: "Canteen 2", shape: "rect", coords: [323, 224, 341, 257], preFillColor: "rgba(255,255,0,0.3)" },
        { name: "Bookshop", shape: "rect", coords: [422, 174, 456, 195], preFillColor: "rgba(128,0,128,0.3)" },
        { name: "Block 3", shape: "rect", coords: [280, 190, 320, 240], preFillColor: "rgba(0,128,128,0.3)" },
        { name: "Block 7", shape: "rect", coords: [733, 113, 796, 199], preFillColor: "rgba(128,128,0,0.3)" },
        { name: "Football Ground", shape: "rect", coords: [84,81, 204, 121], preFillColor: "rgba(0,0,0,0.3)" },
        { name: "Teacher Hostel", shape: "rect", coords: [164,131, 230, 190], preFillColor: "rgba(0,0,0,0.3)" },
        { name: "SPARCO", shape: "rect", coords: [26, 343, 89, 387], preFillColor: "rgba(0,0,0,0.3)" },
        { name: "Nursery", shape: "rect", coords: [372, 0, 403, 13], preFillColor: "rgba(0,0,0,0.3)" }
    ,    { name: "Mechanical Lab", shape: "rect", coords: [536, 340, 641, 400], preFillColor: "rgba(0,0,0,0.3)" }
    ]
};

    const handleClick = (area) => {
        console.log("Clicked location:", area.name);
        setText(area.name);
    };

    const handleWheel = (e) => {
        e.preventDefault();
        setScale((prevScale) => Math.min(Math.max(prevScale + e.deltaY * -0.001, 0.5), 2));
    };

    const handleMouseDown = (e) => {
        setDragging(true);
        setStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;
        setPosition({ x: e.clientX - start.x, y: e.clientY - start.y });
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    return (
        <div style={{ marginLeft: '10%' }}>
            <h2>University Map</h2>
            <div
                ref={mapContainerRef}
                style={{
                    width: '80vw',
                    height: '70vh',
                    overflow: 'hidden',
                    position: 'relative',
                        border:'2px solid grey', 
                    cursor: dragging ? 'grabbing' : 'grab',
                }}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                <div
                    style={{
                        transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                        transformOrigin: 'top left',
                    }}
                >
                    <ImageMapper
                        src="/icogram.jpeg"
                        map={MAP}
                        width={800}
                        onClick={handleClick}
                    />
                </div>
            </div>
            <div style={{ width: '100%', textAlign: 'center' }}>
                <h5>{text}</h5>
            </div>
        </div>
    );
};

export default IcogramsMap;