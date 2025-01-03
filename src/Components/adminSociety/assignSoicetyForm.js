import React, { useEffect, useState } from 'react';
import { Radio, Button, Spin, Alert } from 'antd';
import axios from 'axios';
import constants from '../../Constants/constants';
import createAuthenticatedRequest from '../../RequestwithHeader';

const AssignSocietyForm = ({ SocietyName, closemodal }) => {
    const [usernames, setUsernames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const requestInstance = createAuthenticatedRequest();

    useEffect(() => {
        const fetchUsernames = async () => {
            try {
                const response = await requestInstance.get(`${constants.BASE_URL}get-society-admin-names`);
                setUsernames(response.data);
            } catch (err) {
                setError('Failed to fetch usernames');
            } finally {
                setLoading(false);
            }
        };

        fetchUsernames();
    }, []);

    const handleChange = (e) => {
        setSelectedUser(e.target.value);
    };

    const handleSubmit = async () => {
        if (selectedUser) {  // Ensure both selectedUser and role are available
            setLoading(true);
            try {
                // Sending request with societyName, selectedUser (username), and role
                await requestInstance.post(`${constants.BASE_URL}assign-society`, {
                    societyName: SocietyName,
                    username: selectedUser,
                    role: 'President' // Make sure role is passed
                });
                setLoading(false);
                closemodal(); // Close the modal after successful assignment
            } catch (err) {
                setLoading(false);
                setError('Failed to assign society'); // Display error if request fails
            }
        } else {
            console.log('No user selected or role not assigned');
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            {loading ? (
                <Spin tip="Loading..." size="large" />
            ) : error ? (
                <Alert message={error} type="error" />
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '20px' }}>
                        <Radio.Group onChange={handleChange} value={selectedUser} style={{ display: 'flex', flexDirection: 'column' }}>
                            {usernames.map((user) => (
                                <Radio key={user.Rollno} value={user.Rollno} style={{ marginBottom: '10px' }}>
                                    {`${user.Rollno}  (${user.Email})`}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </div>
                    <Button type="primary" onClick={handleSubmit} disabled={!selectedUser}>
                        Assign Society
                    </Button>
                </div>
            )}
        </div>
    );
};

export default AssignSocietyForm;
