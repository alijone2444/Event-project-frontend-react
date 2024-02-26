
const AdminEventsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_EVENTS_DATA':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default AdminEventsReducer;