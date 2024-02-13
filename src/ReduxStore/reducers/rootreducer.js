
import { combineReducers } from 'redux';
import requestsReducer from './RequestsreducerAdmin'; // Adjust the import path based on your actual file structure

const rootReducer = combineReducers({
  requests: requestsReducer,
  // Add other reducers here if you have more
});

export default rootReducer;