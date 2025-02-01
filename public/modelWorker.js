importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.0.0/dist/tf.min.js');
onmessage = async (event) => {
    if (event.data.type === 'predict') {
        const tensorData = new Float32Array(event.data.tensorData.buffer);  // Reconstructing the tensor data

        // Rebuild tensor from the raw data
        const inputTensor = tf.tensor(tensorData, [1, 640, 640, 3]);  // Update the shape accordingly

        try {
            const predictions = await model.predict(inputTensor);
            const predictionArray = predictions.arraySync()[0];

            let highestDetection = null;
            predictionArray.forEach(([xCenter, yCenter, width, height, confidence, ...classProbs]) => {
                const classId = classProbs.indexOf(Math.max(...classProbs));
                if (!highestDetection || confidence > highestDetection.score) {
                    highestDetection = { box: [xCenter, yCenter, width, height], score: confidence, classId };
                }
            });

            postMessage({ type: 'prediction', detection: highestDetection });
        } catch (error) {
            postMessage({ type: 'predictionError', error: error.message });
        }

        // Clean up tensor objects to avoid memory leaks
        tf.dispose(inputTensor);
    }
};
