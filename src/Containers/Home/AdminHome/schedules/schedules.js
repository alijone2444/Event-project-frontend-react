import React, { useState, useEffect } from 'react';
import { Tag, Spin } from 'antd';
import './schedules.css';
import { Card, CardContent, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid, useMediaQuery } from '@mui/material';
import { format, parse, parseISO } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import constants from '../../../../Constants/constants';
import createAuthenticatedRequest from '../../../../RequestwithHeader';
import { setEventsDataAdmin } from '../../../../ReduxStore/actions/eventsDataAction';
import { setPageSize, setTotalPages, setLastvisited, setCurrentPage } from '../../../../ReduxStore/actions/eventsPaginationActions';
import zIndex from '@mui/material/styles/zIndex';

const EventScheduler = () => {
  const eventsData = useSelector((state) => state.adminEvents);
  const { currentPage, pageSize, totalPages, lastVisitedPage } = useSelector((state) => state.eventspagination);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newStartDate, setNewStartDate] = useState(null);
  const [newEndDate, setNewEndDate] = useState(null);
  const [newStartTime, setNewStartTime] = useState('');
  const [newEndTime, setNewEndTime] = useState('');
  const [showLoading, setshowLoading] = useState(false);
  const dispatch = useDispatch();
  const requestInstance = createAuthenticatedRequest();

  useEffect(() => {
    if (eventsData.length === 0) {
      setshowLoading(true);
      fetchEvents(currentPage);
    }
  }, [dispatch, currentPage]);

  const fetchEvents = async (page) => {
    try {
      const response = await requestInstance.get(`${constants.BASE_URL}get-events`, {
        params: {
          amount: 'get-all',
          page: page,
          pageSize: pageSize,
        },
      });
      dispatch(setEventsDataAdmin([...eventsData, ...response.data.events]));
      dispatch(setCurrentPage(response.data.currentPage));
      dispatch(setTotalPages(response.data.totalPages));
      setshowLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setshowLoading(false);
    }
  };

  const handleOpenDialog = (event) => {
    setSelectedEvent(event);
    setNewStartDate(new Date(event.startDate));
    setNewEndDate(new Date(event.endDate));
    setNewStartTime(event.startTime);
    setNewEndTime(event.endTime);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedEvent(null);
    setNewStartDate(null);
    setNewEndDate(null);
    setNewStartTime('');
    setNewEndTime('');
    setOpenDialog(false);
  };

  const handleReschedule = async () => {
    if (selectedEvent && newStartDate && newEndDate && newStartTime && newEndTime) {
      const updatedEvent = {
        ...selectedEvent,
        startDate: newStartDate.toISOString(),
        endDate: newEndDate.toISOString(),
        startTime: newStartTime,
        endTime: newEndTime,
      };

      try {
        await requestInstance.put(`${constants.BASE_URL}update-event/${selectedEvent._id}`, updatedEvent);
        const updatedEvents = eventsData.map((event) =>
          event._id === selectedEvent._id ? updatedEvent : event
        );
        dispatch(setEventsDataAdmin(updatedEvents));
      } catch (error) {
        console.error('Error updating event:', error);
      }

      handleCloseDialog();
    }
  };

  const handleViewMore = () => {
    fetchEvents(currentPage + 1);
  };

  return (
    <>
      {showLoading ?
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Spin size='large' /></div>
        : <div>
          <Grid container alignItems="center" justifyContent="space-between" style={{ backgroundColor: "dodgerblue" }}>
            <Grid item>
              <Typography variant="h6" style={{ color: "white", padding: "5%" }}>Schedules</Typography>
            </Grid>
            <Grid item style={{ paddingBottom: isSmallScreen ? "5%" : "0", paddingLeft: isSmallScreen ? "5%" : "0" }}>
              <Tag color="blue">Upcoming events: {eventsData.length}</Tag>
            </Grid>
          </Grid>
          {eventsData.map((event) => (
            <Card key={event._id} style={{ marginBottom: '16px', position: 'relative', color: 'white', margin: '1%' }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${constants.BASE_URL}images/${event.dpimageFileName})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(3px)',
                zIndex: 1,
                opacity: 0.6
              }} />
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 2
              }} />
              <CardContent style={{ position: 'relative', zIndex: 3, padding: '16px' }}>
                <Grid container alignItems="center">
                  <Grid item xs={isSmallScreen ? 6 : 3}>
                    <Typography variant="h5" component="div" style={{ color: 'white' }}>
                      {event.eventName}
                    </Typography>
                    <Typography color="text.secondary" style={{ color: 'lightgrey' }}>
                      {format(parseISO(event.startDate), "dd MMMM yyyy")}
                    </Typography>
                    <Typography color="text.secondary" style={{ color: 'lightgrey' }}>
                      {`Time: ${event.startTime ? format(parse(event.startTime, 'HH:mm', new Date()), 'h:mm a') : 'Not defined'} to ${event.endTime ? format(parse(event.endTime, 'HH:mm', new Date()), 'h:mm a') : 'Not defined'}`}
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => handleOpenDialog(event)}
                      sx={{
                        marginTop: '8px',
                        color: 'white',
                        border: '2px solid grey',
                        '&:hover': {
                          borderColor: 'white', // Optional: Change border color on hover
                          backgroundColor: 'rgba(255, 255, 255, 0.1)', // Optional: Add slight background color on hover
                        }
                      }}
                    >
                      Reschedule
                    </Button>
                  </Grid>
                  <Grid item xs={isSmallScreen ? 6 : 9} style={{ paddingTop: '8px', }}>
                    <Typography className="event-description" variant="body2" color="lightgrey">
                      {event.description}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
          {currentPage < totalPages &&
            <Button
              variant="contained"
              color="primary"
              onClick={handleViewMore}
              disabled={currentPage === totalPages}
              style={{ margin: '16px' }}
            >
              View More
            </Button>
          }

          <Dialog open={openDialog} onClose={handleCloseDialog} style={{ zIndex: "6" }}>
            <DialogTitle>Reschedule Event</DialogTitle>
            <DialogContent>
              <Typography variant="subtitle1">
                Select a new date and time for the event:
              </Typography>
              <TextField
                label="New Start Date"
                type="date"
                value={newStartDate ? format(newStartDate, 'yyyy-MM-dd') : ''}
                onChange={(e) => setNewStartDate(parseISO(e.target.value))}
                fullWidth
                margin="normal"
              />
              <TextField
                label="New End Date"
                type="date"
                value={newEndDate ? format(newEndDate, 'yyyy-MM-dd') : ''}
                onChange={(e) => setNewEndDate(parseISO(e.target.value))}
                fullWidth
                margin="normal"
              />
              <TextField
                label="New Start Time"
                type="time"
                value={newStartTime}
                onChange={(e) => setNewStartTime(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="New End Time"
                type="time"
                value={newEndTime}
                onChange={(e) => setNewEndTime(e.target.value)}
                fullWidth
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={handleReschedule} color="primary">
                Reschedule
              </Button>
            </DialogActions>
          </Dialog>
        </div >}
    </>
  );
};

export default EventScheduler;
