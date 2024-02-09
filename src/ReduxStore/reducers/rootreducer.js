// src/store/reducers/index.js
import { combineReducers } from 'redux';
import booleanReducer from './reducer';

const rootReducer = combineReducers({
  boolean: booleanReducer,
  // Add other reducers here if needed
});

export default rootReducer;
