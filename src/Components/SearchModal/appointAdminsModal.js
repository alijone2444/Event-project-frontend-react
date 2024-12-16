import React, { useState } from 'react';
import { Modal, Radio, Button, Spin, Alert, Input } from 'antd';

import { Snackbar, SnackbarContent } from "@mui/material";
import constants from '../../Constants/constants';
import createAuthenticatedRequest from '../../RequestwithHeader';

const AssignRoleModal = ({ open, role, closeModal, SocietyName }) => {
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const requestInstance = createAuthenticatedRequest();

    const handleSearch = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim() === '') {
            setFilteredUsers([]);
            return;
        }

        setLoading(true);
        try {
            // Search for users based on email or Rollno
            const response = await requestInstance.get(`${constants.BASE_URL}search-users`, {
                params: { query: value }
            });
            setFilteredUsers(response.data); // Update the filtered users with the search result
        } catch (err) {
            console.error(err);
            setError('Failed to search users');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setSelectedUser(e.target.value);
    };

    const handleSubmit = async () => {
        if (selectedUser) {
            setLoading(true);
            try {
                await requestInstance.post(`${constants.BASE_URL}assign-society`, {
                    societyName: SocietyName,
                    username: selectedUser,
                    role: role
                });
                setLoading(false);
                setSnackbarMessage(`${role} has been successfully assigned.`);
                setOpenSnackbar(true);
                closeModal();
            } catch (err) {
                setLoading(false);
                console.log(err.response.data.message)
                setError(err.response.data.message);
            }
        } else {
            setLoading(false);
            setError('no user selected');
        }
    };

    return (
        <>
            <Modal
                visible={open}
                title={`Assign ${role}`}
                onCancel={closeModal}
                footer={null}
                width={500}
            >
                <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Input
                            placeholder="Search by email or Rollno"
                            value={searchTerm}
                            onChange={handleSearch}
                            style={{ marginBottom: '20px' }}
                        />

                        {/* Show the loader below the search bar while loading */}
                        {loading && searchTerm.trim() !== '' && (
                            <Spin tip="Searching..." size="small" style={{ marginBottom: '20px' }} />
                        )}

                        {/* Show error message if there was an error */}
                        {error && <Alert message={error} type="error" style={{ marginBottom: '20px' }} />}

                        <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '20px' }}>
                            <Radio.Group
                                onChange={handleChange}
                                value={selectedUser}
                                style={{ display: 'flex', flexDirection: 'column' }}
                            >
                                {filteredUsers.map((user) => (
                                    <Radio key={user.Rollno} value={user.Rollno} style={{ marginBottom: '10px' }}>
                                        {`${user.Rollno} (${user.Email})`}
                                    </Radio>

                                ))}
                            </Radio.Group>
                        </div>

                        <Button
                            type="primary"
                            onClick={handleSubmit}
                            loading={loading}
                            block
                        >
                            Assign Role
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Snackbar for success message */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
            >
                <SnackbarContent
                    message={snackbarMessage}
                    style={{
                        backgroundColor: 'green',
                        color: 'white',
                    }}
                />
            </Snackbar>
        </>
    );
};

export default AssignRoleModal;
