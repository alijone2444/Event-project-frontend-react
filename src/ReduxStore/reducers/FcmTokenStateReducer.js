const initialState = {
    token: null,
};

const fcmTokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FCM_TOKEN':
            return {
                ...state,
                token: action.payload,
            };
        default:
            return state;
    }
};

export default fcmTokenReducer;