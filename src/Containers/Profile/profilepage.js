import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Box, IconButton, Avatar } from '@mui/material';
import { Instagram, Twitter } from '@mui/icons-material';
import AnimatedNumbers from 'react-animated-numbers';
import { Switch, message } from 'antd';
import Skeleton from 'react-loading-skeleton'; // Import skeleton loader
import cover from '../../images/profileBackground.jpg';
import WrapperComponent from '../../FooterAndHeaderwrapper';
import { useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProfileData } from '../../ReduxStore/actions/profileDataAction';
import constants from '../../Constants/constants';
import SpringAnimatedNums from '../../Components/react-springs/springAnimatedNumbers';
import createAuthenticatedRequest from '../../RequestwithHeader';
const ProfilePage = () => {
    const [loading, setLoading] = useState(true);
    const profileData = useSelector(state => state.profiledata);
    const requestInstance = createAuthenticatedRequest()
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const istablet = useMediaQuery('(max-width:1024px)');
    const dispatch = useDispatch()
    const [visibility, setVisibility] = useState(profileData.visibility); // Assuming default visibility is false


    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await requestInstance.get(`${constants.BASE_URL}get-profile-data`);
                if (response.data) {
                    dispatch(setProfileData(response.data.profile));
                    setLoading(false); // Ensure loading is set to false after data is fetched
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        if (Object.keys(profileData).length === 0) {
            fetchProfileData();
        }
        else {
            setLoading(false)
        }
    }, [dispatch, profileData]);

    const handleToggle = async (checked) => {
        try {
            setVisibility(checked);
            await requestInstance.post(`${constants.BASE_URL}profile-update-visibility`, {
                visibility: checked,
            });
            message.success('Visibility updated successfully');
        } catch (error) {
            console.error('Error updating visibility:', error);
            message.error('Error updating visibility');
            // Optionally revert the state
            setVisibility(!checked);
        }
    };
    return (
        <WrapperComponent>
            <div style={{ position: 'relative' }}>
                {/* Background image with overlay */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '80vh',
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${cover})`,
                        backgroundSize: 'cover',
                        zIndex: -1,
                    }}
                />
                {/* Content */}
                <Container sx={{ paddingTop: 10 }}>
                    <Box
                        sx={{
                            position: 'relative',
                            textAlign: 'center',
                            color: 'white',
                        }}
                    >
                        {loading ? (
                            <Skeleton circle={true} height={100} width={100} /> // Show skeleton for avatar
                        ) : (
                            <Avatar
                                src={profileData?.profileImageUrl || "/path/to/profile/image.jpg"} // Use profile image URL or fallback
                                sx={{ width: 100, height: 100, border: '2px solid white', margin: '0 auto', objectFit: 'cover' }}
                            />
                        )}
                        <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: 1 }}>
                            {loading ? <Skeleton width={120} /> : profileData.username} {/* Show skeleton or username */}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: 'lightgray' }}>
                            {loading ? <Skeleton width={100} /> : profileData.regno} {/* Show skeleton or subheader */}
                        </Typography>
                    </Box><div style={{
                        position: 'absolute',
                        right: istablet ? 10 : 20,
                        top: istablet ? 10 : 20,
                        transform: 'translate(0, 0)', // Adjusted transformation to prevent unwanted shifts
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
                        padding: istablet ? '10%' : '5%',
                        paddingTop: '1%',
                        paddingRight: '1%'
                    }}>
                        <Typography variant="subtitle1" style={{ color: 'white', textAlign: 'right' }}>
                            Profile Visibility
                        </Typography>
                        <Typography variant="body1" style={{ color: visibility ? '#28a745' : 'red', fontWeight: 'bold', textAlign: 'right' }}>
                            {`${visibility ? 'public' : 'private'}`}
                        </Typography>
                        <div style={{ width: '100%', textAlign: 'right', marginTop: '3%' }}>
                            <Switch
                                checked={visibility}
                                onChange={handleToggle}
                            />
                        </div>
                    </div>

                    {/* Additional content */}
                    <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
                        <Grid item >
                            <Box textAlign="center" sx={{ color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {loading ? (
                                    <Skeleton width={100} height={50} />
                                ) : (

                                    <SpringAnimatedNums num1={profileData.subscriptions} num2={profileData.age} num3={profileData.eventsLiked}
                                        Label1={'Subscriptions'} Label2={'Age'} Label3={'Events liked'} />)
                                }
                                <Typography variant="subtitle1" sx={{ marginTop: 0.5 }}>
                                    {loading ? <Skeleton width={80} /> : ''}
                                </Typography>

                            </Box>
                        </Grid>

                    </Grid>

                    {/* Social media icons */}
                    <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
                        <Grid item>
                            <IconButton aria-label="twitter" href="https://twitter.com">
                                <Twitter style={{ color: 'white' }} />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton aria-label="instagram" href="https://instagram.com">
                                <Instagram style={{ color: 'white' }} />
                            </IconButton>
                        </Grid>
                    </Grid>

                    {/* About Me section */}
                    <Box sx={{ marginTop: 4, marginBottom: 4, color: 'black', background: 'white', padding: '10%', borderRadius: isSmallScreen ? '20%' : '30%' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            About Me
                        </Typography>
                        <Typography variant="body1" sx={{ marginTop: 1 }}>
                            {loading ? (
                                <>
                                    <Skeleton height={20} width="80%" style={{ marginBottom: 10 }} />
                                    <Skeleton height={20} width="60%" style={{ marginBottom: 10 }} />
                                    <Skeleton height={20} width="70%" style={{ marginBottom: 10 }} />
                                </>
                            ) : (
                                profileData?.description || 'No description available' // Show profile description or fallback
                            )}
                        </Typography>
                    </Box>
                </Container>
            </div>
        </WrapperComponent>
    );
};

export default ProfilePage;
