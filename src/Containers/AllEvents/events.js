import EventCard from "../Home/AdminHome/AdminEvents/gridview";
import WrapperComponent from "../../FooterAndHeaderwrapper";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Spin, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { setEventsDataAll } from "../../ReduxStore/actions/eventsDataActionUser";
import { setCurrentPage, setPageSize, setTotalPages, setLastvisited } from "../../ReduxStore/actions/eventsPaginationActions";
import createAuthenticatedRequest from '../../RequestwithHeader';
import constants from '../../Constants/constants';
import { useMediaQuery } from "@mui/material";
import ScrollingHorizontally from "../Home/StudentHome/HomePageScrolls/HrScroll";
import { setEventsDataAdmin } from "../../ReduxStore/actions/eventsDataAction";
import { setEventsDataPopular, setEventsDataUserRecent } from "../../ReduxStore/actions/eventsDataActionUser";
function AllEvents() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const Events = useSelector((state) => state.userAllEvents);
    const recentEvents = useSelector((state) => state.userRecentEvents);
    const popularEvents = useSelector((state) => state.userpopularEvents);
    const { currentPage, pageSize, totalPages, lastVisitedPage } = useSelector((state) => state.eventspagination);
    const isSmallScreen = useMediaQuery('(max-width:768px)');
    console.log('all events are:', Events)
    const requestInstance = createAuthenticatedRequest();

    const fetchEvents = async (page, size) => {
        try {
            setLoading(true);
            const response = await requestInstance.get(`${constants.BASE_URL}get-events`, {
                params: {
                    amount: 'All',
                    page: page,
                    pageSize: size,
                },
            });
            if (response && response.data) {
                dispatch(setEventsDataAll([...Events, ...response.data.events]));
                dispatch(setCurrentPage(response.data.currentPage));
                dispatch(setTotalPages(response.data.totalPages));
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching events:', error);
            setLoading(false);
        }
    };
    useEffect(() => {
        if (popularEvents.length === 0) {
            requestInstance
                .get(`${constants.BASE_URL}get-events`, {
                    params: {
                        amount: 'get-popular',
                    },
                })
                .then(response => {
                    dispatch(setEventsDataPopular(response.data.events));
                })
                .catch(err => {
                    console.error('Error:', err);
                });
        }
    }, [dispatch])

    useEffect(() => {
        if (recentEvents.length === 0) {
            requestInstance
                .get(`${constants.BASE_URL}get-events`, {
                    params: {
                        amount: 'recent',
                    },
                })
                .then(response => {
                    dispatch(setEventsDataUserRecent(response.data.events));
                })
                .catch(err => {
                    console.error('Error:', err);
                });
        }
    }, [dispatch])
    useEffect(() => {
        if (Events.length === 0) {
            fetchEvents(currentPage, pageSize);
        } else {
            setLoading(false);
        }
    }, [dispatch]); // Fetch data only once when the component mounts

    const handleOpenEvent = (event) => {
        const { _id, eventName } = event
        navigate(`/eventdetail/${eventName}`, { state: { data: { _id, eventName }, toNavigate: '/events' } });
    };
    const handlePageChange = (page) => {
        dispatch(setCurrentPage(page)); // Update currentPage state
        if (page > lastVisitedPage) {
            fetchEvents(page, pageSize); // Fetch data only when navigating to a new page
            dispatch(setLastvisited(page));
        }
    };
    const handleApprovedEvent = async (eventId, approve) => {
        try {
            console.log('Approve:', approve);

            // Send a PUT request to update the event's status
            const response = await requestInstance.put(`${constants.BASE_URL}events/${eventId}/approve`, {
                approve: approve,  // Boolean value to approve or set to pending
            });

            // Handle success
            console.log('Event status updated:', response.data.message);

            // Get the updated event from the response
            const updatedEvent = response.data.event; // Assuming the backend returns the updated event
            console.log('Updated Event:', updatedEvent);
            const updatedEvents = Events.map((event) =>
                event._id === updatedEvent._id ? { ...event, status: updatedEvent.status } : event
            );
            dispatch(setEventsDataAll(updatedEvents));

        } catch (error) {
            console.error('Error updating event status:', error.response ? error.response.data : error.message);
        }
    };


    return (
        <WrapperComponent>
            {loading ? (
                <div style={{ height: '60vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    <div style={{ marginBottom: '0%', textAlign: 'center', margin: '5%', marginTop: '2%' }}>
                        <Typography variant='h5' style={{ fontWeight: 'bold' }}>
                            All Events
                        </Typography>
                        <EventCard
                            eventData={Events.slice((currentPage - 1) * pageSize, currentPage * pageSize)} // Slice the eventsData array based on current page and page size
                            showEditDelete={false}
                            handleApprovedEvent={(id, status) => handleApprovedEvent(id, status)}
                            openEvent={handleOpenEvent}
                            sortOption={'Approved'}
                        />
                        <div style={{ width: '100%', zIndex: 99, marginBottom: '5%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Pagination
                                current={currentPage}
                                total={totalPages * pageSize} // Multiply totalPages by pageSize
                                pageSize={pageSize}
                                onChange={handlePageChange}
                                style={{ textAlign: 'center' }}
                            />
                        </div>
                    </div>
                    <div style={{ marginBottom: "5%", marginTop: isSmallScreen ? "5%" : "2.5%" }}>
                        <ScrollingHorizontally data={recentEvents} title={'Recent'} subheader={'Check Latest Happenings'} toNavigate='/events' DescriptionKey='recentEvents' />
                        <ScrollingHorizontally data={popularEvents} title={'Hot'} subheader={'Find Trending Occasions'} toNavigate='/events' DescriptionKey='popularEvents' />
                    </div>

                </>

            )}


        </WrapperComponent>
    );
}

export default AllEvents;
