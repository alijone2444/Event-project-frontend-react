import Navbar from '../navbar/navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { CircularProgress, Grid } from '@mui/material';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import WrapperComponent from '../../../../FooterAndHeaderwrapper';
import { useEffect, useState } from 'react';
import createAuthenticatedRequest from '../../../../RequestwithHeader';
import constants from '../../../../Constants/constants';
import { useSelector, useDispatch } from 'react-redux';
import { setCalanderData } from '../../../../ReduxStore/actions/CalanderAction';
import { useNavigate } from 'react-router-dom';
import convertEvents from '../../../../Components/functions/convertEventsForCalander';
function CalanderComponent() {
  const dispatch = useDispatch()
  const events = useSelector(state => state.CalanderEvents)
  const requestInstance = createAuthenticatedRequest()
  const [showloading, setshowloading] = useState(false)
  const navigate = useNavigate()

  const handleItemClick = async (item) => {
    try {
      setshowloading(true)
      console.log(item)
      const response = await requestInstance.get(`${constants.BASE_URL}get-events`, {
        params: {
          amount: 'One',
          eventName: item.title
        },

      })
      if (response && response.data) {
        console.log(response)
        setshowloading(false)
        navigate(`/eventdetail/${response.data.events[0].eventName}`, { state: { data: response.data.events[0], toNavigate: '/calander' } });

      }
    }
    catch (error) {
      console.error('Error fetching events:', error);
      setshowloading(false)
    }
  };

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
  const Loader = () => (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent overlay
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 5, // Ensure overlay is above content
    }}>
      <CircularProgress style={{ color: 'dodgerblue' }} />
    </div>

  );
  return (
    <WrapperComponent>
      <div style={{ position: 'relative' }}>
        <Grid container style={{ padding: "25px" }}>
          <Grid item xs={12} >
            <Calendar
              localizer={localizer}
              events={events}
              onSelectEvent={handleItemClick}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500, zIndex: 1 }}
            />
            {showloading && <Loader />}
          </Grid>
        </Grid>
      </div>
    </WrapperComponent>
  );
}

export default CalanderComponent;
