import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton, Grid, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const EditProfileModal = ({ open, onClose }) => {
    const [profileImage, setProfileImage] = useState('');
    const [description, setDescription] = useState('');
    const [instagramLink, setInstagramLink] = useState('');
    const [twitterLink, setTwitterLink] = useState('');

    const handleClose = () => {
        onClose();
    };

    const handleSubmit = () => {
        // Handle form submission (e.g., update data in a database)
        console.log('Form submitted');
        // Close the modal
        handleClose();
    };

    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    boxShadow: 24,
                    p: 4,
                    width: isMobile ? '90vw' : 400, // Adjust width for mobile screens
                    maxWidth: '90vw', // Ensure modal is not wider than the viewport width on mobile
                    maxHeight: '90vh', // Ensure modal is not taller than the viewport height
                    overflowY: 'auto', // Add vertical scrollbar if content overflows
                }}
            >
                <Grid container justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" gutterBottom>
                        Edit Profile
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Grid>
                <TextField
                    label="Profile Image URL"
                    value={profileImage}
                    onChange={(e) => setProfileImage(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    About Me
                </Typography>
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Instagram Link"
                    value={instagramLink}
                    onChange={(e) => setInstagramLink(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Twitter Link"
                    value={twitterLink}
                    onChange={(e) => setTwitterLink(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <Grid container justifyContent="center">
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Save Changes
                    </Button>
                </Grid>
            </Box>
        </Modal>
    );
};

export default EditProfileModal;
