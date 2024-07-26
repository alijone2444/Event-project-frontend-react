const initialState = {
    constants: {},
};

const constantsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CONSTANTS':
            return {
                ...state,
                constants: action.payload,
            };
        default:
            return state;
    }
};

export default constantsReducer;
