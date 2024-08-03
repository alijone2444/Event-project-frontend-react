
const initialState = {
    items: [],
};

const marqueeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MARQUEE_ITEMS':
            return {
                ...state,
                items: action.payload,
            };
        default:
            return state;
    }
};

export default marqueeReducer;
