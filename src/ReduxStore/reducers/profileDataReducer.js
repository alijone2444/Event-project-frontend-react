const ProfileDataReducer = (state = [], action) => {
    console.log('don flaming', state, action)

    switch (action.type) {
        case 'SET_PROFILE_DATA':
            return action.payload;
        default:
            return state;
    }
};

export default ProfileDataReducer;