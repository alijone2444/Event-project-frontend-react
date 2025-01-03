import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";


const CameraComponent = ({ onfinish }) => {
    const [model, setModel] = useState(null);
    const [highestDetection, setHighestDetection] = useState(null);
    const [croppedImages, setCroppedImages] = useState([]);
    const [progress, setProgress] = useState(0); // Track progress percentage
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const animationFrameId = useRef(null);

    const ClassNames = ["studentCard", "notstudentCard"];

    useEffect(() => {
        const loadModel = async () => {
            const loadedModel = await tf.loadGraphModel("/model/model.json");
            setModel(loadedModel);
        };
        loadModel();
    }, []);

    useEffect(() => {
        const setupCamera = async () => {
            try {
                const constraints = {
                    video: { width: 640, height: 480, facingMode: "environment" },
                };
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
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

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

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

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        if (highestDetection) {
            const [xCenter, yCenter, width, height] = highestDetection.box;
            const scaledX = (xCenter - width / 2) * canvas.width;
            const scaledY = (yCenter - height / 2) * canvas.height;
            const scaledWidth = width * canvas.width;
            const scaledHeight = height * canvas.height;

            ctx.strokeStyle = highestDetection.score > 0.9 ? "lightgreen" : "red";
            ctx.lineWidth = 2;
            ctx.strokeRect(scaledX, scaledY, scaledWidth, scaledHeight);

            ctx.fillStyle = highestDetection.score > 0.9 ? "lightgreen" : "red";
            ctx.font = "16px Arial";
            const label = `${highestDetection.className} (${(highestDetection.score * 100).toFixed(2)}%)`;
            ctx.fillText(label, scaledX, scaledY > 10 ? scaledY - 10 : 10);

            const croppedCanvas = document.createElement("canvas");
            const croppedCtx = croppedCanvas.getContext("2d");
            croppedCanvas.width = scaledWidth;
            croppedCanvas.height = scaledHeight;

            croppedCtx.drawImage(canvas, scaledX, scaledY, scaledWidth, scaledHeight, 0, 0, scaledWidth, scaledHeight);

            const croppedImageUrl = croppedCanvas.toDataURL();

            if (highestDetection.score > 0.9) {
                setCroppedImages((prev) => {
                    const updatedImages = [...prev, croppedImageUrl];
                    const progressPercentage = (updatedImages.length / 10) * 100;
                    setProgress(progressPercentage); // Update progress
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
                    backgroundColor: "black",
                    aspectRatio: "4/3",
                }}
            >
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                    }}
                />
                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                    }}
                />
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
            ><div style={{ color: "white", fontSize: "20px", textAlign: "center" }}>
                    {croppedImages.length < 10
                        ? `Scanning ${croppedImages.length}/10 items... Please wait.`
                        : "Scanning complete! Processing results..."}
                </div>

            </div>
        </div>
    );
};

export default CameraComponent;
