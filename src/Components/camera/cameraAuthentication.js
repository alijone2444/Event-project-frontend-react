import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { Modal, Progress } from "antd";

const CameraComponent = ({ onfinish }) => {
    const [model, setModel] = useState(null);
    const [IsModalOpen, setIsModalOpen] = useState(true);
    const [highestDetection, setHighestDetection] = useState(null);
    const [croppedImages, setCroppedImages] = useState([]);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const ClassNames = ["studentCard", "notstudentCard"];
    const animationFrameId = useRef(null); // Reference to store animation frame ID

    useEffect(() => {
        const loadModel = async () => {
            console.log("Loading model...");
            const loadedModel = await tf.loadGraphModel("/model/model.json");
            console.log("Model loaded!");
            setModel(loadedModel);
        };
        loadModel();
    }, []);

    useEffect(() => {
        const setupCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { width: 640, height: 480 },
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
            }
        };
        setupCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    const detectObjects = async () => {
        if (!model || !videoRef.current) {
            return;
        }

        const videoElement = videoRef.current;
        if (videoElement.videoWidth === 0 || videoElement.videoHeight === 0) {
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const img = tf.browser.fromPixels(videoElement);
        const resizedImg = tf.image.resizeBilinear(img, [640, 640]);
        const inputTensor = resizedImg.expandDims(0).toFloat().div(255.0);

        const predictions = await model.predict(inputTensor);
        const predictionArray = predictions.arraySync()[0];

        let highestDetection = null;
        for (let i = 0; i < predictionArray.length; i++) {
            const [xCenter, yCenter, width, height, confidence, ...classProbs] = predictionArray[i];
            const classId = classProbs.indexOf(Math.max(...classProbs));

            const detection = {
                box: [xCenter, yCenter, width, height],
                score: confidence,
                classId: classId,
                className: ClassNames[classId],
            };

            if (!highestDetection || confidence > highestDetection.score) {
                highestDetection = detection;
            }
        }

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

            croppedCtx.drawImage(
                canvas,
                scaledX,
                scaledY,
                scaledWidth,
                scaledHeight,
                0,
                0,
                scaledWidth,
                scaledHeight
            );

            const croppedImageUrl = croppedCanvas.toDataURL();

            if (highestDetection.score > 0.9) {
                setCroppedImages(prev => {
                    const updatedImages = [...prev, croppedImageUrl];
                    if (updatedImages.length >= 10) {
                        setIsModalOpen(false);
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

        if (model && IsModalOpen) {
            detectLoop();
        }

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [model, IsModalOpen]);

    return (
        <Modal
            title="YOLOv5 Object Detection"
            visible={IsModalOpen}
            footer={null}
            onCancel={() => setIsModalOpen(false)}
        >
            <div>
                <Progress
                    percent={(croppedImages.length / 10) * 100}
                    strokeColor={croppedImages.length >= 10 ? "lightgreen" : "blue"}
                    showInfo={false}
                    strokeWidth={15}
                    style={{ marginBottom: 20 }}
                />
                <video
                    ref={videoRef}
                    autoPlay
                    width={320}
                    height={240}
                    style={{ display: "none" }}
                />
                <canvas
                    width={320}
                    height={240}
                    ref={canvasRef}
                    style={{ border: "1px solid black" }}
                />
            </div>
        </Modal>
    );
};

export default CameraComponent;
