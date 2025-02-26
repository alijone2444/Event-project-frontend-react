import Navbar from '../navbar/navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { CircularProgress, Grid, Paper, Typography ,IconButton} from '@mui/material';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import WrapperComponent from '../../../../FooterAndHeaderwrapper';
import { useEffect, useState } from 'react';
import createAuthenticatedRequest from '../../../../RequestwithHeader';
import constants from '../../../../Constants/constants';
import { useSelector, useDispatch } from 'react-redux';
import { setCalanderData } from '../../../../ReduxStore/actions/CalanderAction';
import { useNavigate } from 'react-router-dom';
import convertEvents from '../../../../Components/functions/convertEventsForCalander';
import { setEventsDataAll } from '../../../../ReduxStore/actions/eventsDataActionUser';
import { Close, Visibility } from "@mui/icons-material";

function CalanderComponent() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.CalanderEvents);
  const Events = useSelector((state) => state.userAllEvents);
  const requestInstance = createAuthenticatedRequest();
  const [isOpen, setIsOpen] = useState(true);
  const [showloading, setshowloading] = useState(false);
  const navigate = useNavigate();

  const handleItemClick = async (item) => {
    try {
      setshowloading(true);
      const response = await requestInstance.get(`${constants.BASE_URL}get-events`, {
        params: {
          amount: 'One',
          eventName: item.title,
        },
      });
      if (response && response.data) {
        setshowloading(false);
        const { _id, eventName } = response.data.events[0];
        dispatch(setEventsDataAll([...Events, response.data.events[0]]));
        navigate(`/eventdetail/${eventName}`, { state: { data: { _id, eventName }, toNavigate: '/calander' } });
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setshowloading(false);
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
        dispatch(setCalanderData(calendarEvents));
      } else {
        console.error('Error fetching events: Invalid data format');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const localizer = momentLocalizer(moment);

  // Custom event style based on referenceColor
  const eventStyleGetter = (event) => {
    const backgroundColor = event.referenceColor || '#3174ad'; // Default color if referenceColor is not available
    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        color: 'white',
        border: 'none',
        display: 'block',
      },
    };
  };

  // Create a legend for society colors
  const societyLegend = events.reduce((acc, event) => {
    const societyName = event.societyName==='None'?"Admin Created":event.societyName; // Default to "Admin Created" if no societyName
    if (societyName && event.referenceColor) {
      acc[societyName] = event.referenceColor;
    }
    return acc;
  }, {});

  const Loader = () => (
    <div
      style={{
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
      }}
    >
      <CircularProgress style={{ color: 'dodgerblue' }} />
    </div>
  );

  return (
    <WrapperComponent>
      <div style={{ position: 'relative' }}>
        <Grid container style={{ padding: '25px' }}>
          <Grid item xs={12}>
            {/* Calendar Component */}
            <Calendar
              localizer={localizer}
              events={events}
              onSelectEvent={handleItemClick}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500, zIndex: 1 }}
              eventPropGetter={eventStyleGetter} // Apply custom event styles
            />
            {showloading && <Loader />}

            {!isOpen && (
        <IconButton
          onClick={() => setIsOpen(true)}
          style={{ position: "fixed", bottom: "20px", right: "20px", background: "white", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}
        >
          <Visibility />
        </IconButton>
      )}
      {isOpen && (
        <Paper
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "10px",
            backgroundColor: "white",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            zIndex: 10,
            background: "rgba(255,255,255,0.5)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" style={{ marginBottom: "10px" }}>
              Society Colors
            </Typography>
            <IconButton onClick={() => setIsOpen(false)}>
              <Close />
            </IconButton>
          </div>
          {Object.entries(societyLegend).map(([societyName, color]) => (
            <div key={societyName} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
              <div
                style={{
                  width: "15px",
                  height: "15px",
                  backgroundColor: color,
                  marginRight: "10px",
                  borderRadius: "3px",
                }}
              />
              <Typography variant="body1">{societyName}</Typography>
            </div>
          ))}
        </Paper>
      )}
          </Grid>
        </Grid>
      </div>
    </WrapperComponent>
  );
}

export default CalanderComponent;