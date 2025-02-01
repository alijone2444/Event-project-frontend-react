// // worker.js
// onmessage = async function (e) {
//     const { videoData } = e.data;

//     // Process the image and send it back to the main thread
//     const tf = require('@tensorflow/tfjs'); // Import TensorFlow in the worker

//     const model = await tf.loadGraphModel("/model/model.json");

//     const img = tf.browser.fromPixels(videoData);
//     const resizedImg = tf.image.resizeBilinear(img, [640, 640]);
//     const inputTensor = resizedImg.expandDims(0).toFloat().div(255.0);

//     const predictions = await model.predict(inputTensor);
//     const predictionArray = predictions.arraySync()[0];

//     let highestDetection = null;
//     predictionArray.forEach(([xCenter, yCenter, width, height, confidence, ...classProbs]) => {
//         const classId = classProbs.indexOf(Math.max(...classProbs));
//         if (!highestDetection || confidence > highestDetection.score) {
//             highestDetection = { box: [xCenter, yCenter, width, height], score: confidence, classId };
//         }
//     });

//     postMessage({ highestDetection });
// };
