export const setEventsDataUserUpcoming = (data) => ({
  type: 'SET_EVENTS_DATA_FOR_USER_UPCOMING',
  payload: data,
}
);
export const setEventsDataUserHot = (data) => ({
  type: 'SET_EVENTS_DATA_FOR_USER_HOT',
  payload: data,
}
);
export const setEventsDataUserRecent = (data) => ({
  type: 'SET_EVENTS_DATA_FOR_USER_RECENT',
  payload: data,
}
);

export const setEventsDataAll = (data) => ({
  type: 'SET_EVENTS_DATA_FOR_USER_ALL',
  payload: data,
}
);