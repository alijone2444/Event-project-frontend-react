import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { CircularProgress } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';

const CameraComponent = ({ onfinish }) => {
    const [model, setModel] = useState(null);
    const [highestDetection, setHighestDetection] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingText, setLoadingText] = useState("Loading Camera... Please wait.");
    const [capturedImage, setCapturedImage] = useState(null);
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const videoRef = useRef(null);
    const animationFrameId = useRef(null);
    const [boxDetails, setBoxDetails] = useState({
        scaledX: 0,
        scaledY: 0,
        scaledWidth: 0,
        scaledHeight: 0,
        Score: 0
    });
    const ClassNames = ["studentCard", "notstudentCard"];

    useEffect(() => {
        const loadModel = async () => {
            setLoadingText('Loading model please wait');
            const loadedModel = await tf.loadGraphModel("/model/model.json");
            setModel(loadedModel);
            setLoading(false);
        };
        loadModel();
    }, []);

    useEffect(() => {
        const setupCamera = async () => {
            try {
                setLoadingText('Loading camera please wait');
                const constraints = { video: { facingMode: "environment" } };
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.onloadedmetadata = () => setLoading(false);
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
                setLoading(false);
            }
        };
        setupCamera();

        return () => {
            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
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

        let highest = null;
        predictionArray.forEach(([x, y, w, h, score, ...classes]) => {
            const classId = classes.indexOf(Math.max(...classes));
            if (!highest || score > highest.score) {
                highest = {
                    box: [x, y, w, h],
                    score,
                    classId,
                    className: ClassNames[classId]
                };
            }
        });

        setHighestDetection(highest);

        if (highest) {
            const [xCenter, yCenter, width, height] = highest.box;
            const scaledX = (xCenter - width / 2) * videoElement.videoWidth;
            const scaledY = (yCenter - height / 2) * videoElement.videoHeight;
            const scaledWidth = width * videoElement.videoWidth;
            const scaledHeight = height * videoElement.videoHeight;

            setBoxDetails({
                scaledX,
                scaledY,
                scaledWidth,
                scaledHeight,
                Score: highest.score
            });
        }

        tf.dispose([img, resizedImg, inputTensor]);
    };

    useEffect(() => {
        const detectLoop = () => {
            detectObjects();
            animationFrameId.current = requestAnimationFrame(detectLoop);
        };
        if (model) detectLoop();
        return () => cancelAnimationFrame(animationFrameId.current);
    }, [model]);

    const handleCapture = () => {
        if (!highestDetection || highestDetection.score < 0.8) {
            alert('Please position your card properly before capturing');
            return;
        }

        const video = videoRef.current;
        const canvas = document.createElement('canvas');
        canvas.width = boxDetails.scaledWidth;
        canvas.height = boxDetails.scaledHeight;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            video,
            boxDetails.scaledX,
            boxDetails.scaledY,
            boxDetails.scaledWidth,
            boxDetails.scaledHeight,
            0,
            0,
            boxDetails.scaledWidth,
            boxDetails.scaledHeight
        );

        const imageUrl = canvas.toDataURL('image/jpeg', 1.0);
        setCapturedImage(imageUrl);
        onfinish([imageUrl]);
    };

    return (
        <div style={styles.container}>
            <button
                style={styles.closeButton}
                onClick={() => capturedImage && onfinish([capturedImage])}
            >
                ×
            </button>

            <div style={styles.videoContainer}>
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    style={styles.video}
                />

                {loading && (
                    <div style={styles.loadingOverlay}>
                        <CircularProgress style={{ color: "white" }} />
                        <p style={styles.loadingText}>{loadingText}</p>
                    </div>
                )}

                <div style={styles.guideBox}>
                    <div style={styles.guideText}>Place Card Here</div>
                </div>

                {highestDetection && (
                    <>
                        <div style={{
                            ...styles.scoreText,
                            top: `${(boxDetails.scaledY / videoRef.current?.videoHeight) * 100}%`,
                            left: `${(boxDetails.scaledX / videoRef.current?.videoWidth) * 100}%`,
                            color: boxDetails.Score > 0.8 ? "lightgreen" : "red"
                        }}>
                            {Math.round(boxDetails.Score * 100)}%
                        </div>
                        <div
                            style={{
                                ...styles.boundingBox,
                                top: `${(boxDetails.scaledY / videoRef.current?.videoHeight) * 100}%`,
                                left: `${(boxDetails.scaledX / videoRef.current?.videoWidth) * 100}%`,
                                width: `${(boxDetails.scaledWidth / videoRef.current?.videoWidth) * 100}%`,
                                height: `${(boxDetails.scaledHeight / videoRef.current?.videoHeight) * 100}%`,
                                borderColor: boxDetails.Score > 0.8 ? "lightgreen" : "red"
                            }}
                        />
                    </>
                )}
            </div>

            <div style={styles.captureButtonContainer}>
                <button
                    onClick={handleCapture}
                    style={styles.captureButton}
                    disabled={loading || !highestDetection || highestDetection.score < 0.8}
                >
                    Capture
                </button>
            </div>

            {capturedImage && (
                <div style={styles.previewContainer}>
                    <img
                        src={capturedImage}
                        alt="Cropped"
                        style={styles.previewImage}
                    />
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
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
        flexDirection: "column"
    },
    closeButton: {
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
        zIndex: 1000
    },
    videoContainer: {
        position: "relative",
        width: "100%",
        maxWidth: "640px",
        height: "auto"
    },
    video: {
        width: "100%",
        height: "auto",
        objectFit: "contain"
    },
    loadingOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    loadingText: {
        color: "white",
        fontSize: "20px",
        marginTop: "10px"
    },
    guideBox: {
        position: "absolute",
        top: "30%",
        left: "20%",
        width: "60%",
        height: "40%",
        border: "2px dashed white",
        zIndex: 1001
    },
    guideText: {
        position: "absolute",
        bottom: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        color: "white",
        fontSize: "14px"
    },
    scoreText: {
        position: "absolute",
        zIndex: 1001,
        fontSize: "16px",
        fontWeight: "bold",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: "2px 5px",
        borderRadius: "4px"
    },
    boundingBox: {
        position: "absolute",
        border: "2px solid",
        zIndex: 1000
    },
    captureButtonContainer: {
        position: "absolute",
        bottom: "10%",
        left: "50%",
        transform: "translateX(-50%)"
    },
    captureButton: {
        backgroundColor: "#1890ff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        opacity: 1,
        transition: "opacity 0.3s"
    },
    previewContainer: {
        position: "absolute",
        bottom: "20%",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "white",
        padding: "8px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)"
    },
    previewImage: {
        width: "200px",
        height: "auto",
        border: "2px solid #52c41a",
        borderRadius: "4px"
    }
};

export default CameraComponent;