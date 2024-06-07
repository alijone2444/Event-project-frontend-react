
const CrouselImagesDataReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CROUSEL_IMAGES_DATA':
            return action.payload;
        default:
            return state;
    }
};

export default CrouselImagesDataReducer;