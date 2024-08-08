import React, { useState } from 'react';
import { Modal, Input, List, Radio, Spin } from 'antd';
import createAuthenticatedRequest from '../../RequestwithHeader';
import constants from '../../Constants/constants';
import { useNavigate } from 'react-router-dom';
import recordSocietyVisit from '../functions/recortSocietyVisits';

const SearchModal = (props) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showloading, setShowLoading] = useState(false);
    const [searchType, setSearchType] = useState('events'); // Default to 'events'
    const requestInstance = createAuthenticatedRequest();

    const Loader = () => (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Spin size="large" />
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

    const handleSearchChange = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value) {
            if (searchType === 'events') {
                await fetchEventSuggestions(value);
            } else {
                await fetchSocietySuggestions(value);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleItemClick = async (item) => {
        try {
            setShowLoading(true);
            const endpoint = searchType === 'events' ? 'get-events' : 'get-societies';
            const response = await requestInstance.get(`${constants.BASE_URL}${endpoint}`, {
                params: {
                    amount: 'One',
                    eventName: item
                }
            });
            if (response && response.data) {
                setShowLoading(false);
                props.onclose();
                console.log('item', item)
                if (searchType === 'events') {
                    navigate(`/eventdetail/${response.data.events[0].eventName}`, { state: { data: response.data.events[0], toNavigate: '/Home' } });
                } else {
                    navigate('society-page', { state: { ...response.data.society, Simple: true } }); recordSocietyVisit(response.data.society.name)
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            props.onclose();
            setShowLoading(false);
        }
    };

    return (
        <Modal
            title="Search"
            visible={props.open}
            onCancel={props.onclose}
            footer={null} // Remove OK and Cancel buttons
        >
            <Radio.Group value={searchType} onChange={e => setSearchType(e.target.value)} style={{ marginBottom: 16 }}>
                <Radio.Button value="events">Events</Radio.Button>
                <Radio.Button value="societies">Societies</Radio.Button>
            </Radio.Group>
            <Input
                placeholder={`Type ${searchType === 'events' ? 'event' : 'society'} name`}
                value={searchTerm}
                onChange={handleSearchChange}
            />
            {showloading && <Loader />}
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
        </Modal>
    );
};

export default SearchModal;
