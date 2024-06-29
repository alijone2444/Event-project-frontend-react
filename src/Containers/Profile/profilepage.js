import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Box, IconButton, Avatar } from '@mui/material';
import { Instagram, Twitter } from '@mui/icons-material';
import AnimatedNumbers from 'react-animated-numbers';
import cover from '../../images/profileBackground.jpg';
import WrapperComponent from '../../FooterAndHeaderwrapper';

const ProfilePage = () => {
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
                        <Avatar
                            src="/path/to/profile/image.jpg"
                            sx={{ width: 100, height: 100, border: '2px solid white', margin: '0 auto' }}
                        />
                        <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: 1 }}>
                            User Name
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: 'lightgray' }}>
                            Sub Header
                        </Typography>
                    </Box>

                    {/* Additional content */}
                    <Grid container spacing={3} justifyContent="center" sx={{ marginTop: 2 }}>
                        {[
                            { label: 'Comments', value: 123 },
                            { label: 'Followers', value: 456 },
                            { label: 'Bookmarks', value: 789 },
                        ].map((item, index) => (
                            <Grid item key={index}>
                                <Box textAlign="center" sx={{ color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <AnimatedNumbers
                                        animateToNumber={item.value}
                                        fontStyle={{ fontSize: 32, fontWeight: 'bold' }}
                                        configs={[
                                            { mass: 1, tension: 220, friction: 100 },
                                            { mass: 1, tension: 180, friction: 130 },
                                        ]}
                                    />
                                    <Typography variant="subtitle1" sx={{ marginTop: 0.5 }}>
                                        {item.label}
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
                    <Box sx={{ marginTop: 4, marginBottom: 4, color: 'black', background: 'white', padding: '10%', borderRadius: '30%' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            About Me
                        </Typography>
                        <Typography variant="body1" sx={{ marginTop: 1 }}>
                            This is a long description of the user. You can fill this with any content you like, providing details about the user's background, interests, achievements, or any other relevant information.
                        </Typography>
                    </Box>
                </Container>
            </div>
        </WrapperComponent>
    );
};

export default ProfilePage;
