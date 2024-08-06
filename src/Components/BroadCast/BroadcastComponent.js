import React, { useState } from 'react';
import { TextField, Typography, Button, Paper, Grid, Snackbar, Alert, CircularProgress } from '@mui/material';
import createAuthenticatedRequest from '../../RequestwithHeader';
import constants from '../../Constants/constants';

const BroadCastComponent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'
    const [loading, setLoading] = useState(false); // New state for loading
    const requestInstance = createAuthenticatedRequest();

    const handleSend = async () => {
        setLoading(true); // Show loader
        try {
            const response = await requestInstance.post(`${constants.BASE_URL}broadcast-message`, {
                title,
                description
            });

            setSnackbarMessage('Notification sent successfully!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);

            // Clear the form fields
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error:', error);
            setSnackbarMessage('Failed to send notification. Please try again.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
            setLoading(false); // Hide loader
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <>
            <Grid container alignItems="center" justifyContent="space-between" style={{ backgroundColor: 'dodgerblue', padding: '1%' }}>
                <Grid item>
                    <Typography variant="h6" style={{ color: 'white' }}>
                        Broadcast a message to all users
                    </Typography>
                </Grid>
            </Grid>

            <div style={{ padding: '5%' }}>
                <Paper style={{ padding: '5%' }}>
                    <Typography variant="h6" gutterBottom>
                        Title
                    </Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Enter title here..."
                        margin="normal"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Typography variant="h6" gutterBottom>
                        Description
                    </Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Enter description here..."
                        multiline
                        rows={4}
                        margin="normal"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '16px' }}
                        onClick={handleSend}
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? <CircularProgress size={24} /> : 'Send'}
                    </Button>
                </Paper>
            </div>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default BroadCastComponent;
