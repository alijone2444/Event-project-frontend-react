import React from 'react';
import { Button, Card, Skeleton } from 'antd';
import './societyCards.css'
import { FireFilled } from '@ant-design/icons';
import TrendingUpIcon from '@mui/icons-material/TrendingUpOutlined'
import NewReleasesIcon from '@mui/icons-material/NewReleasesRounded';
import '../../Containers/Home/StudentHome/HomePageScrolls/hrscroll.css'
import ArrowForward from '@mui/icons-material/ArrowForward';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import Divider from '@mui/material/Divider';
import recordSocietyVisit from '../functions/recortSocietyVisits';
import { useNavigate } from 'react-router-dom';
const CustomCard = ({ IconComponent, title, name, content, gradient, allData }) => {
    const navigate = useNavigate()
    return (
        <Card
            className="custom-card"
            style={{ background: gradient }}
            bodyStyle={{ padding: 0 }}
        >
            <div className="icon">
                {IconComponent}
            </div>
            <div className="content">
                <h2>{title}</h2>
                <h3 style={{ color: 'white' }}>{name}</h3>
                <p>{content}</p>
                <a className="effect effect-1" title="Visit" onClick={() => { navigate('society-page', { state: { ...allData, Simple: true } }); recordSocietyVisit(name) }}>See more</a>
            </div>
        </Card >
    );
};

const SocietyCards = (props) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const { threeSocieties } = props;
    console.log('eeha', threeSocieties)
    return (
        <div style={{
            display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, rgba(30, 144, 255, 0.7) 0%, rgba(70, 130, 180, 0.5) 30%, rgba(148, 201, 255, 0.5) 70%, rgba(218, 237, 255, 0.5) 100%)',
            paddingTop: '3%'
        }}>
            <div className='recent-container' style={{
                paddingTop: '5%',
            }}>
                <ArrowForward style={{ fontSize: 40, color: 'white' }} />
                <Typography className='recent' style={{ color: "white" }} variant='h4'>
                    Highlights
                </Typography>
            </div>
            <div>
                <Typography
                    className='subheader'
                    style={{ background: isMobile ? '#70b4fc' : 'linear-gradient(135deg, #70b4fc 0%, #a4bcdc 80% , #a8c4dc 100%)', paddingRight: '1%', color: '#ededed', display: 'inline-block' }}
                    variant='h6'
                >
                    Discover Top Rated, Trending, and New Societies
                </Typography>
                {!isMobile && <Divider style={{ background: 'white', marginTop: '-15px', marginRight: "10%" }} />}
            </div>

            <div className="container-societycards">
                <CustomCard
                    IconComponent={<FireFilled style={{ fontSize: '5rem', color: '#ff2ae0' }} />}
                    title={"Top Rated"}
                    name={threeSocieties.topRated?.name}
                    content={threeSocieties.topRated?.description || "Loading..."}
                    gradient="linear-gradient(to bottom, #ff2ae0, #645bf6)"
                    allData={threeSocieties.topRated}
                />
                <CustomCard
                    IconComponent={<TrendingUpIcon style={{ fontSize: '5rem', color: '#ffec61' }} />}
                    title={"Trending Now"}
                    name={threeSocieties.trending?.name}
                    content={threeSocieties.trending?.description || "Loading..."}
                    gradient="linear-gradient(to bottom, #ffec61, #f321d7)"
                    allData={threeSocieties.trending}
                />
                <CustomCard
                    IconComponent={<NewReleasesIcon style={{ fontSize: '5rem', color: '#24ff72' }} />}
                    title={"New Arrivals"}
                    name={threeSocieties.newArrival?.name}
                    content={threeSocieties.newArrival?.description || "Loading..."}
                    gradient="linear-gradient(to bottom, #24ff72, #9a4eff)"
                    allData={threeSocieties.newArrival}
                />
            </div>

        </div >
    );
};

export default SocietyCards;
