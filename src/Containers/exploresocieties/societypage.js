import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Typography, Divider } from 'antd';
import Skeleton from 'react-loading-skeleton';
import WrapperComponent from '../../FooterAndHeaderwrapper';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import ScrollingHorizontally from '../Home/StudentHome/HomePageScrolls/HrScroll';
import createAuthenticatedRequest from '../../RequestwithHeader';
import constants from '../../Constants/constants';
import ArrowForward from '@mui/icons-material/ArrowForward';
import datanotfound from '../../lottie/noDatayet.json';
import Lottie from 'react-lottie';
import Add from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import { Toolbar, AppBar, Typography as MuiTypography, Box, Modal, Button, useMediaQuery } from '@mui/material'; // Importing Toolbar, AppBar, Button, Box, Typography, and Modal from @mui/material
import CreateEvent from '../../Components/EventCreation/eventcreationComponent';
import { Carousel } from "antd";
import './societyPage.css'
import notFoundImage from '../../images/societyBackgroundNotfound.jpg'; // Import static image

const { Title, Text } = Typography;

const AboutSocietyPage = () => {
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [loading2, setloading2] = useState(true)
    const [society, setSociety] = useState(null); // State to store society data
    const location = useLocation(); // Use useLocation hook to get location object
    const [societyEvents, setsocietyEvents] = useState([]);
    const [UserType, setUserType] = useState(null);
    const [showEventModal, setShowEventModal] = useState(false); // State to control modal visibility
    const [runuseeffectagain, setrunuseeffectagain] = useState(false)
    const [rerun, setrerun] = useState(false)
    const [crouseimages, setCrouselimage] = useState([])

    const isSmallScreen = useMediaQuery('(max-width:600px)');
    useEffect(() => {
        const CheckUserType = async () => {
            try {
                const requestInstance = createAuthenticatedRequest();

                const response = await requestInstance.get(`${constants.BASE_URL}check-drawer`);
                if (response.data) {
                    setUserType(response.data);
                    return response.data;
                }

            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
                throw error;
            }
        };
        CheckUserType();
    }, []);

    // Simulate data fetch (replace with actual data fetching logic)
    useEffect(() => {
        console.log('runninguse');
        const fetchEvents = async () => {
            try {
                const requestInstance = createAuthenticatedRequest();
                const response = await requestInstance.get(`${constants.BASE_URL}get-society-events`, {
                    params: {
                        society: society.name,
                    },
                });
                setsocietyEvents(response.data);
                let filteredData = response.data
                    .filter((event) => Array.isArray(event.imageFileNames))
                    .flatMap((event) => event.imageFileNames || []);
                setCrouselimage(filteredData);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        if (society || rerun) {
            console.log('rerunned')
            fetchEvents();
            setrerun(false)
        }
    }, [society, runuseeffectagain]);

    useEffect(() => {
        if (location.state) {
            setSociety(location.state);
            setLoading(false);
        }
    }, [location.state]); // Listen to changes in location.state

    const openEventModal = () => {
        setShowEventModal(true);
    };

    const closeEventModal = () => {
        setShowEventModal(false);
        setrunuseeffectagain(!runuseeffectagain)
        setrerun(true)
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setloading2(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [crouseimages])
    if (loading || !society) {
        // Show skeleton loading while data is being fetched or loading
        return (
            <WrapperComponent>
                <Card bordered={false} style={{ margin: '0px' }}>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Skeleton height={300} />
                    </div>
                    <Title><Skeleton /></Title>
                    <Descriptions title={<Skeleton />} bordered>
                        <Descriptions.Item label={<Skeleton />}><Skeleton /></Descriptions.Item>
                        <Descriptions.Item label={<Skeleton />}><Skeleton /></Descriptions.Item>
                        <Descriptions.Item label={<Skeleton />}><Skeleton /></Descriptions.Item>
                        <Descriptions.Item label={<Skeleton />}><Skeleton /></Descriptions.Item>
                        <Descriptions.Item label={<Skeleton />}><Skeleton /></Descriptions.Item>
                        <Descriptions.Item label={<Skeleton />}><Skeleton /></Descriptions.Item>
                        <Descriptions.Item label={<Skeleton />}><Skeleton /></Descriptions.Item>
                        <Descriptions.Item label={<Skeleton />}><Skeleton /></Descriptions.Item>
                    </Descriptions>
                    <Divider />
                    <Descriptions title={<Skeleton />} bordered>
                        <Descriptions.Item label={<Skeleton />}><Skeleton /></Descriptions.Item>
                        <Descriptions.Item label={<Skeleton />}><Skeleton /></Descriptions.Item>
                        <Descriptions.Item label={<Skeleton />}><Skeleton /></Descriptions.Item>
                        <Descriptions.Item label={<Skeleton />}><Skeleton /></Descriptions.Item>
                    </Descriptions>
                </Card>
            </WrapperComponent>
        );
    }

    // Once data is loaded, render actual society information
    return (
        <WrapperComponent transparentNavbar={true}>
            {((UserType === 'admin' || UserType === 'S-Admin') && !society.Simple) && <AppBar position="static" style={{ backgroundColor: 'purple', boxShadow: 'none', borderBottom: '1px solid #e0e0e0' }}>
                <Toolbar >
                    <MuiTypography variant="h6" style={{ flexGrow: 1, color: 'white', margin: 0 }}>
                        Add Event : {society.created_by}
                    </MuiTypography>
                    <IconButton style={{ backgroundColor: 'white' }} onClick={openEventModal}>
                        <Add style={{ color: 'purple' }} />
                    </IconButton>
                </Toolbar>
            </AppBar>}
            <div style={{ display: 'flex', height: '70vh', position: 'relative' }}>
                <div style={{ width: '100%', position: 'relative' }}>
                    {loading2 ? (
                        <div style={{ height: '50vh', width: '100%' }}>
                            <Skeleton height="100%" width="100%" />
                        </div>
                    ) : (
                        <Carousel autoplay className='custom-carousel'>
                            {crouseimages.length > 0 ? (
                                crouseimages.map((image, index) => (
                                    <div key={index} style={{ height: '50vh' }}>
                                        <img
                                            style={{ width: '100%', height: '50vh', objectFit: 'cover' }}
                                            src={`${constants.BASE_URL}images/${image}`}
                                            alt={`Slide ${index}`}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div style={{ height: '50vh', width: '100%' }}>
                                    <img
                                        style={{ width: '100%', height: '50vh', objectFit: 'cover' }}
                                        src={notFoundImage}
                                        alt="Not Found"
                                    />
                                </div>
                            )}
                        </Carousel>
                    )}
                </div>
                <div style={{
                    position: 'absolute',
                    bottom: '0%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '10px', // Optional: to round the corners of the cover photo container
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    {society.cover_photo ? (
                        <img
                            src={society.cover_photo}
                            alt="Cover Photo"
                            style={{ objectFit: 'cover', height: '25vh', width: '25vh', borderRadius: '50%' }}
                        />
                    ) : (
                        <Skeleton circle={true} height={150} width={150} />
                    )}
                    <Title style={{ marginTop: '1%' }} level={2}>{society.name}</Title>
                </div>
            </div>

            <div bordered={false} style={{ margin: isSmallScreen ? '10%' : '5%', marginTop: 0, textAlign: isSmallScreen ? 'center' : 'left' }}>
                <Text >{society.description}</Text>
                {society.tags[0].split(',').map((item, index) => (
                    <Text key={index} style={{ fontWeight: 'bold', color: 'purple' }}>
                        #{item}
                    </Text>
                ))}
                <Divider />
                {societyEvents.length !== 0 ? (
                    <ScrollingHorizontally data={societyEvents} title={'Events'} subheader={'Check This Society Events'} subheaderColor={"purple"} showdel={!society.Simple} deletesucess={() => {
                        setrunuseeffectagain(!runuseeffectagain)
                        setrerun(true)
                    }} />
                ) : (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <ArrowForward style={{ fontSize: 30 }} />
                            <Title level={3} style={{ margin: 0 }}>
                                Events
                            </Title>
                        </div>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Lottie
                                options={{
                                    loop: true,
                                    autoplay: true,
                                    animationData: datanotfound,
                                }}
                                height={100}
                                width={100}
                            />
                            <Text>No Event Yet</Text>
                        </div>
                    </>
                )}
                <Divider />
                <Descriptions title="Society Contact Details" bordered>
                    <Descriptions.Item label="President Name">{society.president.name}</Descriptions.Item>
                    <Descriptions.Item label="President Email">{society.president.email}</Descriptions.Item>
                    <Descriptions.Item label="President Phone">{society.president.phone}</Descriptions.Item>
                    <Descriptions.Item label="Vice President Name">{society.vice_president.name}</Descriptions.Item>
                    <Descriptions.Item label="Vice President Email">{society.vice_president.email}</Descriptions.Item>
                    <Descriptions.Item label="Vice President Phone">{society.vice_president.phone}</Descriptions.Item>
                    <Descriptions.Item label="Society Contact Email">{society.contact_info.email}</Descriptions.Item>
                    <Descriptions.Item label="Society Contact Phone">{society.contact_info.phone}</Descriptions.Item>
                </Descriptions>
                <Divider />
                <Descriptions title="Links" bordered>
                    <Descriptions.Item label="Facebook">
                        <a href={society.social_media_links.facebook} style={{ color: 'purple' }} target="_blank" rel="noopener noreferrer">
                            {society.social_media_links.facebook}
                        </a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Twitter">
                        <a href={society.social_media_links.twitter} style={{ color: 'purple' }} target="_blank" rel="noopener noreferrer">
                            {society.social_media_links.twitter}
                        </a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Instagram">
                        <a href={society.social_media_links.instagram} style={{ color: 'purple' }} target="_blank" rel="noopener noreferrer">
                            {society.social_media_links.instagram}
                        </a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Website">
                        <a href={society.website} style={{ color: 'purple' }} target="_blank" rel="noopener noreferrer">
                            {society.website}
                        </a>
                    </Descriptions.Item>
                </Descriptions>
            </div>

            {/* Modal for creating event */}
            <Modal open={showEventModal} onClose={closeEventModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80vw', // Adjust the width as needed
                        maxWidth: '600px', // Example of max width
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        overflowY: 'auto', // Make the modal scrollable
                        maxHeight: '80vh', // Limit the max height if needed
                    }}
                >    <CreateEvent
                        onclose={closeEventModal} // Pass close function to handle modal close
                        edit={null}
                        societyName={society.name}
                    />
                </Box>
            </Modal>
        </WrapperComponent>
    );
};

export default AboutSocietyPage;
