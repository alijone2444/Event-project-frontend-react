import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Typography, Divider } from 'antd';
import Skeleton from 'react-loading-skeleton';
import WrapperComponent from '../../FooterAndHeaderwrapper';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import ScrollingHorizontally from '../Home/StudentHome/HomePageScrolls/HrScroll';
import createAuthenticatedRequest from '../../RequestwithHeader';
import constants from '../../Constants/constants';
import ArrowForward from '@mui/icons-material/ArrowForward';
import datanotfound from '../../lottie/noDatayet.json'
import Lottie from 'react-lottie';
const { Title, Text } = Typography;

const AboutSocietyPage = () => {
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [society, setSociety] = useState(null); // State to store society data
    const location = useLocation(); // Use useLocation hook to get location object
    const [societyEvents, setsocietyEvents] = useState([])
    // Simulate data fetch (replace with actual data fetching logic)
    useEffect(() => {
        console.log('runninguse')
        const fetchEvents = async () => {
            try {

                const requestInstance = createAuthenticatedRequest()
                const response = await requestInstance.get(`${constants.BASE_URL}get-society-events`, {
                    params: {
                        society: society.name
                    },
                });
                setsocietyEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        if (society) {
            fetchEvents();
        }
    }, [society]);
    useEffect(() => {
        // Check if data exists in location state (from navigation)
        console.log('dasda', location.state)
        if (location.state) {
            setSociety(location.state); // Set society data from location state
            setLoading(false); // Set loading to false after setting data
        }
    }, [location.state]); // Listen to changes in location.state

    if (loading || !society) {
        // Show skeleton loading while data is being fetched or loading
        return (
            <WrapperComponent>
                <Card bordered={false} style={{ margin: '0px' }}>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Skeleton height={300} />
                    </div>
                    <Title ><Skeleton /></Title>
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
            <Card bordered={false} style={{ margin: '20px' }}>
                {society.cover_photo && (
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <img
                            src={society.cover_photo}
                            alt="Cover Photo"
                            style={{ maxWidth: '100%', height: 'auto', height: '40vh' }}
                        />
                    </div>
                )}
                <Title level={2}>{society.name}</Title>
                <Text>{society.description}</Text>
                {society.tags[0].split(',').map((item, index) => (
                    <Text key={index} style={{ fontWeight: 'bold', color: 'lightpurple' }}>
                        #{item}
                    </Text>
                ))}
                <Divider />

                {societyEvents.length !== 0 ? <ScrollingHorizontally data={societyEvents} title={'Events'} subheader={'Check This Society Events'} subheaderColor={"purple"} />
                    : <>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                            <ArrowForward style={{ fontSize: 30, }} />
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
                            <Text >No Event Yet</Text>
                        </div>
                    </>}
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
                        <a href={society.website} style={{ color: 'lightpurple' }} target="_blank" rel="noopener noreferrer">
                            {society.website}
                        </a>
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </WrapperComponent>
    );
};

export default AboutSocietyPage;
