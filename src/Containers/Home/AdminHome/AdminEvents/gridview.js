import React, { useEffect, useState } from 'react';
import { Grid, IconButton, Typography } from '@mui/material';
import { ThumbUp, ThumbUpOutlined } from '@mui/icons-material';
import './gridview.css';
import { Spin, Button, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import createAuthenticatedRequest from '../../../../RequestwithHeader';
import constants from '../../../../Constants/constants';
import { setEventsDataAll } from '../../../../ReduxStore/actions/eventsDataActionUser';
import { useDispatch, useSelector } from 'react-redux';

const EventCard = (props) => {
  const requestInstance = createAuthenticatedRequest();
  const dispatch = useDispatch();
  const events = useSelector((state) => state.userAllEvents); // Adjust according to your state structure
  console.log(props)
  const toggleLike = async (eventId, isLIKE) => {
    try {
      const response = await requestInstance.post(`${constants.BASE_URL}like-event`, { eventId, isLIKE });
      if (response.data) {
        const result = response.data;
        console.log('res', result)
        // Update the specific event in the Redux state
        const updatedEvents = events.map((event) =>
          event._id === eventId ? { ...event, isLiked: result.events.isLiked, NoOfLikes: result.events.NoOfLikes } : event
        );

        dispatch(setEventsDataAll(updatedEvents));
        console.log(events)
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };
  useEffect(() => {
    console.log(props, 'fa')
  }, [props])
  return (
    <Grid container spacing={3} style={{ padding: '2%' }}>
      {props.eventData.map((event) => (
        <Grid key={event._id} item xs={12} sm={6} md={4}>
          <div style={{ border: '1px solid lightgrey', borderRadius: '2%' }}>
            <div style={{ padding: '5%' }}>
              <img
                className="event-image"
                style={{ height: '150px' }}
                src={`${constants.BASE_URL}images/${event.dpimageFileName}`}
                alt="Event"
              />
            </div>
            <div style={{ padding: '5%', paddingTop: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5" component="h2" style={{ marginBottom: '2%' }} className='hover-3 truncate-title'>
                  {event.eventName}
                </Typography>
                <IconButton onClick={() => toggleLike(event._id, event.isLiked)} style={{ marginLeft: '8px' }}>
                  {event.isLiked ? <ThumbUp style={{ color: 'blue' }} /> : <ThumbUpOutlined />}
                </IconButton>
              </div>
              <div style={{ marginBottom: '5%' }} className='event-description-truncate'>{event.description}</div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Button type="primary" style={{ width: '100%', background: 'DodgerBlue', color: 'white' }} onClick={() => { props.openEvent(event._id) }}>
                  Visit
                </Button>
                {props.showEditDelete &&
                  <Space style={{ paddingLeft: '2%' }}>
                    <Button icon={<EditOutlined />} onClick={() => { props.editEvent(event._id) }} />
                    {props.showLoading ? <Spin /> : <Button icon={<DeleteOutlined />} danger onClick={() => { props.handleDeleteEvent(event._id) }} />}
                  </Space>
                }
              </div>
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default EventCard;
