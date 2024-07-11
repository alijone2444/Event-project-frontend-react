const AdminSocietiesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ADMIN_SOCIETIES_DATA':
            return action.payload;
        default:
            return state;
    }
};

export default AdminSocietiesReducer;