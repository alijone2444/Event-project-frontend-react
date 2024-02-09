import { SET_BOOLEAN_STATE } from '../actions/types';

const initialState = {
  booleanState: false,
};

const booleanReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOLEAN_STATE:
      return {
        ...state,
        booleanState: action.payload,
      };
    default:
      return state;
  }
};

export default booleanReducer;