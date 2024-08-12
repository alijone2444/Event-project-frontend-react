import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, Avatar, Divider, IconButton } from '@mui/material';
import Skeleton from 'react-loading-skeleton'; // Import skeleton loader
import BackgroundImage from '../../images/profileBackground.jpg';
import WrapperComponent from '../../FooterAndHeaderwrapper';
import { useLocation, useNavigate } from 'react-router-dom';
import { Instagram, Twitter, Visibility } from '@mui/icons-material'; // Add other icons if needed
import AppBarComponent from '../../Components/SubAppbar/appbar';
import AnimatedNumbers from 'react-animated-numbers'; // Import AnimatedNumbers
import { Alert } from 'antd';
const SearchedProfile = () => {
    const location = useLocation();
    const { state } = location;
    const { profile } = state || {};
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // Define loading state

    // Example effect to simulate loading
    useEffect(() => {
        // Simulate a loading period before setting loading to false
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <WrapperComponent>
            <div style={{ position: 'relative', minHeight: '100%' }}>
                <AppBarComponent
                    backgroundColor={'transparent'}
                    onBackButtonClick={() => { navigate('/Home') }}
                    title='Back'
                />

                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${BackgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: -1,
                    }}
                />
                {/* Content */}
                <div style={{ paddingTop: '5%', position: 'relative', zIndex: 1 }}>
                    <Box sx={{ textAlign: 'center', color: 'white' }}>
                        {profile ? (
                            <>
                                <Avatar
                                    src={profile.profileImageUrl || "/path/to/default/image.jpg"}
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        border: '2px solid white',
                                        margin: '0 auto',
                                        objectFit: 'cover',
                                    }}
                                />
                                <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: 1 }}>
                                    {profile.username || 'No Name'}
                                </Typography>
                                <Typography variant="subtitle1" sx={{ color: 'lightgray' }}>
                                    {profile.regno ? `Reg No: ${profile.regno}` : 'No Reg No'}
                                </Typography>
                                {profile.visibility && <Grid container spacing={3} justifyContent="center" sx={{ marginTop: 2 }}>
                                    {[
                                        { label: 'Subscriptions', value: profile.subscriptions },
                                        { label: 'Age', value: profile.age },
                                        { label: 'Events liked', value: profile.eventsLiked },
                                    ].map((item, index) => (
                                        <Grid item key={index}>
                                            <Box
                                                textAlign="center"
                                                sx={{
                                                    color: 'white',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                {loading ? (
                                                    <Skeleton width={100} height={50} />
                                                ) : (
                                                    <AnimatedNumbers
                                                        animateToNumber={item.value || 0}
                                                        fontStyle={{ fontSize: 32, fontWeight: 'bold' }}
                                                        configs={[
                                                            { mass: 1, tension: 220, friction: 100 },
                                                            { mass: 1, tension: 180, friction: 130 },
                                                        ]}
                                                    />
                                                )}
                                                <Typography variant="subtitle1" sx={{ marginTop: 0.5 }}>
                                                    {loading ? <Skeleton width={80} /> : item.label}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>}
                                {profile.visibility && <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
                                    <Grid item>
                                        <IconButton
                                            aria-label="twitter"
                                            href={profile.twitter || 'https://twitter.com'}
                                            target="_blank"
                                        >
                                            <Twitter style={{ color: 'white' }} />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <IconButton
                                            aria-label="instagram"
                                            href={profile.instagram || 'https://instagram.com'}
                                            target="_blank"
                                        >
                                            <Instagram style={{ color: 'white' }} />
                                        </IconButton>
                                    </Grid>
                                </Grid>}

                                {!profile.visibility && <div style={{ padding: '5%' }}
                                ><Alert message={'This account is private'} type="error" showIcon /></div>}
                                {profile.description && (
                                    <div style={{ padding: '5%', paddingTop: 0 }}>
                                        <Divider sx={{ marginTop: 2 }} />
                                        <Typography variant="body1" sx={{ marginTop: 2 }}>
                                            {profile.description}
                                        </Typography>
                                    </div>
                                )}
                                {/* Social media links */}

                            </>
                        ) : (
                            <>
                                <Skeleton circle={true} height={100} width={100} />
                                <Skeleton width={200} height={30} style={{ margin: '10px auto' }} />
                                <Skeleton width={150} height={30} style={{ margin: '10px auto' }} />
                                <Skeleton width={250} height={20} style={{ margin: '10px auto' }} />
                            </>
                        )}
                    </Box>
                </div>
            </div>
        </WrapperComponent>
    );
};

export default SearchedProfile;
