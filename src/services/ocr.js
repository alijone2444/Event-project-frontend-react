import Tesseract from 'tesseract.js';

// Function to crop the bottom-right portion of the image dynamically
export const cropBottomRight = (image, widthRatioStart = 0.7, heightRatioStart = 0.6, widthRatioEnd = 0.98, heightRatioEnd = 1) => {
    const img = new Image();
    img.src = image;

    return new Promise((resolve, reject) => {
        img.onload = () => {
            const width = img.width;
            const height = img.height;

            // Calculate the crop area
            const left = width * widthRatioStart;
            const top = height * heightRatioStart;
            const right = width * widthRatioEnd;
            const bottom = height * heightRatioEnd;

            // Create a canvas to perform the cropping
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = right - left;
            canvas.height = bottom - top;

            // Draw the cropped image on the canvas
            ctx.drawImage(img, left, top, right - left, bottom - top, 0, 0, canvas.width, canvas.height);

            // Get the base64 data URL of the cropped image
            const croppedImage = canvas.toDataURL('image/jpeg');
            resolve(croppedImage);
        };

        img.onerror = (error) => {
            reject(error);
        };
    });
};

// Function to handle OCR processing
export const handleCardOcr = async (images, setloadingOcr, setCroppedImages, setOcrResults) => {
    try {
        setloadingOcr(true);

        // Array to store the cropped images
        const croppedImages = [];

        // Process each image with cropping
        for (const image of images) {
            // Crop the image before sending to OCR
            const croppedImage = await cropBottomRight(image);
            croppedImages.push(croppedImage);
        }

        console.log("Cropped Images:", croppedImages);

        // Array to store the OCR results
        const ocrResults = [];

        // Process each cropped image with Tesseract.js
        setCroppedImages(croppedImages);
        for (const croppedImage of croppedImages) {
            const result = await Tesseract.recognize(
                croppedImage, // Cropped image URL or base64-encoded image
                'eng',  // Language code (English in this case)
                {
                    logger: (m) => console.log(m), // Log progress (optional)
                    tessedit_pageseg_mode: 6
                }
            );

            // Log the OCR text for each image
            console.log("OCR Text for Image:", result.data.text);

            // Collect the OCR text
            ocrResults.push(result.data.text);
        }

        console.log("OCR Results:", ocrResults);

        // Store the OCR results in state
        setOcrResults(ocrResults);
        setloadingOcr(false);

    } catch (error) {
        console.error("Error during OCR processing:", error);
        setloadingOcr(false);
    }
};