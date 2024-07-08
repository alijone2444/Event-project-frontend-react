import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton, Grid, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import constants from '../../Constants/constants';
import createAuthenticatedRequest from '../../RequestwithHeader';
import { setProfileData } from '../../ReduxStore/actions/profileDataAction';
import { useDispatch } from 'react-redux';
const EditProfileModal = ({ open, onClose }) => {
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const [description, setDescription] = useState('');
    const [instagramLink, setInstagramLink] = useState('');
    const [twitterLink, setTwitterLink] = useState('');
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const requestInstance = createAuthenticatedRequest();
    const isMobile = useMediaQuery('(max-width:600px)');
    const dispatch = useDispatch()

    const handleClose = () => {
        fetchProfileData()
        onClose();
    };
    const fetchProfileData = async () => {
        try {
            const requestInstance = createAuthenticatedRequest();
            const response = await requestInstance.get(`${constants.BASE_URL}get-profile-data`);
            if (response.data) {
                dispatch(setProfileData(response.data.profile));
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setProfileImage(selectedImage);
        setPreviewImage(URL.createObjectURL(selectedImage));
    };

    const handleSubmit = async () => {
        try {
            let formData = {
                description,
                instagramLink,
                twitterLink,
                username,
                age,
            };

            if (profileImage) {
                const base64Image = await convertImageToBase64(profileImage);
                formData.profileImageUrl = base64Image;
            }

            const response = await requestInstance.put(`${constants.BASE_URL}update-profile`, formData);

            if (response.data.success) {
                console.log('Profile updated successfully');
            } else {
                console.error('Error updating profile');
            }
        } catch (error) {
            console.error('Error during profile update:', error);
        }

        // Close the modal
        handleClose();
    };

    const convertImageToBase64 = (imageFile) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onloadend = () => {
                // reader.result contains the base64 encoded image data
                const base64String = reader.result.split(',')[1];
                resolve(base64String);
            };
            reader.onerror = (error) => reject(error);
        });
    };

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
                    width: isMobile ? '90vw' : 400,
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    overflowY: 'auto',
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
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ marginBottom: '16px' }}
                />
                {previewImage && (
                    <img
                        src={previewImage}
                        alt="Profile Preview"
                        style={{ width: '100%', marginBottom: '16px' }}
                    />
                )}
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
                <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    fullWidth
                    type="number"
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
