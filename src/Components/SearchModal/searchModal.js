import React, { useState } from 'react';
import { Modal, Button, Input, List } from 'antd';
import createAuthenticatedRequest from '../../RequestwithHeader';
import constants from '../../Constants/constants';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
const SearchModal = (props) => {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showloading, setshowloading] = useState(false)
    const requestInstance = createAuthenticatedRequest()
    const Loader = () => (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Spin size="large" />
        </div>
    );

    const handleSearchChange = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value) {
            try {
                const response = await requestInstance.get(`${constants.BASE_URL}search`, {
                    params: {
                        query: value
                    }
                });
                if (response.data) {
                    const fetchedSuggestions = response.data.map(event => event.eventName); // Assuming eventName is what you want to display
                    setSuggestions(fetchedSuggestions);
                }
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleItemClick = async (item) => {
        try {
            setshowloading(true)
            const response = await requestInstance.get(`${constants.BASE_URL}get-events`, {
                params: {
                    amount: 'One',
                    eventName: item
                },

            })
            if (response && response.data) {
                setshowloading(false)
                props.onclose();
                navigate(`/eventdetail/${response.data.events[0].eventName}`, { state: { data: response.data.events[0], toNavigate: '/Home' } });

            }
        }
        catch (error) {
            console.error('Error fetching events:', error);
            props.onclose();
            setshowloading(false)
        }
    };

    return (
        <><Modal
            title="Search Events"
            visible={props.open}
            onCancel={props.onclose}
            footer={null} // Remove OK and Cancel buttons
        >
            <Input
                placeholder="Type event name or some thing related"
                value={searchTerm}
                onChange={handleSearchChange}
            /> {showloading && <Loader />}

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
        </>
    );
};

export default SearchModal;
