import React, { useState } from 'react';
import { Tag } from 'antd';
import { DatePicker } from 'antd';
import './schedules.css'
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  useMediaQuery
} from '@mui/material';

const initialEvents = [
  {
    id: 1,
    title: 'Event 1',
    date: new Date('2023-08-15'),
    description: 'Join us for an exciting workshop on React development.'
  },
  {
    id: 2,
    title: 'Event 2',
    date: new Date('2023-08-20'),
    description: 'Team building day - outdoor activities and fun!'
  },
];

const EventScheduler = () => {
  const isSmallScreen = useMediaQuery('(max-width: 768px)'); // Adjust the max-width value as needed
  const [events, setEvents] = useState(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newDate, setNewDate] = useState(null);

  const handleOpenDialog = (event) => {
    setSelectedEvent(event);
    setNewDate(event.date);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedEvent(null);
    setNewDate(null);
    setOpenDialog(false);
  };

  const handleDateChange = (date) => {
    setNewDate(date);
  };

  const handleReschedule = () => {
    if (selectedEvent && newDate) {
      const updatedEvents = events.map((event) =>
        event.id === selectedEvent.id ? { ...event, date: newDate } : event
      );
      setEvents(updatedEvents);
      handleCloseDialog();
    }
  };

  return (
    <div>
      <Grid container alignItems="center" justifyContent="space-between" style={{ backgroundColor: "dodgerblue" }}>
        <Grid item>
          <Typography variant="h6" style={{ color: "white", padding: "5%" }}>Schedules</Typography>
        </Grid>
        <Grid item style={{ paddingBottom: isSmallScreen ? "5%" : "0", paddingLeft: isSmallScreen ? "5%" : "0" }}>
          <Tag color="blue">Upcoming events: {events.length}</Tag>
        </Grid>
      </Grid>
      {events.map((event) => (
        <Card key={event.id} style={{ marginBottom: '16px' }} >
        <CardContent>
          <Grid container alignItems="center" >
            <Grid item xs={isSmallScreen ? 6 : 3} >
              <Typography variant="h5" component="div">
                {event.title}
              </Typography>
              <Typography color="text.secondary">
                {event.date.toLocaleDateString()}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => handleOpenDialog(event)}
                style={{ marginTop: '8px' }}
              >
                Reschedule
              </Button>
            </Grid>
            <Grid item xs={isSmallScreen ? 6 : 9} style={{ paddingTop: '8px' }}>
              <Typography className="event-description" variant="body2" color="text.secondary">
                {event.description}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      ))}

      <Dialog open={openDialog} onClose={handleCloseDialog} style={{ zIndex: "6" }}>
        <DialogTitle>Reschedule Event</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">
            Select a new date for the event:
          </Typography>
          <DatePicker onChange={handleDateChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleReschedule} color="primary">
            Reschedule
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EventScheduler;
