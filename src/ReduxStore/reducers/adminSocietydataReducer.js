const AdminSocietiesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ADMIN_SOCIETIES_DATA':
            return action.payload;
        default:
            return state;
    }
};
const ViewMoreAdminSocietiesReducer = (state = true, action) => {
    switch (action.type) {
        case 'SET_SOCIETY_VIEW_MORE_OPTION':
            return action.payload;
        default:
            return state;
    }
};
export { AdminSocietiesReducer, ViewMoreAdminSocietiesReducer };