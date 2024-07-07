// setGotTokenFcmReducer.js

const initialState = {
    flag: false
};

const setGotTokenFcmReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_GOT_TOKEN_FCM':
            return {
                ...state,
                flag: action.payload
            };
        default:
            return state;
    }
};

export default setGotTokenFcmReducer;
