import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, useMediaQuery, ButtonGroup } from '@mui/material';
import WrapperComponent from "../../../../FooterAndHeaderwrapper";
import AnimationNumbers from '../../../../Components/animaterNumbers/animatednumbers';
import VantaBackground from '../../../../Components/vantaJs/vanta';
import Star from '@mui/icons-material/StarBorderOutlined';
import { useSelector, useDispatch } from 'react-redux';
import createAuthenticatedRequest from '../../../../RequestwithHeader';
import { setSocietiesData } from '../../../../ReduxStore/actions/societyDataAction';
import constants from '../../../../Constants/constants';
import { useNavigate } from 'react-router-dom';
import { Divider, Button } from 'antd';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import the CSS
import recordSocietyVisit from '../../../../Components/functions/recortSocietyVisits';
import { setConstants } from '../../../../ReduxStore/actions/setConstantsAction';
function SocietiesPage() {
    const Societies = useSelector((state) => state.Societies);
    const requestInstance = createAuthenticatedRequest();
    const isMobile = useMediaQuery('(max-width:600px)');
    const [loading, setLoading] = useState(false);
    const [followUnfollowLoaders, setFollowUnfollowLoaders] = useState({});
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [fetchDocsAgain, setFetchDocsAgain] = useState(false);
    const SavedConstants = useSelector(state => state.SavedConstants.constants);
    const navigate = useNavigate();

    const followSociety = async (societyId, name, action) => {
        try {
            setFollowUnfollowLoaders(prev => ({ ...prev, [societyId]: true }));
            const response = await requestInstance.post(`${constants.BASE_URL}follow-society`, {
                name: name,
                action: action
            });
            if (response.data) {
                const updatedSocieties = Societies.map(society =>
                    society._id === response.data.society._id ? response.data.society : society
                );
                dispatch(setSocietiesData(updatedSocieties));
                setFollowUnfollowLoaders(prev => ({ ...prev, [societyId]: false }));
            }
        } catch (error) {
            console.error('Error following/unfollowing society:', error);
            setFollowUnfollowLoaders(prev => ({ ...prev, [societyId]: false }));
        }
    };

    useEffect(() => {
        if (Societies.length === 0 || fetchDocsAgain) {
            fetchData(page, limit);
        }
    }, [page, dispatch, fetchDocsAgain]);

    useEffect(() => {
        const fetchThreeSocietiesAndConstants = async () => {
            try {
                const response2 = await requestInstance.get(`${constants.BASE_URL}get-constants`); // or use fetch
                console.log('response 2', response2.data)
                dispatch(setConstants(response2.data))
            } catch (err) {
                console.log(err.message)
            }
        };
        const areAllPropertiesEmpty = Object.values(SavedConstants).every(
            (val) => typeof val === 'object' && Object.keys(val).length === 0
        );
        if (areAllPropertiesEmpty) {
            fetchThreeSocietiesAndConstants();
        }
    }, [dispatch])

    const fetchData = async (page, limit) => {
        try {
            setLoading(true);
            const response = await requestInstance.get(`${constants.BASE_URL}get-societies?page=${page}&limit=${limit}&amount=${'All'}`);
            dispatch(setSocietiesData([...Societies, ...response.data.societies]));
            setLoading(false);
            setFetchDocsAgain(false);
        } catch (error) {
            console.error('Error fetching societies data:', error);
        }
    };

    const handleViewMore = () => {
        setPage(page + 1);
        setFetchDocsAgain(true);
    };

    return (
        <WrapperComponent transparentNavbar={true}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 2 }}>
                <AnimationNumbers SavedConstants={SavedConstants} />
            </div>
            <VantaBackground />
            <div style={{ margin: '5%' }}>
                <div style={{ marginBottom: isMobile ? '5%' : '2%' }}>
                    <Typography
                        style={{ color: 'purple', background: "white", display: 'inline-block', paddingRight: '2%' }}
                        variant={isMobile ? 'h5' : 'h4'}
                    >
                        <Star style={{ height: 'inherit', background: 'white', fontSize: isMobile ? 20 : 30, color: 'purple' }} />
                        Explore Societies
                    </Typography>
                    <Divider style={{ background: 'purple', marginTop: '-18px', marginRight: "5%" }} />
                </div>
                <div style={{ marginLeft: '5%' }}>
                    <Typography variant="body1" paragraph>
                        Discover the diverse range of societies available at our university. With over 15 societies to choose from, there's something for everyone.
                    </Typography>
                </div>
                {loading ? (
                    <Grid container spacing={2}>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card style={{ border: '1px solid lightgrey' }}>
                                    <Skeleton height={200} width="100%" />
                                    <CardContent>
                                        <Skeleton width="60%" height={30} />
                                        <Skeleton width="80%" height={20} style={{ marginTop: '10px' }} />
                                        <ButtonGroup
                                            orientation="vertical"
                                            aria-label="Vertical button group"
                                            variant="contained"
                                            style={{ width: '100%' }}
                                        >
                                            <Skeleton width="100%" height={20} style={{ marginTop: '10px' }} />

                                            <Skeleton width="100%" height={20} style={{ marginTop: '10px' }} />
                                        </ButtonGroup>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Grid container spacing={2}>
                        {Societies.map((society) => (
                            <Grid item xs={12} sm={6} md={4} key={society._id}>
                                <Card style={{ border: '1px solid lightgrey' }}>
                                    <img src={society.cover_photo} alt={society.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {society.name}
                                        </Typography><Typography
                                            variant="body2"
                                            color="text.secondary"
                                            style={{
                                                color: 'black',
                                                lineHeight: '1.5em',
                                                maxHeight: '3em', /* line-height * number of lines (1.5em * 2 lines) */
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitBoxOrient: 'vertical',
                                                WebkitLineClamp: 2
                                            }}
                                        >
                                            {society.description}
                                        </Typography>
                                        <ButtonGroup
                                            orientation="vertical"
                                            aria-label="Vertical button group"
                                            variant="contained"
                                            style={{ width: '100%' }}
                                        >
                                            <Button style={{ backgroundColor: 'purple', color: 'white', width: '100%', marginTop: '2%' }} onClick={() => { followSociety(society._id, society.name, society.ismember ? 'Unfollow' : 'Follow') }}>
                                                {followUnfollowLoaders[society._id] ? <CircularProgress style={{ color: 'white' }} size={24} /> : (society.ismember ? 'Unfollow' : 'Follow')}
                                            </Button>
                                            <Button style={{ backgroundColor: 'purple', color: 'white', width: '100%', marginTop: '2%' }} onClick={() => { navigate('society-page', { state: { ...society, Simple: true } }); recordSocietyVisit(society.name) }}>Visit</Button>
                                        </ButtonGroup>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
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
