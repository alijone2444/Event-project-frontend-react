import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import constants from '../../Constants/constants';
import createAuthenticatedRequest from '../../RequestwithHeader';
import { setEventsDataAll } from '../../ReduxStore/actions/eventsDataActionUser';

const GetAllEvents = (length) => {
    const requestInstance = createAuthenticatedRequest();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            console.log('data fetching:')
            try {
                const response = await requestInstance.get(`${constants.BASE_URL}get-events`, {
                    params: {
                        amount: 'All',
                    },
                });
                dispatch(setEventsDataAll(response.data.events));
                console.log('Response:', response.data.events);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        if (length === 0) {
            fetchData();
        }
    }, []);
};

export default GetAllEvents;
