import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from "@mui/styles";
import constants from '../../Constants/constants';
import createAuthenticatedRequest from '../../RequestwithHeader';
import { Spin, Tag, Button } from 'antd';
import { CheckOutlined, BorderOutlined } from '@ant-design/icons';

const SetCarouselImages = () => {
    const classes = useStyles();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const requestInstance = createAuthenticatedRequest();

    useEffect(() => {
        setLoading(true);
        requestInstance.get(`${constants.BASE_URL}get-all-events-images`)
            .then((response) => { setImages(response.data); setLoading(false); })
            .catch((error) => { console.log('error occurred', error); setLoading(false); });
    }, []);

    const [selectedImages, setSelectedImages] = useState({});
    const [imagesUrls, setImagesUrls] = useState([]);

    const handleClick = (index, value) => {
        setSelectedImages(prev => ({
            ...prev,
            [index]: !prev[index],

        }));
        if (selectedImages[index]) {
            // Remove image from imagesUrls array
            setImagesUrls(prev => prev.filter(item => item !== value));
        } else {
            // Add image to imagesUrls array, check for limit
            if (imagesUrls.length < 5) {
                setImagesUrls(previous => [...previous, value]);
            } else {
                alert('You can only select a maximum of 5 carousel images.');
            }
        }
    };

    const handleSetImages = () => {
        const confirmSetImages = window.confirm("Are you sure you want to set these images as carousel images?");
        if (confirmSetImages) {
            const data = {
                images: imagesUrls // Array of image URLs
            };
            requestInstance.post(`${constants.BASE_URL}set-carousel-images`, data)
                .then(response => {
                    alert("Images set as carousel images successfully!");
                })
                .catch(error => {
                    console.error('Error setting carousel images:', error);
                    alert("Failed to set carousel images. Please try again later.");
                });
        }
    };

    return (
        <div className={classes.root}>
            <Grid container alignItems="center" justifyContent="space-between" style={{ backgroundColor: 'dodgerblue', padding: '1%' }}>
                <Grid item>
                    <Typography variant="h6" style={{ color: 'white' }}>
                        Set Carousel Images
                    </Typography>
                </Grid>
                <Grid item>
                    <Tag color={'green'}>
                        Selected: {imagesUrls.length}
                    </Tag>
                    <Button icon={<CheckOutlined />} type="primary" onClick={handleSetImages} disabled={imagesUrls.length === 0}>
                        Set Images
                    </Button>
                </Grid>
            </Grid>
            {loading ? (
                <Spin />
            ) : (
                <Grid container spacing={2} p={2}>
                    {images.map((item, index) => (
                        <Grid item key={index} xs={12} md={4} style={{ position: 'relative' }}>
                            <img onClick={() => handleClick(index, item)} src={`${item.url}`} alt={item.filename} className={classes.image} />
                            <Button
                                key={index}
                                type="primary"
                                shape="circle"
                                icon={selectedImages[index] ? <CheckOutlined /> : <BorderOutlined />}
                                onClick={() => handleClick(index, item)}
                                style={{
                                    zIndex: 2,
                                    borderColor: selectedImages[index] ? 'green' : undefined,
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    );
};


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
}));

export default SetCarouselImages;
