import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, useMediaQuery, ButtonGroup } from '@mui/material';
import WrapperComponent from "../../../../FooterAndHeaderwrapper";
import AnimationNumbers from '../../../../Components/animaterNumbers/animatednumbers';
import VantaBackground from '../../../../Components/vantaJs/vanta';
import Star from '@mui/icons-material/StarBorderOutlined';
import { useSelector } from 'react-redux';
import createAuthenticatedRequest from '../../../../RequestwithHeader';
import { useDispatch } from 'react-redux';
import { setSocietiesData } from '../../../../ReduxStore/actions/societyDataAction';
import constants from '../../../../Constants/constants';
import { useNavigate } from 'react-router-dom';
import { Divider, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
function SocietiesPage() {
    const Societies = useSelector((state) => state.Societies);
    console.log(Societies)
    const requestInstance = createAuthenticatedRequest()
    const ismobile = useMediaQuery('(max-width:600px)')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [page, setPage] = useState(1); // Initialize page state
    const [limit, setLimit] = useState(10); // Initialize limit state
    const [FetchDocsAgain, setFetchDocsAgain] = useState(false)
    const navigate = useNavigate()
    const followSociety = async (name, action) => {
        try {
            const response = await requestInstance.post(`${constants.BASE_URL}follow-society`, {
                name: name,
                action: action
            });

            const updatedSocieties = Societies.map(society =>
                society._id === response.data.society._id ? response.data.society : society
            );

            dispatch(setSocietiesData(updatedSocieties));
        } catch (error) {
            console.error('Error following/unfollowing society:', error);
            // Handle errors as needed
        }
    };

    useEffect(() => {
        if (Societies.length === 0 || FetchDocsAgain) {
            fetchData(page, limit);
        }// Fetch data with initial page and limit
    }, [page, dispatch, FetchDocsAgain]);

    const fetchData = async (page, limit) => {
        try {
            setLoading(true)
            const response = await requestInstance.get(`${constants.BASE_URL}get-societies?page=${page}&limit=${limit}&amount=${'All'}`);
            // Assuming the response contains societies data
            dispatch(setSocietiesData([...Societies, ...response.data.societies]));
            setLoading(false)
            setFetchDocsAgain(false)
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
        setFetchDocsAgain(true)
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
                            <Card style={{ border: '1px solid lightgrey' }}>
                                <img src={society.cover_photo} alt={society.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {society.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {society.description}
                                    </Typography>
                                    <ButtonGroup
                                        orientation="vertical"
                                        aria-label="Vertical button group"
                                        variant="contained"
                                        style={{ width: '100%' }}
                                    >
                                        <Button style={{ backgroundColor: 'purple', color: 'white', width: '100%', marginTop: '2%' }} onClick={() => { followSociety(society.name, society.ismember ? 'Unfollow' : 'Follow') }}>{society.ismember ? 'Unfollow' : 'Follow'}</Button>
                                        <Button style={{ backgroundColor: 'purple', color: 'white', width: '100%', marginTop: '2%' }} onClick={() => { navigate('society-page', { state: society }) }}>visit</Button>
                                    </ButtonGroup>

                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Divider />
                <Grid container >
                    <Grid item xs={12} sm={12} >
                        <Button variant="contained" style={{ backgroundColor: 'purple', color: "white", width: '100%' }} onClick={handleViewMore}>View More</Button>
                    </Grid>
                </Grid>
            </div>
        </WrapperComponent>
    );
};

export default SocietiesPage;
