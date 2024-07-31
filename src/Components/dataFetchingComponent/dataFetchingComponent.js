import { useDispatch, useSelector } from "react-redux";
import createAuthenticatedRequest from "../../RequestwithHeader";
import constants from "../../Constants/constants";
import convertEvents from "../functions/convertEventsForCalander";
import { setCalanderData } from "../../ReduxStore/actions/CalanderAction";
import { setThreeSocieties } from "../../ReduxStore/actions/threeSocietiesAction";
import { setConstants } from "../../ReduxStore/actions/setConstantsAction";
import { useEffect } from "react";
import { setEventsDataAll } from "../../ReduxStore/actions/eventsDataActionUser";
import { setCurrentPage } from "../../ReduxStore/actions/eventsPaginationActions";
import { setTotalPages } from "../../ReduxStore/actions/eventsPaginationActions";
const EventDataProvider = () => {

    const calanderevents = useSelector(state => state.CalanderEvents)
    const SavedConstants = useSelector(state => state.SavedConstants);
    const { currentPage, pageSize, totalPages, lastVisitedPage } = useSelector((state) => state.eventspagination);
    const Allevents = useSelector((state) => state.userAllEvents);
    const requestInstance = createAuthenticatedRequest()
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await requestInstance.get(`${constants.BASE_URL}calander-upcoming-events`);
                if (response.data && Array.isArray(response.data)) {
                    const calendarEvents = convertEvents(response.data);
                    dispatch(setCalanderData(calendarEvents))
                } else {
                    console.error('Error fetching events: Invalid data format');
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        if (calanderevents.length === 0) {
            fetchEvents();
        }
    }, [dispatch]);


    useEffect(() => {
        const fetchThreeSocietiesAndConstants = async () => {
            try {
                const response = await requestInstance.get(`${constants.BASE_URL}three-societies`); // or use fetch
                dispatch(setThreeSocieties(response.data))
                const response2 = await requestInstance.get(`${constants.BASE_URL}get-constants`); // or use fetch
                console.log('response 2', response2.data)
                dispatch(setConstants(response2.data))
            } catch (err) {
                console.log(err.message)
            }
        };
        const areAllPropertiesEmpty = Object.values(SavedConstants).every(
            (val) => typeof val === 'object' && Object.keys(val).length === 0
        );
        if (areAllPropertiesEmpty) {
            fetchThreeSocietiesAndConstants();
        }
    }, [dispatch])
    const fetchAllEvents = async (page, size) => {
        try {
            const response = await requestInstance.get(`${constants.BASE_URL}get-events`, {
                params: {
                    amount: 'All',
                    page: page,
                    pageSize: size,
                },
            });
            if (response && response.data) {
                dispatch(setEventsDataAll([...Allevents, ...response.data.events]));
                dispatch(setCurrentPage(response.data.currentPage));
                dispatch(setTotalPages(response.data.totalPages));
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        if (Allevents.length === 0) {
            fetchAllEvents(currentPage, pageSize);
        }
    }, [dispatch]);


    return null
}
export default EventDataProvider
