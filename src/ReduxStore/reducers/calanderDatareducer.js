
const CalanderDataReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CALANDAR_DATA':
            return action.payload;
        default:
            return state;
    }
};

export default CalanderDataReducer;