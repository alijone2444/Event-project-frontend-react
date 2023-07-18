import Navbar from "../Home/navbar/navbar";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

function CalanderComponent() {
  const myEventsList = [
    {
      title: 'Event 1',
      start: new Date(2023, 6, 17, 10, 0), // July 17, 2023, 10:00 AM
      end: new Date(2023, 6, 17, 12, 0), // July 17, 2023, 12:00 PM
    },
    {
      title: 'Event 2',
      start: new Date(2023, 6, 18, 14, 0), // July 18, 2023, 2:00 PM
      end: new Date(2023, 6, 18, 16, 0), // July 18, 2023, 4:00 PM
    },
  ];

  const localizer = momentLocalizer(moment);

  return (
    <div>
    <div style={{ marginTop: "5%" }}></div>
      <Navbar />
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
      <h1>Calendars</h1>
    </div>
  );
}

export default CalanderComponent;