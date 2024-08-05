const SocietiesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SOCIETIES_DATA':
            return action.payload;
        default:
            return state;
    }
};


const ViewMoreSocietiesReducer = (state = true, action) => {
    switch (action.type) {
        case 'SET_SOCIETY_VIEW_MORE_OPTION':
            return action.payload;
        default:
            return state;
    }
};

export { ViewMoreSocietiesReducer, SocietiesReducer };