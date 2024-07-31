import Navbar from '../navbar/navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Grid } from '@mui/material';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import WrapperComponent from '../../../../FooterAndHeaderwrapper';
import { useEffect, useState } from 'react';
import createAuthenticatedRequest from '../../../../RequestwithHeader';
import constants from '../../../../Constants/constants';
import { useSelector, useDispatch } from 'react-redux';
import { setCalanderData } from '../../../../ReduxStore/actions/CalanderAction';
import convertEvents from '../../../../Components/functions/convertEventsForCalander';
function CalanderComponent() {
  // const myEventsList = [
  //   {
  //     title: 'Event 1',
  //     start: new Date(2023, 6, 17, 10, 0), // July 17, 2023, 10:00 AM
  //     end: new Date(2023, 6, 17, 12, 0), // July 17, 2023, 12:00 PM
  //   },
  //   {
  //     title: 'Event 2',
  //     start: new Date(2023, 6, 18, 14, 0), // July 18, 2023, 2:00 PM
  //     end: new Date(2023, 6, 18, 16, 0), // July 18, 2023, 4:00 PM
  //   },
  // ];
  const dispatch = useDispatch()
  const events = useSelector(state => state.CalanderEvents)
  const requestInstance = createAuthenticatedRequest()

  useEffect(() => {
    if (events.length === 0) {
      fetchEvents();
    }
  }, [dispatch]);

  const fetchEvents = async () => {
    try {
      const response = await requestInstance.get(`${constants.BASE_URL}calander-upcoming-events`);
      if (response.data && Array.isArray(response.data)) {
        const calendarEvents = convertEvents(response.data);
        console.log(calendarEvents); // Check the converted events in console
        dispatch(setCalanderData(calendarEvents))
      } else {
        console.error('Error fetching events: Invalid data format');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
  const localizer = momentLocalizer(moment);

  return (
    <WrapperComponent>
      <div >
        <Grid container style={{ padding: "25px" }}>
          <Grid item xs={12} >
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500, zIndex: 1 }}
            />
          </Grid>
        </Grid>
      </div>
    </WrapperComponent>
  );
}

export default CalanderComponent;
