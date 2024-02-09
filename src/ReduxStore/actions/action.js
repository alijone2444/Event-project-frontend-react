// src/store/actions/index.js
import { SET_BOOLEAN_STATE } from './types';

export const setBooleanState = (value) => {
  return {
    type: SET_BOOLEAN_STATE,
    payload: value,
  };
};
