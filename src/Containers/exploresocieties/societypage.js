import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Typography, Divider } from 'antd';
import Skeleton from 'react-loading-skeleton';
import WrapperComponent from '../../FooterAndHeaderwrapper';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import ScrollingHorizontally from '../Home/StudentHome/HomePageScrolls/HrScroll';
import createAuthenticatedRequest from '../../RequestwithHeader';
import constants from '../../Constants/constants';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import datanotfound from '../../lottie/noDatayet.json';
import Lottie from 'react-lottie';
import Add from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import { Toolbar, AppBar, Typography as MuiTypography, Box, Modal, Button, useMediaQuery } from '@mui/material'; // Importing Toolbar, AppBar, Button, Box, Typography, and Modal from @mui/material
import CreateEvent from '../../Components/EventCreation/eventcreationComponent';
import { Carousel } from "antd";
import './societyPage.css'
import notFoundImage from '../../images/societyBackgroundNotfound.jpg'; // Import static image
import AppBarComponent from '../../Components/SubAppbar/appbar';
import { useNavigate } from 'react-router-dom';
import ImageGallery from '../../Components/ImagesGallery/imageGalery';
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
    const navigate = useNavigate()
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

        return (
            <WrapperComponent>
                <AppBarComponent backgroundColor={'purple'} onBackButtonClick={() => { navigate('/societies') }} title='Back' />
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
    const galleryImages = society.imageFileNames.map((item) => `${constants.BASE_URL}societyImages/${item}`)

    return (
        <WrapperComponent transparentNavbar={true}>
            <AppBarComponent backgroundColor={'purple'}
                onBackButtonClick={() => {
                    if (society.Simple) {
                        navigate('/societies');
                        console.log('run 1')
                    } else if (!society.Simple && society.comeBackTo) {
                        navigate(society.comeBackTo, { state: { role: UserType }, replace: true });
                        console.log('run 2')
                    } else {
                        navigate('/SocietyAdminPortal');
                        console.log('run 3')
                    }
                }} title='Go Back' />
            {((UserType === 'admin' || UserType === 'President') && !society.Simple) && <AppBar position="static" style={{ backgroundColor: 'purple', boxShadow: 'none', borderBottom: '1px solid #e0e0e0' }}>
                <Toolbar >
                    <MuiTypography variant="h6" style={{ flexGrow: 1, color: 'white', margin: 0 }}>
                        Add Event : {society.members
                            .filter(member => typeof member === "object" && member.role === UserType) // Filter objects with matching 'role'
                            .map(filteredMember => filteredMember.name) // Extract the 'name' of each filtered member
                            .join(', ')}
                    </MuiTypography>
                    <IconButton style={{ backgroundColor: 'white' }} onClick={openEventModal}>
                        <Add style={{ color: 'purple' }} />
                    </IconButton>
                </Toolbar>
            </AppBar>}
            <div style={{ display: 'flex', height: isSmallScreen ? '50vh' : '70vh', position: 'relative' }}>
                <div style={{ width: '100%', position: 'relative' }}>
                    {loading2 ? (
                        <div style={{ height: isSmallScreen ? '30vh' : '50vh', width: '100%' }}>
                            <Skeleton height="100%" width="100%" />
                        </div>
                    ) : (
                        <Carousel autoplay className='custom-carousel'>
                            {crouseimages.length > 0 ? (
                                crouseimages.map((image, index) => (
                                    <div key={index} style={{ height: isSmallScreen ? '30vh' : '50vh' }}>
                                        <img
                                            style={{ width: '100%', height: isSmallScreen ? '30vh' : '50vh', objectFit: 'cover' }}
                                            src={`${constants.BASE_URL}images/${image}`}
                                            alt={`Slide ${index}`}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div style={{ height: isSmallScreen ? '30vh' : '50vh', width: '100%' }}>
                                    <img
                                        style={{ width: '100%', height: isSmallScreen ? '30vh' : '50vh', objectFit: 'cover' }}
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
                    {society.coverPhotoName ? (
                        <img
                            src={`${constants.BASE_URL}societyImages/${society.coverPhotoName}`}
                            alt="Cover Photo"
                            style={{ objectFit: 'cover', height: '25vh', width: '25vh', borderRadius: '50%', background: 'white' }}
                        />
                    ) : (
                        <Skeleton circle={true} height={150} width={150} />
                    )}
                    <Title style={{ marginTop: '1%', fontWeight: 'bold' }} level={2}>{society.name}</Title>
                </div>
            </div>
            <div style={{ margin: '5%', marginTop: '2%', textAlign: isSmallScreen ? 'center' : 'left' }}>
                <Text >{society.description}</Text>
                {society.tags[0].split(',').map((item, index) => (
                    <Text key={index} style={{ fontWeight: 'bold', color: 'purple' }}>
                        #{item}
                    </Text>
                ))}
            </div>
            <Divider />
            <div>
                {societyEvents.length !== 0 ? (
                    <ScrollingHorizontally data={societyEvents} setSmallHeading={true} title={'Events'} subheader={'Check This Society Events'} subheaderColor={"purple"} showdel={!society.Simple} deletesucess={() => {
                        setrunuseeffectagain(!runuseeffectagain)
                        setrerun(true)
                    }} toNavigate='/societies' />
                ) : (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '5%' }}>
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
                            <Text style={{ color: 'grey' }}>No Event Yet</Text>
                        </div>
                    </>
                )}
            </div>
            <Divider />
            <div style={{ margin: '5%' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <ArrowForward style={{ fontSize: 30 }} />
                    <Title level={3} >Gallery</Title>
                </div>
                {galleryImages.length === 0 && <div style={{ paddingLeft: '5%' }}>
                    <MuiTypography
                        style={{ color: 'purple', background: "white", display: 'inline-block', }}
                        variant='h6'
                    >
                        Showcase Society Moments and Memories
                    </MuiTypography>
                    <Divider style={{ background: 'purple', marginTop: '-15px', marginRight: "10%" }} />
                </div>}
                {galleryImages.length === 0 ?
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '3%' }}>
                        <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
                            <ImageNotSupportedIcon />
                            <Text style={{ color: 'grey' }}>no images in gallery</Text>
                        </div>
                    </div>
                    :
                    <ImageGallery images={galleryImages} />}
            </div>
            <div bordered={false} style={{ margin: '5%', marginTop: 0 }}>
                <Divider />
                <Descriptions title="Society Contact Details" bordered>
                    <Descriptions.Item label="President Name">{society.president.name}</Descriptions.Item>
                    <Descriptions.Item label="President Email">{society.president.email}</Descriptions.Item>
                    <Descriptions.Item label="President Phone">{society.president.phone}</Descriptions.Item>
                    <Descriptions.Item label="Vice President Name">{society.vice_president.name}</Descriptions.Item>
                    <Descriptions.Item label="Vice President Email">{society.vice_president.email}</Descriptions.Item>
                    <Descriptions.Item label="Vice President Phone">{society.vice_president.phone}</Descriptions.Item>
                    {society.contact_info?.email && <Descriptions.Item label="Society Contact Email">{society.contact_info.email}</Descriptions.Item>}
                    {society.contact_info?.phone && <Descriptions.Item label="Society Contact Phone">{society.contact_info.phone}</Descriptions.Item>}
                </Descriptions>
                <Divider />
                <Descriptions title="Links" bordered>
                    <Descriptions.Item label="Facebook">
                        <a href={society.social_media_links.facebook} style={{ color: 'purple' }} target="_blank" rel="noopener noreferrer">
                            {society.social_media_links.facebook}
                        </a>
                    </Descriptions.Item>
                    {society.social_media_links?.twitter && <Descriptions.Item label="Twitter">
                        <a href={society.social_media_links.twitter} style={{ color: 'purple' }} target="_blank" rel="noopener noreferrer">
                            {society.social_media_links.twitter}
                        </a>
                    </Descriptions.Item>}
                    <Descriptions.Item label="Instagram">
                        <a href={society.social_media_links?.instagram} style={{ color: 'purple' }} target="_blank" rel="noopener noreferrer">
                            {society.social_media_links.instagram}
                        </a>
                    </Descriptions.Item>
                    {society?.website && <Descriptions.Item label="Website">
                        <a href={society.website} style={{ color: 'purple' }} target="_blank" rel="noopener noreferrer">
                            {society.website}
                        </a>
                    </Descriptions.Item>}
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
