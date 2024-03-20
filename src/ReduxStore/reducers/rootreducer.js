
import { combineReducers } from 'redux';
import requestsReducer from './RequestsreducerAdmin'; // Adjust the import path based on your actual file structure
import AdminEventsReducer from './EventsAdminReducer';
import {
  userUpcomingEventsReducer,
  userHotEventsReducer,
  userRecentEventsReducer,
  userAllEventsReducer
} from './EventsUserReducer';
const rootReducer = combineReducers({
  requests: requestsReducer,
  adminEvents: AdminEventsReducer,
  userUpcomingEvents: userUpcomingEventsReducer,
  userHotEvents: userHotEventsReducer,
  userRecentEvents: userRecentEventsReducer,
  // Add other reducers here if you have more
  userAllEvents: userAllEventsReducer
});

export default rootReducer;