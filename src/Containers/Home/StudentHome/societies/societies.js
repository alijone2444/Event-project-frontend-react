import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button, useMediaQuery } from '@mui/material';
import WrapperComponent from "../../../../FooterAndHeaderwrapper";
import AnimationNumbers from '../../../../Components/animaterNumbers/animatednumbers';
import VantaBackground from '../../../../Components/vantaJs/vanta';
import Star from '@mui/icons-material/StarBorderOutlined';
import Divider from '@mui/material/Divider';
import { useSelector } from 'react-redux';
import createAuthenticatedRequest from '../../../../RequestwithHeader';
import { useDispatch } from 'react-redux';
import { setSocietiesData } from '../../../../ReduxStore/actions/societyDataAction';
import constants from '../../../../Constants/constants';

function SocietiesPage() {
    const Societies = useSelector((state) => state.Societies);
    console.log(Societies)
    const requestInstance = createAuthenticatedRequest()
    const ismobile = useMediaQuery('(max-width:600px)')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [page, setPage] = useState(1); // Initialize page state
    const [limit, setLimit] = useState(10); // Initialize limit state

    useEffect(() => {
        fetchData(page, limit); // Fetch data with initial page and limit
    }, [page]);

    const fetchData = async (page, limit) => {
        try {
            setLoading(true)
            const response = await requestInstance.get(`${constants.BASE_URL}get-societies?page=${page}&limit=${limit}`);
            // Assuming the response contains societies data
            dispatch(setSocietiesData([...Societies, ...response.data.societies]));
            setLoading(false)
            // Handle the societies data as needed
            // Return data or perform any other actions if needed
        } catch (error) {
            // Handle errors
            console.error('Error fetching societies data:', error);
            // You might want to handle errors here rather than throwing them
        }
    };

    const handleViewMore = () => {
        setPage(page + 1); // Increment page number to fetch more data
    };

    return (
        <WrapperComponent transparentNavbar={true}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 2 }}>
                <AnimationNumbers />
            </div>
            <VantaBackground />
            <div style={{ margin: '5%' }}>

                <div style={{ marginBottom: ismobile ? '5%' : '2%' }}>
                    <Typography
                        style={{ color: 'purple', background: "white", display: 'inline-block', paddingRight: '2%' }}
                        variant={ismobile ? 'h5' : 'h4'}
                    ><Star style={{ height: 'inherit', background: 'white', fontSize: ismobile ? 20 : 30, color: 'purple' }} />


                        Explore Societies
                    </Typography>
                    <Divider style={{ background: 'purple', marginTop: '-18px', marginRight: "5%" }} />
                </div>
                <div style={{ marginLeft: '5%' }}>
                    <Typography variant="body1" paragraph>
                        Discover the diverse range of societies available at our university. With over 15 societies to choose from, there's something for everyone.
                    </Typography>
                </div>
                <Grid container spacing={2}>
                    {Societies.map((society, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <img src={society.cover_photo} alt={society.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {society.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {society.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Button variant="contained" color="primary" onClick={handleViewMore}>View More</Button>
            </div>
        </WrapperComponent>
    );
};

export default SocietiesPage;
