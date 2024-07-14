import { combineReducers } from 'redux';
import requestsReducer from './RequestsreducerAdmin'; // Adjust the import path based on your actual file structure
import AdminEventsReducer from './EventsAdminReducer';
import SocietiesReducer from './societiesDataReducer';
import ProfileDataReducer from './profileDataReducer';
import {
  userUpcomingEventsReducer,
  userHotEventsReducer,
  userRecentEventsReducer,
  userAllEventsReducer,
} from './EventsUserReducer';
import paginationReducer from './eventspaginationReducers';
import CrouselImagesDataReducer from './crouselImagesDatareducer';
import setGotTokenFcmReducer from './firebaseReducers';
import AdminSocietiesReducer from './adminSocietydataReducer';
import { userPopularEventsReducer } from './EventsUserReducer';
import CalanderDataReducer from './calanderDatareducer';
import { createStore } from 'redux'
const appReducer = combineReducers({
  requests: requestsReducer,
  adminEvents: AdminEventsReducer,
  userUpcomingEvents: userUpcomingEventsReducer,
  userHotEvents: userHotEventsReducer,
  userRecentEvents: userRecentEventsReducer,
  userAllEvents: userAllEventsReducer,
  userpopularEvents: userPopularEventsReducer,
  Societies: SocietiesReducer,
  crouselData: CrouselImagesDataReducer,
  FCMToken: setGotTokenFcmReducer,
  eventspagination: paginationReducer,
  profiledata: ProfileDataReducer,
  Adminsocieties: AdminSocietiesReducer,
  CalanderEvents: CalanderDataReducer
});

const rootReducer = (state, action) => {
  // If the action type is 'USER_LOGOUT', reset the state to undefined
  if (action.type === 'USER_LOGOUT') {
    return appReducer(undefined, action);
  }

  // For other actions, pass the current state to the appReducer
  return appReducer(state, action);
};

const Store = createStore(rootReducer)
export default Store

