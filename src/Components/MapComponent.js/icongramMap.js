import React, { useState, useRef } from "react";
import ImageMapper from "react-image-mapper";
import { IconButton, Typography } from "@mui/material";
import { ZoomIn, ZoomOut, ArrowDownward } from "@mui/icons-material";

const IcogramsMap = (props) => {
    const [text, setText] = useState("");
    const [scale, setScale] = useState(1);
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const mapContainerRef = useRef(null);
    const [showLegend, setShowLegend] = useState(false);


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
        setText(area.name);
        props.getlocation(area.name)
    };

    const handleZoom = (newScale, clientX, clientY) => {
        if (!mapContainerRef.current) return;
        const rect = mapContainerRef.current.getBoundingClientRect();
        const offsetX = clientX - rect.left;
        const offsetY = clientY - rect.top;
        const newTranslateX = (offsetX - rect.width / 2) * (newScale - scale);
        const newTranslateY = (offsetY - rect.height / 2) * (newScale - scale);
        setTranslateX(translateX - newTranslateX);
        setTranslateY(translateY - newTranslateY);
        setScale(newScale);
    };

    const zoomIn = (event) => handleZoom(Math.min(scale + 0.2, 2), event.clientX, event.clientY);
    const zoomOut = (event) => handleZoom(Math.max(scale - 0.2, 0.5), event.clientX, event.clientY);

    // Mouse Events for Dragging
    const handleMouseDown = (event) => {
        setIsDragging(true);
        setStartX(event.clientX - translateX);
        setStartY(event.clientY - translateY);
    };

    const handleMouseMove = (event) => {
        if (!isDragging) return;
        setTranslateX(event.clientX - startX);
        setTranslateY(event.clientY - startY);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Touch Events for Dragging (Mobile)
    const handleTouchStart = (event) => {
        const touch = event.touches[0];
        setIsDragging(true);
        setStartX(touch.clientX - translateX);
        setStartY(touch.clientY - translateY);
    };

    const handleTouchMove = (event) => {
        if (!isDragging) return;
        const touch = event.touches[0];
        setTranslateX(touch.clientX - startX);
        setTranslateY(touch.clientY - startY);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    return (
        <div
            style={{
                width: "100%",
                margin: "auto",
                marginTop: "20px",
                border: "1px solid dodgerblue",
                borderRadius: "10px",
                position: "relative",
                padding:'2%'
            }}
        >
        <Typography variant="h6" align="center">
  University Map
</Typography>

            {/* Legend Toggle Button for Mobile */}
            <IconButton
                onClick={() => setShowLegend(!showLegend)}
                style={{
                    backgroundColor: "#fff",
                    position: "absolute",
                    top: "0",
                    right: "0",
                    display: window.innerWidth <= 768 ? "flex" : "none",
                    zIndex: 1,
                    flexDirection: "column",
                }}
            >
                <span style={{ fontSize: 12, fontWeight: "bold" }}>Legend</span>
                <ArrowDownward />
            </IconButton>

            <div
                ref={mapContainerRef}
                style={{
                    width: "100%",
                    height: "70vh",
                    overflow: "hidden",
                    position: "relative",
                    border: "1px solid dodgerblue",
                    borderBottom:0,
                    cursor: isDragging ? "grabbing" : "grab",
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    style={{
                        transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
                        transformOrigin: "center center",
                    }}
                >
                    <ImageMapper src="/icogram.jpeg" map={MAP} width={800} onClick={handleClick} />
                </div>

                {/* Zoom Buttons */}
                <div style={{ position: "absolute", bottom: "10px", right: "10px", display: "flex", flexDirection: "column" }}>
                    <IconButton onClick={zoomIn} style={{ backgroundColor: "#fff", marginBottom: "5px" }}>
                        <ZoomIn />
                    </IconButton>
                    <IconButton onClick={zoomOut} style={{ backgroundColor: "#fff" }}>
                        <ZoomOut />
                    </IconButton>
                </div>
            </div>
            <div style={{ 
    position: 'absolute', 
    bottom: '0', 
    left: '50%', 
    transform: 'translateX(-50%)', 
    background: 'dodgerblue', 
    padding: '5px 10px', 
    color: 'white',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
}}>
    {text ? (
        <>
            <span style={{ fontSize: '18px' }}>✅</span>
            <h4 style={{ margin: 0 }}>{text}</h4>
        </>
    ) : (
        <h4 style={{ margin: 0 }}>Click on a location to see details</h4>
    )}
</div>

            {/* Legend */}
            <div
                style={{
                    position: "absolute",
                    top:  "10%",
                    right: "10px",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid grey",
                    maxHeight: "300px",
                    overflowY: "auto",
                    display: window.innerWidth <= 768 ? (showLegend ? "block" : "none") : "block",
                    transition: "0.3s ease-in-out",
                    zIndex: 1,
                }}
            >
                <h3>Legend</h3>
                {MAP.areas.map((area, index) => (
                    <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                        <div
                            style={{
                                width: "20px",
                                height: "20px",
                                backgroundColor: area.preFillColor,
                                marginRight: "10px",
                                border: "1px solid black",
                            }}
                        ></div>
                        <span>{area.name}</span>
                    </div>
                ))}

            </div>

        </div>
    );
};

export default IcogramsMap;
