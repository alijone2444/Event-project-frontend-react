import React, { useState } from 'react';
import { Modal, Input, List, Radio, Spin } from 'antd';
import createAuthenticatedRequest from '../../RequestwithHeader';
import constants from '../../Constants/constants';
import { useNavigate } from 'react-router-dom';
import recordSocietyVisit from '../functions/recortSocietyVisits';
import { CircularProgress } from '@mui/material';
const SearchModal = (props) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showloading, setShowLoading] = useState(false);
    const [searchType, setSearchType] = useState('events'); // Default to 'events'
    const requestInstance = createAuthenticatedRequest();
    const [showFullscreenLoading, setShowFullscreenLoading] = useState(false); // New state for fullscreen loading

    const Loader = () => (
        <div style={{ textAlign: 'center', marginLeft: '5%' }}>
            <CircularProgress size={15} />
        </div>
    );
    const FullscreenLoader = () => (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
        }}>
            <CircularProgress size={30} style={{ color: 'white' }} />
        </div>
    );


    // Fetch event suggestions
    const fetchEventSuggestions = async (query) => {
        try {
            const response = await requestInstance.get(`${constants.BASE_URL}search`, {
                params: { query }
            });
            if (response.data) {
                const fetchedSuggestions = response.data.map(event => event.eventName);
                setSuggestions(fetchedSuggestions);
            }
        } catch (error) {
            console.error('Error fetching event suggestions:', error);
            setSuggestions([]);
        }
    };

    // Fetch society suggestions
    const fetchSocietySuggestions = async (query) => {
        try {
            const response = await requestInstance.get(`${constants.BASE_URL}search-societies`, {
                params: { query }
            });
            if (response.data) {
                const fetchedSuggestions = response.data.map(society => society.name);
                setSuggestions(fetchedSuggestions);

            }
        } catch (error) {
            console.error('Error fetching society suggestions:', error);
            setSuggestions([]);
        }
    };

    // Fetch profile suggestions
    const fetchProfileSuggestions = async (query) => {
        try {
            const response = await requestInstance.get(`${constants.BASE_URL}search-profiles`, {
                params: { query }
            });
            if (response.data) {
                const fetchedSuggestions = response.data.map(profile => profile.username);
                setSuggestions(fetchedSuggestions);
            }
        } catch (error) {
            console.error('Error fetching profile suggestions:', error);
            setSuggestions([]);
        }
    };

    const handleSearchChange = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value) {
            setShowLoading(true);
            if (searchType === 'events') {
                await fetchEventSuggestions(value);
            } else if (searchType === 'societies') {
                await fetchSocietySuggestions(value);
            } else if (searchType === 'profiles') {
                await fetchProfileSuggestions(value);
            }
        } else {
            setSuggestions([]);
            setShowLoading(false);
        }
    };

    const handleItemClick = async (item) => {
        try {
            setShowFullscreenLoading(true);
            setShowLoading(true);
            let endpoint, params;
            if (searchType === 'events') {
                endpoint = 'get-events';
                params = { amount: 'One', eventName: item };
            } else if (searchType === 'societies') {
                endpoint = 'get-societies';
                params = { amount: 'One', eventName: item };
            } else if (searchType === 'profiles') {
                endpoint = 'get-profile-data';
                params = { username: item };
            }
            const response = await requestInstance.get(`${constants.BASE_URL}${endpoint}`, {
                params
            });
            if (response && response.data) {
                setShowFullscreenLoading(false);
                setShowLoading(false);
                props.onclose();
                if (searchType === 'events') {
                    navigate(`/eventdetail/${response.data.events[0].eventName}`, { state: { data: response.data.events[0], toNavigate: '/Home' } });
                } else if (searchType === 'societies') {
                    navigate('society-page', { state: { ...response.data.society, Simple: true } });
                    recordSocietyVisit(response.data.society.name);
                } else if (searchType === 'profiles') {
                    navigate('/SearchedProfile', { state: { profile: response.data.profile } });
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            props.onclose();
            setShowLoading(false);
            setShowFullscreenLoading(false);
        }
    };

    return (
        <Modal
            title="Search"
            visible={props.open}
            onCancel={props.onclose}
            footer={null} // Remove OK and Cancel buttons
        >
            <Radio.Group value={searchType} onChange={e => setSearchType(e.target.value)} style={{ marginBottom: '5%' }}>
                <Radio.Button value="events">Events</Radio.Button>
                <Radio.Button value="societies">Societies</Radio.Button>
                <Radio.Button value="profiles">Profiles</Radio.Button>
            </Radio.Group>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '5%' }}>
                <Input
                    placeholder={`Type ${searchType === 'events' ? 'event' : searchType === 'societies' ? 'society' : 'username'}`}
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                {showloading && <Loader />}
            </div>

            <List
                dataSource={suggestions}
                renderItem={item => (
                    <List.Item
                        onClick={() => handleItemClick(item)}
                        style={{ cursor: 'pointer' }}
                    >
                        {item}
                    </List.Item>
                )}
            />
            {showFullscreenLoading && <FullscreenLoader />}

        </Modal>
    );
};

export default SearchModal;
