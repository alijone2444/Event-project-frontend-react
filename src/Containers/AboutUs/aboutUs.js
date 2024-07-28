import React from 'react';
import './about.css'; // Import the CSS file for styling
import { Button, Card, Typography, Descriptions, Divider, } from 'antd'; // Import Ant Design Card component
import WrapperComponent from '../../FooterAndHeaderwrapper';
import constants from '../../Constants/constants';
import { Grid, Paper } from '@mui/material';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/system';

const { Meta } = Card;
const { Title, Text } = Typography
const StyledCard = styled(Paper)({
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '16px',
});

const AboutPage = () => {


    const handleScroll = () => {
        // Select the target element by its ID
        const element = document.getElementById('target-heading');
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth', // Smooth scrolling
                block: 'start'      // Scroll so that the element is at the top of the viewport
            });
        }
    };

    return (
        <WrapperComponent>
            <div className="about-container">
                <div className="polygon-image">
                    <img src={require('../../images/event-background.jpg')} alt="About" />

                    <div className='custom-position-text-about'>
                        <Typography.Title style={{ color: 'white', }} level={3}>'With IST EMS'</Typography.Title>
                        <Typography.Text className='small-description-text' style={{ color: 'white', fontSize: 15 }}>Efficiently organize tasks, increase individual engagement, save time.</Typography.Text>

                        <Button className='more-about-us' onClick={handleScroll}>
                            More about us
                            <ArrowForward style={{ paddingLeft: '4%' }} />
                        </Button>
                    </div>
                </div>


                <div className="cards-container">
                    {constants.AboutPage.map((card, index) => (
                        <Card
                            cover={card.Icon}

                            className='abc'
                            style={{
                                flex: '1 1 20%', backgroundColor: card.color, border: 'none',
                                borderRadius: '0%',
                            }}
                            key={index}
                            hoverable
                        >
                            <Meta title={card.Title} description={card.Description} style={{ color: 'white' }} />
                        </Card>
                    ))}
                </div>
                <div style={{ padding: '5%' }}>
                    <Card
                        elevation={0}
                        id="target-heading"
                        style={{ marginBottom: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}
                    >
                        <Title level={3} style={{ marginBottom: '20px' }}>About Us</Title>
                        <Divider />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <StyledCard>
                                    <Typography style={{ fontWeight: 'bold' }}>Concept Spark</Typography>
                                    <Text>{constants.moreAboutUS.conceptSpark}</Text>
                                </StyledCard>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <StyledCard>
                                    <Typography style={{ fontWeight: 'bold' }}>Who We Are</Typography>
                                    <Text>{constants.moreAboutUS.whoWeAre}</Text>
                                </StyledCard>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <StyledCard>
                                    <Typography style={{ fontWeight: 'bold' }}>How We Help</Typography>
                                    <Text>{constants.moreAboutUS.howWeHelp}</Text>
                                </StyledCard>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} style={{ marginTop: '20px' }}>
                            <Grid item xs={12}>
                                <StyledCard>
                                    <Typography style={{ fontWeight: 'bold' }}>Mission</Typography>
                                    <Text >{constants.moreAboutUS.mission.title}</Text>
                                    <br />
                                    <Text>{constants.moreAboutUS.mission.description}</Text>
                                </StyledCard>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} style={{ marginTop: '20px' }}>
                            <Grid item xs={12} sm={6}>
                                <StyledCard>
                                    <Typography style={{ fontWeight: 'bold' }}>Dedicated Support</Typography>
                                    <Text>{constants.moreAboutUS.dedicatedSupport}</Text>
                                </StyledCard>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <StyledCard>
                                    <Typography style={{ fontWeight: 'bold' }}>Commitment</Typography>
                                    <Text>{constants.moreAboutUS.commitment}</Text>
                                </StyledCard>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} style={{ marginTop: '20px' }}>
                            <Grid item xs={12}>
                                <StyledCard>
                                    <Typography style={{ fontWeight: 'bold' }}>Contact Us</Typography>
                                    <Text>Email: {constants.moreAboutUS.contact.email}</Text>
                                    <br />
                                    <Text>Phone: {constants.moreAboutUS.contact.phone}</Text>
                                </StyledCard>
                            </Grid>
                        </Grid>
                    </Card>
                </div>

            </div>
        </WrapperComponent>
    );
};

export default AboutPage;
