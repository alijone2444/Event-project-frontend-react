import { useState } from "react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

// Function to generate random dimensions between 240 and 320
const getRandomDimensions = () => {
    const width = Math.floor(Math.random() * (320 - 240 + 1)) + 240;
    const height = Math.floor(Math.random() * (320 - 240 + 1)) + 240;
    return { width, height };
};

// Component
export default function ImageGallery({ images }) {
    const [index, setIndex] = useState(-1);

    // Map image URLs to image objects with random dimensions
    const imageObjects = images.map((url) => {
        const { width, height } = getRandomDimensions();
        return {
            src: url,
            width: width,
            height: height,
            caption: `Image at ${width}x${height}`,
        };
    });

    const currentImage = imageObjects[index];
    const nextIndex = (index + 1) % imageObjects.length;
    const nextImage = imageObjects[nextIndex] || currentImage;
    const prevIndex = (index + imageObjects.length - 1) % imageObjects.length;
    const prevImage = imageObjects[prevIndex] || currentImage;

    const handleClick = (index) => setIndex(index);
    const handleClose = () => setIndex(-1);
    const handleMovePrev = () => setIndex(prevIndex);
    const handleMoveNext = () => setIndex(nextIndex);

    return (
        <div >
            <div style={galleryContainerStyle}>
                <Gallery
                    images={imageObjects}
                    onClick={handleClick}
                    enableImageSelection={false}
                    rowHeight={200}
                    margin={5}
                    tagStyle={{ color: '#fff', background: '#000' }}
                    thumbnailStyle={{
                        border: '2px solid #ccc',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        objectFit: 'cover',
                        cursor: 'pointer',

                    }}
                />
            </div>
            {!!currentImage && (
                <Lightbox
                    mainSrc={currentImage.src}
                    imageTitle={currentImage.caption}
                    mainSrcThumbnail={currentImage.src}
                    nextSrc={nextImage.src}
                    nextSrcThumbnail={nextImage.src}
                    prevSrc={prevImage.src}
                    prevSrcThumbnail={prevImage.src}
                    onCloseRequest={handleClose}
                    onMovePrevRequest={handleMovePrev}
                    onMoveNextRequest={handleMoveNext}
                    reactModalStyle={lightboxStyles}
                />
            )}
        </div>
    );
}

// Inline styles
const galleryContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '10px',
    padding: '10px',
    margin: '0 auto',
};

const lightboxStyles = {
    background: 'rgba(0, 0, 0, 0.8)',
};
