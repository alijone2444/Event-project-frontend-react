import React, { useEffect, useState } from 'react';
import { CircularProgress, Grid, IconButton, Typography } from '@mui/material';
import { ThumbUp, ThumbUpOutlined, VisibilityOutlined } from '@mui/icons-material';
import './gridview.css';
import { Spin, Button, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import createAuthenticatedRequest from '../../../../RequestwithHeader';
import constants from '../../../../Constants/constants';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { setEventsDataAll } from '../../../../ReduxStore/actions/eventsDataActionUser';
import { useDispatch, useSelector } from 'react-redux';
import { setEventsDataAdmin } from '../../../../ReduxStore/actions/eventsDataAction';
const EventCard = (props) => {
  const requestInstance = createAuthenticatedRequest();
  const dispatch = useDispatch();
  const [loadingStates, setLoadingStates] = useState({}); // Manage loading state per event
  const events = useSelector((state) => state.userAllEvents); // Adjust according to your state structure
  const AdminEvents = useSelector((state) => state.adminEvents); // Adjust according to your state structure
  const [FilteredData, setFilteredData] = useState([])
  const toggleLike = async (eventId, isLIKE) => {
    try {
      setLoadingStates(prev => ({ ...prev, [eventId]: true })); // Set loading state for specific event
      const response = await requestInstance.post(`${constants.BASE_URL}like-event`, { eventId, isLIKE });
      if (response.data) {
        const result = response.data;
        // Update the specific event in the Redux state
        const updatedEvents = events.map((event) =>
          event._id === eventId ? { ...event, isLiked: result.events.isLiked, NoOfLikes: result.events.NoOfLikes } : event
        );

        if (props.isAdmin) {
          const updateEventForAdmin = AdminEvents.map((event) =>
            event._id === eventId ? { ...event, isLiked: result.events.isLiked, NoOfLikes: result.events.NoOfLikes } : event
          );
          dispatch(setEventsDataAdmin(updateEventForAdmin));
        }
        dispatch(setEventsDataAll(updatedEvents));
        setLoadingStates(prev => ({ ...prev, [eventId]: false })); // Reset loading state for specific event
      }
    } catch (error) {
      setLoadingStates(prev => ({ ...prev, [eventId]: false })); // Reset loading state for specific event
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    const filterEvents = () => {
      console.log('event data', props.eventData)
      if (props.sortOption === 'Approved') {
        return props.eventData.filter(event => event.status === 'Approved');
      } else if (props.sortOption === 'Not Approved') {
        return props.eventData.filter(event => event.status === 'Pending');
      } else if (props.sortOption === 'Show All') {
        return props.eventData;
      }
      return []; // Default to an empty array if sortOption is unexpected
    };

    setFilteredData(filterEvents());
  }, [props.eventData, props.sortOption]);

  return (
    <Grid container spacing={3} style={{ padding: '2%' }}>
      {FilteredData.map((event, index) => (
        <Grid key={event._id} item xs={12} sm={6} md={4}>
          <div style={{ border: '1px solid lightgrey', borderRadius: '2%' }}>
            <div style={{ padding: '5%', position: 'relative' }}>
              <img
                className="event-image"
                style={{ height: '150px', }}
                src={`${constants.BASE_URL}images/${event.dpimageFileName}`}
                alt="Event"
              />
              <div style={{
                position: 'absolute',
                top: '11%',
                right: '5%',
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                padding: '8px 12px',
                borderBottomLeftRadius: '15px', // Use px for better control
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}>
                <VisibilityOutlined style={{ marginRight: '8px' }} />
                <span>{event.userViews}</span>
              </div>
            </div>

            <div style={{ padding: '5%', paddingTop: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6" component="h2" style={{ marginBottom: '2%' }} className='hover-3 truncate-title'>
                  {event.eventName}
                </Typography> <IconButton onClick={() => toggleLike(event._id, event.isLiked)} style={{ marginLeft: '8px' }}>
                  {loadingStates[event._id] ? (
                    <CircularProgress
                      key={index}
                      style={{ color: 'dodgerblue' }}
                      size={18}
                    />
                  ) : (
                    event.isLiked ? (
                      <ThumbUp style={{ color: 'blue' }} />
                    ) : (
                      <ThumbUpOutlined />
                    )
                  )}
                </IconButton>
              </div>
              <div style={{ marginBottom: '5%', color: 'black' }} className='event-description-truncate'>{event.description}</div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Button type="primary" style={{ width: '100%', background: 'DodgerBlue', color: 'white' }} onClick={() => { props.openEvent(event._id, event.eventName) }}>
                  Visit
                </Button>
                {props.showEditDelete &&
                  <Space style={{ paddingLeft: '2%' }}>
                    <Button icon={<EditOutlined />} onClick={() => { props.editEvent(event._id) }} />
                    {props.showLoading ? <Spin /> : <Button icon={<DeleteOutlined />} danger onClick={() => { props.handleDeleteEvent(event._id) }} />}
                  </Space>
                }
              </div>
              {props.showEditDelete &&
                <Button
                  type="primary"
                  style={{ marginTop: '2%', width: '100%', background: event.status === 'Approved' ? 'green' : 'dodgerblue', color: 'white' }}
                  onClick={() => { props.handleApprovedEvent(event._id, event.status === 'Approved' ? true : false) }}

                  icon={event.status === 'Approved' ? <CheckOutlined /> : <></>}
                >
                  {event.status === 'Approved' ? 'Approved' : 'Approve'}
                </Button>}
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default EventCard;
