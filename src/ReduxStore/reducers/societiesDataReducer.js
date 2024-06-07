const SocietiesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SOCIETIES_DATA':
            return action.payload;
        default:
            return state;
    }
};

export default SocietiesReducer;