import EventCard from "../Home/AdminHome/AdminEvents/gridview";
import WrapperComponent from "../../FooterAndHeaderwrapper";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Spin, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { setEventsDataAll } from "../../ReduxStore/actions/eventsDataActionUser";
import createAuthenticatedRequest from '../../RequestwithHeader';
import constants from '../../Constants/constants';
function AllEvents() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const Events = useSelector((state) => state.userAllEvents);
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [pageSize, setPageSize] = useState(6); // Items per page state
    const [totalPages, setTotalPages] = useState(1); // Total pages state
    const [lastVisitedPage, setLastVisitedPage] = useState(1); // Track last visited page

    const fetchEvents = async (page, size) => {
        try {
            setLoading(true);
            const requestInstance = createAuthenticatedRequest();
            const response = await requestInstance.get(`${constants.BASE_URL}get-events`, {
                params: {
                    amount: 'All',
                    page: page,
                    pageSize: size,
                },
            });
            if (response && response.data) {
                dispatch(setEventsDataAll([...Events, ...response.data.events]));
                setCurrentPage(response.data.currentPage);
                setTotalPages(response.data.totalPages);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching events:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents(currentPage, pageSize);
    }, []); // Fetch data only once when the component mounts

    const handleOpenEvent = (id) => {
        const foundEvent = Events.find((event) => event._id === id);
        navigate(`/eventdetail/${foundEvent.eventName}`, { state: { data: foundEvent, toNavigate: '/events' } });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page); // Update currentPage state
        if (page > lastVisitedPage) {
            fetchEvents(page, pageSize); // Fetch data only when navigating to a new page
            setLastVisitedPage(page);
        }
    };

    return (
        <WrapperComponent>
            {loading ? (
                <div style={{ height: '60vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin size="large" />
                </div>
            ) : (
                <div>
                    <EventCard
                        eventData={Events.slice((currentPage - 1) * pageSize, currentPage * pageSize)} // Slice the eventsData array based on current page and page size
                        showEditDelete={false}
                        openEvent={handleOpenEvent}
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
            )}
        </WrapperComponent>
    );
}
export default AllEvents;