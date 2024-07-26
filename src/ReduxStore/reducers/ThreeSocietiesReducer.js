
const initialState = {
    societies: {
        newArrival: {},
        trending: {},
        topRated: {}
    }
};

const threeSocietiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_THREE_SOCIETIES':
            return {
                ...state,
                societies: action.payload
            };
        default:
            return state;
    }
};

export default threeSocietiesReducer;
