import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { CircularProgress } from "@mui/material";

import useMediaQuery from '@mui/material/useMediaQuery';
const CameraComponent = ({ onfinish }) => {
    const [model, setModel] = useState(null);
    const [highestDetection, setHighestDetection] = useState(null);
    const [croppedImages, setCroppedImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingText, setLoadingText] = useState("Loading Camera... Please wait."); // Loading text

    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const [progress, setProgress] = useState(0);
    const videoRef = useRef(null);
    const animationFrameId = useRef(null);
    const [boxDetails, setBoxDetails] = useState({
        xCenter: 0,
        yCenter: 0,
        width: 0,
        height: 0,
        scaledX: 0,
        scaledY: 0,
        scaledWidth: 0,
        scaledHeight: 0,
        Score: 0
    });
    const ClassNames = ["studentCard", "notstudentCard"];

    useEffect(() => {
        const loadModel = async () => {
            setLoading(true)
            setLoadingText('loading model please wait')
            console.log('loading model');
            const loadedModel = await tf.loadGraphModel("/model/model.json");
            setModel(loadedModel);
            setLoading(false)
            console.log('loaded model');
        };
        loadModel();
    }, []);

    useEffect(() => {
        const setupCamera = async () => {
            try {
                setLoading(true);

                setLoadingText('loading camera please wait')
                const constraints = {
                    video: { facingMode: "environment" },
                };
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.onloadedmetadata = () => {
                        setLoading(false);
                    };
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
                setLoading(false);
            }
        };
        setupCamera();

        return () => {
            if (videoRef.current?.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach((track) => track.stop());
            }
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    const detectObjects = async () => {
        if (!model || !videoRef.current) return;

        const videoElement = videoRef.current;
        if (videoElement.videoWidth === 0 || videoElement.videoHeight === 0) return;

        const img = tf.browser.fromPixels(videoElement);
        const resizedImg = tf.image.resizeBilinear(img, [640, 640]);
        const inputTensor = resizedImg.expandDims(0).toFloat().div(255.0);

        const predictions = await model.predict(inputTensor);
        const predictionArray = predictions.arraySync()[0];

        let highestDetection = null;
        predictionArray.forEach(([xCenter, yCenter, width, height, confidence, ...classProbs]) => {
            const classId = classProbs.indexOf(Math.max(...classProbs));
            if (!highestDetection || confidence > highestDetection.score) {
                highestDetection = { box: [xCenter, yCenter, width, height], score: confidence, classId, className: ClassNames[classId] };
            }
        });

        setHighestDetection(highestDetection);

        if (highestDetection) {
            const [xCenter, yCenter, width, height] = highestDetection.box;

            // Scaling the coordinates to match the video frame dimensions
            const scaledX = (xCenter - width / 2) * videoElement.videoWidth;
            const scaledY = (yCenter - height / 2) * videoElement.videoHeight;
            const scaledWidth = width * videoElement.videoWidth;
            const scaledHeight = height * videoElement.videoHeight;
            const Score = highestDetection.score
            setBoxDetails({
                xCenter,
                yCenter,
                width,
                height,
                scaledX,
                scaledY,
                scaledWidth,
                scaledHeight,
                Score
            });

            // Create an invisible canvas to crop the video frame
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = scaledWidth;
            canvas.height = scaledHeight;

            // Draw the cropped video frame on the canvas
            ctx.drawImage(videoElement, scaledX, scaledY, scaledWidth, scaledHeight, 0, 0, scaledWidth, scaledHeight);

            // Get the cropped image as a Data URL
            const croppedImageUrl = canvas.toDataURL("image/jpeg", 1.0);

            if (highestDetection.score > 0.9) {
                setCroppedImages((prev) => {
                    const updatedImages = [...prev, croppedImageUrl];
                    const progressPercentage = (updatedImages.length / 10) * 100;
                    setProgress(progressPercentage);
                    if (updatedImages.length >= 10) {
                        onfinish(updatedImages);
                    }
                    return updatedImages;
                });
            }
        }
        tf.dispose([img, resizedImg, inputTensor]);
    };

    useEffect(() => {
        const detectLoop = () => {
            detectObjects();
            animationFrameId.current = requestAnimationFrame(detectLoop);
        };

        if (model) detectLoop();

        return () => {
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        };
    }, [model]);

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "black",
                zIndex: 9999,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {/* Close Button */}
            <button
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    fontSize: "18px",
                    cursor: "pointer",
                    zIndex: 1000,
                }}
                onClick={() => onfinish(croppedImages)}
            >
                ×
            </button>

            {/* Video Container */}
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "640px",
                    height: "auto",
                    backgroundColor: "black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "contain",
                    }}
                />
                {loading && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.8)", // Black overlay with transparency
                            zIndex: 9999,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column", // Stack elements vertically
                        }}
                    >
                        <div style={{ textAlign: "center", color: "white", fontSize: "20px" }}>
                            <p>{loadingText}</p>
                            <CircularProgress style={{ color: "white", marginBottom: "10px" }} />
                        </div>
                    </div>
                )}


                {/* Boundary for card placement */}
                <div
                    style={{
                        position: "absolute",
                        top: "30%",
                        left: "20%",
                        width: "60%",
                        height: isSmallScreen ? "40%" : '50%',
                        border: "2px dashed white",
                        zIndex: 1001,
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            bottom: "10px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            color: "white",
                            fontSize: "14px",
                            textAlign: "center",
                        }}
                    >
                        Place Card Here
                    </div>
                </div>

                {/* Dynamic Bounding Box */}
                {/* Dynamic Bounding Box */}
                {highestDetection && (
                    <>
                        {/* Display the score percentage above the bounding box */}
                        <div
                            style={{
                                position: "absolute",
                                top: `${(boxDetails.scaledY / videoRef.current?.videoHeight) * 100}%`, // Percentage of video height
                                left: `${(boxDetails.scaledX / videoRef.current?.videoWidth) * 100}%`, // Percentage of video width
                                zIndex: 1001, // Higher z-index than the bounding box to appear above it
                                color: boxDetails.Score > 0.9 ? "lightgreen" : "red",
                                fontSize: "16px",
                                fontWeight: "bold",
                                backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: to make the text more readable
                                padding: "2px 5px",
                                borderRadius: "4px",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {Math.round(boxDetails.Score * 100)}% {/* Display the score as a percentage */}
                        </div>

                        {/* Bounding box */}
                        <div
                            style={{
                                position: "absolute",
                                top: `${(boxDetails.scaledY / videoRef.current?.videoHeight) * 100}%`, // Percentage of video height
                                left: `${(boxDetails.scaledX / videoRef.current?.videoWidth) * 100}%`, // Percentage of video width
                                width: `${(boxDetails.scaledWidth / videoRef.current?.videoWidth) * 100}%`, // Percentage of video width
                                height: `${(boxDetails.scaledHeight / videoRef.current?.videoHeight) * 100}%`, // Percentage of video height
                                border: `2px solid ${boxDetails.Score > 0.9 ? "lightgreen" : "red"}`, // Corrected the property 'Score' to 'score'
                                zIndex: 1000,
                            }}
                        ></div>
                    </>
                )}

            </div>

            {/* Progress Bar */}
            <div
                style={{
                    position: "absolute",
                    bottom: "10%",
                    color: "white",
                    fontSize: "20px",
                    textAlign: "center",
                }}
            >
                <div>
                    {croppedImages.length < 10
                        ? `Scanning ${croppedImages.length}/10 items... Please wait.`
                        : "Scanning complete! Processing results..."}
                </div>
            </div>
        </div>
    );
};

export default CameraComponent;
