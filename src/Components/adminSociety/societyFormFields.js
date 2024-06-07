import React, { useState, useRef } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Grid, Paper } from '@mui/material';
import constants from '../../Constants/constants';
import createAuthenticatedRequest from '../../RequestwithHeader';

const SocietyForm = (props) => {
    axios.defaults.maxContentLength = 5000000; // Set maximum content length allowed in bytes
    const requestInstance = createAuthenticatedRequest()
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        events: '',
        updated_at: null,
        tags: '',
        social_media_links: {
            facebook: '',
            twitter: '',
            instagram: ''
        },
        website: '',
        contact_info: {
            email: '',
            phone: ''
        },
        cover_photo: null
    });
    const [coverPhoto, setCoverPhoto] = useState(null);
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverPhoto(file);
            setFormData({
                ...formData,
                cover_photo: file
            });
        }
    };

    const handleSelectFile = () => {
        fileInputRef.current.click();
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();

            // Convert cover photo to base64 string
            if (formData.cover_photo) {
                const reader = new FileReader();
                reader.readAsDataURL(formData.cover_photo);

                // Wait for FileReader to finish reading
                await new Promise((resolve) => {
                    reader.onload = () => {
                        formDataToSend.append('cover_photo', reader.result);
                        resolve();
                    };
                });
            }

            Object.entries(formData).forEach(([key, value]) => {
                if (key !== 'cover_photo' && key !== 'social_media_links' && key !== 'contact_info') {
                    if (value !== '') {
                        formDataToSend.append(key, value);
                    }
                } else if (key === 'social_media_links' || key === 'contact_info') {
                    Object.entries(value).forEach(([subKey, subValue]) => {
                        if (subValue !== '') {
                            formDataToSend.append(`${key}.${subKey}`, subValue);
                        }
                    });
                }
            });

            const response = await requestInstance.post(`${constants.BASE_URL}create-society`, formDataToSend);
            console.log('Society created successfully:', response.data.society);
            if (response.data.success) {
                props.onclose()
            }
        } catch (error) {
            console.error('Error creating society:', error);
        }
    };

    return (
        <Container component="main" maxWidth="md">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            variant="outlined"
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            variant="outlined"
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Events"
                            name="events"
                            variant="outlined"
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Updated At"
                            type="date"
                            name="updated_at"
                            variant="outlined"
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Tags"
                            name="tags"
                            variant="outlined"
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Facebook Link"
                            name="social_media_links.facebook"
                            variant="outlined"
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Twitter Link"
                            name="social_media_links.twitter"
                            variant="outlined"
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Instagram Link"
                            name="social_media_links.instagram"
                            variant="outlined"
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Website"
                            name="website"
                            variant="outlined"
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            name="contact_info.email"
                            variant="outlined"
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Phone"
                            type="tel"
                            name="contact_info.phone"
                            variant="outlined"
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                        />
                        <Button onClick={handleSelectFile} variant="contained">
                            Select Cover Photo
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        {coverPhoto && (
                            <img
                                src={URL.createObjectURL(coverPhoto)}
                                alt="Cover Photo"
                                style={{ maxWidth: '100%', height: 'auto', marginTop: '1rem' }}
                            />
                        )}
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default SocietyForm;
