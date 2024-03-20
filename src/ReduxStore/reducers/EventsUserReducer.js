const userUpcomingEventsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_EVENTS_DATA_FOR_USER_UPCOMING':
      return action.payload;
    default:
      return state;
  }
};

const userHotEventsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_EVENTS_DATA_FOR_USER_HOT':
      return action.payload;
    default:
      return state;
  }
};

const userRecentEventsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_EVENTS_DATA_FOR_USER_RECENT':
      return action.payload;
    default:
      return state;
  }
};

const userAllEventsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_EVENTS_DATA_FOR_USER_ALL':
      return action.payload;
    default:
      return state;
  }
};

export {
  userUpcomingEventsReducer,
  userHotEventsReducer,
  userRecentEventsReducer,
  userAllEventsReducer
};