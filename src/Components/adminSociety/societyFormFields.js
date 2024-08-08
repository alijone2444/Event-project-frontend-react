import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Container, CircularProgress, Typography } from '@mui/material';
import constants from '../../Constants/constants';
import createAuthenticatedRequest from '../../RequestwithHeader';

const SocietyForm = (props) => {
    axios.defaults.maxContentLength = 5000000; // Set maximum content length allowed in bytes
    const requestInstance = createAuthenticatedRequest();
    const [enableSettingCoverphoto, setenableSettingCoverphoto] = useState(false)
    const [loadinginButton, setloadinginButton] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        president: {
            name: '',
            email: '',
            phone: ''
        },
        vice_president: {
            name: '',
            email: '',
            phone: ''
        },
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
        cover_photo: null,
        imageFiles: [],
    });
    const [coverPhoto, setCoverPhoto] = useState(null);
    const fileInputRef = useRef(null);

    // useEffect to set initial form values based on props.Previousvalues
    useEffect(() => {

        if (props.Previousvalues) {
            setFormData({
                name: props.Previousvalues.name || '',
                description: props.Previousvalues.description || '',
                president: {
                    name: props.Previousvalues.president?.name || '',
                    email: props.Previousvalues.president?.email || '',
                    phone: props.Previousvalues.president?.phone || ''
                },
                vice_president: {
                    name: props.Previousvalues.vice_president?.name || '',
                    email: props.Previousvalues.vice_president?.email || '',
                    phone: props.Previousvalues.vice_president?.phone || ''
                },
                tags: props.Previousvalues.tags || '',
                social_media_links: {
                    facebook: props.Previousvalues.social_media_links?.facebook || '',
                    twitter: props.Previousvalues.social_media_links?.twitter || '',
                    instagram: props.Previousvalues.social_media_links?.instagram || ''
                },
                website: props.Previousvalues.website || '',
                contact_info: {
                    email: props.Previousvalues.contact_info?.email || '',
                    phone: props.Previousvalues.contact_info?.phone || ''
                },
                cover_photo: props.Previousvalues.cover_photo,
                imageFiles: (props.Previousvalues?.imageFileNames || []).map(society => ({
                    src: `${constants.BASE_URL}images/${society}`,
                })),
            });
            if (props.Previousvalues.cover_photo) {
                setCoverPhoto(props.Previousvalues.cover_photo);
            }
        }
    }, [props.Previousvalues]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split('.');

        if (keys.length > 1) {
            setFormData(prevFormData => ({
                ...prevFormData,
                [keys[0]]: {
                    ...prevFormData[keys[0]],
                    [keys[1]]: value
                }
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value
            }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setenableSettingCoverphoto(true)
        if (file) {
            setCoverPhoto(file);
            setFormData(prevFormData => ({
                ...prevFormData,
                cover_photo: file
            }));
        }
    };

    const handleSelectFile = () => {
        fileInputRef.current.click();
        setenableSettingCoverphoto(true)
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setloadinginButton(true);

        try {
            const formDataToSend = new FormData();

            // Append image files to formData
            formData.imageFiles.forEach((file, index) => {
                if (file instanceof File) {
                    const fileName = `${formData.name}_${formData.president.name}_${index}`;
                    formDataToSend.append('imageFiles', file, fileName);
                } else {
                    console.warn('Non-file item found in imageFiles array');
                }
            });

            // Prepare image file names (should be an array of strings)
            const imageFileNames = formData.imageFiles.map((file, index) => `${formData.name}_${formData.president.name}_${index}`);
            formDataToSend.append('imageFileNames', JSON.stringify(imageFileNames)); // Use JSON.stringify to store array as string

            // Convert cover photo to base64 string and append to formData
            if (formData.cover_photo && enableSettingCoverphoto) {
                const reader = new FileReader();
                reader.readAsDataURL(formData.cover_photo);

                await new Promise((resolve) => {
                    reader.onload = () => {
                        formDataToSend.append('cover_photo', reader.result);
                        resolve();
                    };
                });
            }

            // Append other form fields to formData
            Object.entries(formData).forEach(([key, value]) => {
                if (key !== 'cover_photo' && key !== 'imageFiles' && key !== 'social_media_links' && key !== 'contact_info' && key !== 'president' && key !== 'vice_president') {
                    if (value !== '') {
                        formDataToSend.append(key, value);
                    }
                } else if (['social_media_links', 'contact_info', 'president', 'vice_president'].includes(key)) {
                    Object.entries(value).forEach(([subKey, subValue]) => {
                        if (subValue !== '') {
                            formDataToSend.append(`${key}.${subKey}`, subValue);
                        }
                    });
                }
            });

            // Make the API request
            const url = props.Previousvalues.name ? `${constants.BASE_URL}update-society/${props.Previousvalues._id}` : `${constants.BASE_URL}create-society`;
            const method = props.Previousvalues.name ? 'put' : 'post';
            const response = await requestInstance({
                method,
                url,
                data: formDataToSend,
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type for FormData
                },
            });

            if (response.data.success) {
                setenableSettingCoverphoto(false);
                props.onclose();
                setloadinginButton(false);
            }
        } catch (error) {
            setloadinginButton(false);
            console.error('Error creating society:', error);
        }
    };

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setFormData((prevData) => ({
            ...prevData,
            imageFiles: [...prevData?.imageFiles, ...files],
        }));
    };

    return (
        <Container component="main" maxWidth="md">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Society Name"
                            name="name"
                            value={formData.name}
                            variant="outlined"
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Description of Society"
                            name="description"
                            value={formData.description}
                            variant="outlined"
                            onChange={handleInputChange}
                            required
                            multiline
                            rows={4}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="President Name"
                            name="president.name"
                            value={formData.president.name}
                            variant="outlined"
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="President Email"
                            name="president.email"
                            value={formData.president.email}
                            variant="outlined"
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="President Phone"
                            name="president.phone"
                            value={formData.president.phone}
                            variant="outlined"
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Vice President Name"
                            name="vice_president.name"
                            value={formData.vice_president.name}
                            variant="outlined"
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Vice President Email"
                            name="vice_president.email"
                            value={formData.vice_president.email}
                            variant="outlined"
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Vice President Phone"
                            name="vice_president.phone"
                            value={formData.vice_president.phone}
                            variant="outlined"
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            label="Tags"
                            name="tags"
                            value={formData.tags}
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
                            value={formData.social_media_links.facebook}
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
                            value={formData.social_media_links.twitter}
                            variant="outlined"
                            onChange={handleInputChange}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Instagram Link"
                            name="social_media_links.instagram"
                            value={formData.social_media_links.instagram}
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
                            value={formData.website}
                            variant="outlined"
                            onChange={handleInputChange}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Sepearte Email for society"
                            type="email"
                            name="contact_info.email"
                            value={formData.contact_info.email}
                            variant="outlined"
                            onChange={handleInputChange}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Seperate Phone# for society"
                            type="tel"
                            name="contact_info.phone"
                            value={formData.contact_info.phone}
                            variant="outlined"
                            onChange={handleInputChange}
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
                            Select Cover Photo (use icons sizes e.g:256 x 256)
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        {coverPhoto && (
                            <img
                                src={coverPhoto || URL.createObjectURL(coverPhoto)}
                                alt="Cover Photo"
                                style={{ maxWidth: '100%', height: 'auto', marginTop: '1rem' }}
                            />
                        )}
                    </Grid>

                </Grid>
                <Grid item xs={12}>
                    <div style={{ border: '1px solid lightgrey', padding: '2%', zIndex: 1 }}>

                        <div style={{ position: 'relative', display: 'inline-block', width: '100%', }}>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                name="imageFiles"
                                onChange={handleImagesChange}
                                style={{ opacity: 0, position: 'absolute', top: 0, left: 0, zIndex: 1, width: '100%', height: '100%', cursor: 'pointer' }}
                            />
                            <label
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100%', // Adjust width as needed
                                    padding: '5%',
                                    backgroundColor: '#1976d2', // Adjust background color as needed
                                    border: '1px solid #ccc', // Adjust border as needed
                                    borderRadius: '4px', // Adjust border radius as needed
                                    cursor: 'pointer',
                                    position: 'relative',
                                    zIndex: 0, // Ensure input is clickable above other elements
                                }}
                            >
                                <span style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>Select society gallery images (⚠️ max 10)</span>
                            </label>
                        </div>


                        {formData.imageFiles?.map((file, index) => (
                            <img
                                key={index}
                                src={file.src || URL.createObjectURL(file)}
                                alt={`Selected Society Image ${index + 1}`}
                                style={{ maxWidth: '100%', marginTop: '10px' }}
                            />
                        ))}
                    </div>
                </Grid>
                <Button type="submit" variant="contained" color="primary">
                    {
                        loadinginButton ? <CircularProgress style={{ color: 'white' }} /> : 'Submit'}
                </Button>
            </form>
        </Container>
    );
};

export default SocietyForm;
