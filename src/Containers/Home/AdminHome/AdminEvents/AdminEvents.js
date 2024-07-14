import React, { useEffect, useState } from 'react';
import { Button, Radio, Select, Space, Table, Tag, Spin, Pagination } from 'antd'; // Import Pagination
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import './gridview.css'
import axios from 'axios';
import columns from '../../../../Constants/AdminGridtableColumns';
import { InboxOutlined } from '@ant-design/icons';
import {
  PlusOutlined,
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import constants from '../../../../Constants/constants';
import EditCalendarOutlined from '@mui/icons-material/EditCalendarOutlined'
import EventCard from './gridview';
import CreateEvent from '../../../../Components/EventCreation/eventcreationComponent';
import createAuthenticatedRequest from '../../../../RequestwithHeader';
import { setEventsDataAdmin } from '../../../../ReduxStore/actions/eventsDataAction';
import { useDispatch, useSelector } from 'react-redux';
import NoDataComponent from '../../../../Components/noData/noDataIcon';
import OpenEvent from '../../../../Components/OpenEvent/openEvent';

const { Option } = Select;

const EventManagementInterface = () => {
  const dispatch = useDispatch()
  const eventsData = useSelector((state) => state.adminEvents);
  const [sortOption, setSortOption] = useState('latest');
  const [viewType, setViewType] = useState('grid');
  const [showeventsComponent, setshoweventsComponent] = useState(true)
  const requestInstance = createAuthenticatedRequest()
  const [AgainRunUseEffect, setAgainRunUseEffect] = useState(false)
  const [AgaingetReduxValues, setAgaingetReduxValues] = useState(false)
  const [showOpenedEvent, setshowOpenedEvent] = useState(false)
  const [eventToSendToOpenEvent, seteventToSendToOpenEvent] = useState([])
  const [showLoading, setshowLoading] = useState(false)
  const [BackgroundImage, setBackgroundImage] = useState(null)
  const [edit, setEdit] = useState([])
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [pageSize, setPageSize] = useState(6); // Items per page state
  const [totalPages, setTotalPages] = useState(1); // Total pages state

  useEffect(() => {
    console.log('thh new value is', AgainRunUseEffect);
    if (eventsData.length === 0 || AgaingetReduxValues) {
      console.log('running again')
      setshowLoading(true); // Set loading to true when data fetching starts
      requestInstance
        .get(`${constants.BASE_URL}get-events`, {
          params: {
            amount: 'get-all',
            page: currentPage,
            pageSize: pageSize
          },
        })
        .then(response => {
          dispatch(setEventsDataAdmin([...eventsData, ...response.data.events]));
          console.log('respones:', response.data.events, response.data.currentPage, response.data.totalPages);
          setCurrentPage(response.data.currentPage)
          setTotalPages(response.data.totalPages);
          setshowLoading(false); // Set loading to false when data fetching completes
        })
        .catch(err => {
          console.error('Error:', err);
          setshowLoading(false); // Set loading to false on error
        });
    }
  }, [dispatch, AgainRunUseEffect]);
  const handleDeleteEvent = async (id) => {
    setshowLoading(true)
    try {
      // Make the DELETE request to the API endpoint
      const response = await requestInstance.delete(`${constants.BASE_URL}delete-event/${id}`);
      // Handle the response
      if (response.data.success === true) {
        setshowLoading(false)
        setAgainRunUseEffect(!AgainRunUseEffect);
        setAgaingetReduxValues(true)
      };
    } catch (error) {
      setshowLoading(false)
      console.error('Error deleting the event:', error.response ? error.response.data : error.message);
      // Handle errors, e.g., display an error message to the user
    }
  }

  const handleEditEvent = (id) => {
    const foundEvent = eventsData.find((event) => event._id === id);
    if (foundEvent) {
      console.log('Found event:', foundEvent);
      setshoweventsComponent(false);
      setEdit(foundEvent)
    } else {
      console.log('Event not found with id:', id);
    }
  }

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const handleViewTypeChange = (e) => {
    setViewType(e.target.value);
  };

  const handleEventCreation = () => {
    setshoweventsComponent(false)
  }

  const handleopenEvent = (id) => {
    const foundEvent = eventsData.find((event) => event._id === id);
    if (foundEvent) {
      console.log('Found event:', foundEvent);
      seteventToSendToOpenEvent(foundEvent)
    } else {
      console.log('Event not found with id:', id);
    }
    setBackgroundImage(`url(${constants.BASE_URL}images/${foundEvent.dpimageFileName})`)
    setshowOpenedEvent(true)
  }
  const handlePageChange = (page) => {
    setCurrentPage(page); // Update current page state
    setAgainRunUseEffect(true);
    setAgaingetReduxValues(true)
  };


  return (
    <>
      {showLoading ?
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Spin size='large' /></div>
        :
        <Grid container>
          <div style={{
            backgroundImage: BackgroundImage,
            position: 'fixed',
            height: '100vh',
            width: '100%',
            filter: 'blur(50px)', // Apply blur to the content of the div
          }}></div>
          {showeventsComponent ? (
            <>
              <Grid container style={{ background: "DodgerBlue", position: 'sticky', top: 0, zIndex: '2' }}>
                <Grid item xs={4} sm={4} md={4} lg={4}>
                  <div style={{ display: "flex", alignItems: "center", paddingLeft: "5%", height: "100%" }}>
                    <div style={{ color: "white", fontSize: '20px' }}>Manage events<span style={{ paddingLeft: "5px" }}><EditCalendarOutlined /></span></div>
                  </div>
                </Grid>
                <Grid item xs={8} sm={8} md={8} lg={8} style={{ textAlign: 'right' }}>
                  <Grid container>
                    <Grid item xs={12} sm={8} md={8} lg={10} style={{ padding: "2%" }}>
                      <Select defaultValue="latest" onChange={handleSortChange} >
                        <Option value="latest">Latest</Option>
                        <Option value="mostpopular">Most Popular</Option>
                      </Select>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={2} style={{ padding: "2%" }}>
                      <Radio.Group onChange={handleViewTypeChange} defaultValue="grid" buttonStyle="solid" value={viewType} >
                        <Radio.Button value="grid" style={{ border: '2px solid dodgerblue' }}><AppstoreOutlined style={{ color: "black", }} /></Radio.Button>
                        <Radio.Button value="plain" style={{ border: '2px solid white' }}><UnorderedListOutlined /></Radio.Button>
                      </Radio.Group>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  {viewType === 'grid' ? (
                    <div style={{ marginBottom: '15%' }}>
                      {eventsData.length === 0 ? (
                        <NoDataComponent />
                      ) : (
                        showOpenedEvent ? <div style={{ padding: '2%' }}><OpenEvent eventData={eventToSendToOpenEvent} /></div>
                          :
                          <EventCard eventData={eventsData.slice((currentPage - 1) * pageSize, currentPage * pageSize)} // Slice the eventsData array based on current page and page size
                            showEditDelete={true}
                            openEvent={(id) => { handleopenEvent(id) }}
                            editEvent={(id) => { handleEditEvent(id) }}
                            showLoading={showLoading}
                            handleDeleteEvent={(id) => { handleDeleteEvent(id) }}
                          />
                      )}
                    </div>
                  ) : (
                    <div style={{ overflowX: 'auto' }}>
                      {/* Wrap table with overflowX */}
                      <Table
                        columns={columns(handleDeleteEvent)} // Pass the callback function to the columns configuration
                        dataSource={eventsData}
                        pagination={false} // Disable server-side pagination
                      />
                    </div>
                  )}
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <div className='hover-2' style={{ width: "100%", zIndex: 998, position: "fixed", top: 'auto', bottom: 0, height: '34px', paddingRight: "5%" }}>
                    <div>
                      <div style={{ textAlign: "center", background: "white" }} onClick={showOpenedEvent ? () => { setshowOpenedEvent(false); setBackgroundImage(null) } : handleEventCreation}>
                        <Button type="primary" icon={showOpenedEvent ? <ArrowLeftOutlined /> : <PlusOutlined />} style={{ flexGrow: 1, background: 'white', marginRight: "20%", color: 'DodgerBlue' }}>
                          {showOpenedEvent ? "Go Back" : "Add Event"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
              {/* Add pagination component */}
              <div style={{ width: '100%', zIndex: 99, marginBottom: '5%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Pagination
                  current={currentPage}
                  total={totalPages * pageSize} // Multiply totalPages by pageSize
                  pageSize={pageSize}
                  onChange={handlePageChange}
                  style={{ textAlign: 'center' }}
                />
              </div>
            </>
          ) : (
            <Grid container>
              <Grid item xs={12}>
                <CreateEvent
                  onclose={() => {
                    setshoweventsComponent(true);
                    setAgainRunUseEffect(!AgainRunUseEffect);
                    setAgaingetReduxValues(true)
                    setEdit([])
                  }}
                  edit={edit}
                />
              </Grid>
            </Grid>
          )}
        </Grid>

      }</>
  );
};

export default EventManagementInterface;

