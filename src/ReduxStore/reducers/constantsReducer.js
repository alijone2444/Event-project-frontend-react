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
const initialStateSocieties = {
    societies: []
};

const societiesFooterReducer = (state = initialStateSocieties, action) => {
    switch (action.type) {
        case 'SET_SOCIETIES_FOOTER':
            return {
                ...state,
                societies: action.payload
            };
        default:
            return state;
    }
};
export { constantsReducer, societiesFooterReducer };
