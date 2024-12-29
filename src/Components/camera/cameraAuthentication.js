import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { Modal, Button } from "antd";

const CameraComponent = () => {
    const [image, setImage] = useState(null); // Stores the uploaded image
    const [highestDetection, setHighestDetection] = useState(null); // Stores highest detection
    const canvasRef = useRef(null); // Canvas reference
    const [model, setModel] = useState(null); // Stores loaded model
    const [IsModalOpen, setIsModalOpen] = useState(true)
    // Load model when component mounts
    const ClassNames = ['studentCard', 'notstudentCard']
    useEffect(() => {
        const loadModel = async () => {
            console.log("Loading model...");
            const loadedModel = await tf.loadGraphModel("/model/model.json"); // Update path to your model.json
            console.log("Model loaded!");
            setModel(loadedModel); // Store the model in state
        };
        loadModel();
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result); // Set image preview
            };
            reader.readAsDataURL(file);
        }
    };

    const detectObjects = async () => {
        if (!model) {
            console.log("Model is still loading...");
            return;
        }

        const imageElement = document.getElementById("uploadedImage");
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Preprocess the image
        const img = tf.browser.fromPixels(imageElement);
        const resizedImg = tf.image.resizeBilinear(img, [640, 640]);
        const inputTensor = resizedImg.expandDims(0).toFloat().div(255.0);

        // Perform inference
        const predictions = await model.predict(inputTensor);

        // Check prediction tensor shape and structure
        console.log("Predictions:", predictions);
        const predictionArray = predictions.arraySync()[0]; // Assuming only 1 batch

        // Process predictions (assuming YOLOv5 output format)
        let highestDetection = null;
        for (let i = 0; i < predictionArray.length; i++) {
            const [x, y, width, height, confidence, ...classProbs] = predictionArray[i];

            // Find the index of the class with the highest probability using Math.max
            const classId = classProbs.indexOf(Math.max(...classProbs));

            const detection = {
                box: [x, y, width, height],
                score: confidence,
                classId: classId, // Class ID
                className: `Class ${ClassNames[classId]}`, // Assuming class name can be inferred or provided separately
            };
            if (!highestDetection || confidence > highestDetection.score) {
                highestDetection = detection; // Update highest detection
            }
        }

        setHighestDetection(highestDetection);

        // Draw detections
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

        if (highestDetection) {
            const [x, y, width, height] = highestDetection.box;
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
            ctx.strokeRect(x * canvas.width, y * canvas.height, width * canvas.width, height * canvas.height);


            ctx.fillStyle = "red";
            ctx.font = "12px Arial";
            ctx.fillText(
                `${highestDetection.className} | Score: ${highestDetection.score.toFixed(2)}`,
                x,
                y > 10 ? y - 5 : y + 15
            );
        }

        // Cleanup
        tf.dispose(img);
        tf.dispose(resizedImg);
        tf.dispose(inputTensor);
    };

    return (
        <Modal
            title="YOLOv5 Object Detection"
            visible={IsModalOpen}
            footer={null}
            onCancel={() => setIsModalOpen(false)}
        >
            <div >
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <Button onClick={detectObjects}>Detect Objects</Button>

                {image && (
                    <div>
                        <img
                            id="uploadedImage"
                            src={image}
                            alt="Uploaded"
                            style={{ width: '100%' }}
                        />
                        <div style={{ display: 'cover' }}>
                            <canvas
                                ref={canvasRef}
                                style={{ border: "1px solid black", width: '100%', }}
                            />
                        </div>
                    </div>
                )}

                {highestDetection && (
                    <div style={{ marginTop: "20px" }}>
                        <h2>Highest Score Detection:</h2>
                        <p>
                            Class: {highestDetection.className}, Score: {highestDetection.score.toFixed(2)},
                            Box: {`[${highestDetection.box.join(", ")}]`}
                        </p>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default CameraComponent;
