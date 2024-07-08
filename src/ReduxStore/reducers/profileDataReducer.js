const ProfileDataReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PROFILE_DATA':
            return action.payload;
        default:
            return state;
    }
};

export default ProfileDataReducer;