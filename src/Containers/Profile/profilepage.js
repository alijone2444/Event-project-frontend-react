import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Box, IconButton, Avatar } from '@mui/material';
import { Instagram, Twitter } from '@mui/icons-material';
import AnimatedNumbers from 'react-animated-numbers';
import Skeleton from 'react-loading-skeleton'; // Import skeleton loader
import cover from '../../images/profileBackground.jpg';
import WrapperComponent from '../../FooterAndHeaderwrapper';
import { useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const ProfilePage = () => {
    const [loading, setLoading] = useState(true); // Loading state
    const location = useLocation()
    const profileData = useSelector(state => state.profiledata);

    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const dispatch = useDispatch()
    useEffect(() => {
        if (location.state) {
            console.log(location.state)
            setLoading(false)
        }
    }, [location.state, dispatch])
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
                            {loading ? <Skeleton width={120} /> : profileData?.username} {/* Show skeleton or username */}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: 'lightgray' }}>
                            {loading ? <Skeleton width={100} /> : profileData?.subHeader} {/* Show skeleton or subheader */}
                        </Typography>
                    </Box>

                    {/* Additional content */}
                    <Grid container spacing={3} justifyContent="center" sx={{ marginTop: 2 }}>
                        {[
                            { label: 'Comments', value: profileData?.comments },
                            { label: 'Events Hosted', value: profileData?.eventsHosted },
                            { label: 'Age', value: profileData?.age },
                        ].map((item, index) => (
                            <Grid item key={index}>
                                <Box textAlign="center" sx={{ color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    {loading ? (
                                        <Skeleton width={100} height={50} />
                                    ) : (
                                        <AnimatedNumbers
                                            animateToNumber={item.value}
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
