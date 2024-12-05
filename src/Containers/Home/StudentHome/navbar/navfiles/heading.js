// Heading.js
import React, { useState, useEffect } from 'react';
import { useMediaQuery, IconButton } from '@mui/material';
import Image from '../../../../../images/paint_logo.png';
import Profile from '../../../../../images/noProfile.png';
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { setProfileData } from '../../../../../ReduxStore/actions/profileDataAction';
import EditProfileModal from '../../../../Profile/profileEditModal';
import createAuthenticatedRequest from '../../../../../RequestwithHeader';
import constants from '../../../../../Constants/constants';
import Badge from '../../../../../Components/badge/badge';

function Heading(props) {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const [editModal, setEditModal] = useState(false);
    const letters1 = ["E", "V", "E", "N", "T", "I", "V", "E"];
    const profileData = useSelector(state => state.profiledata);
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false); // Track hover state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const requestInstance = createAuthenticatedRequest();
                const response = await requestInstance.get(`${constants.BASE_URL}get-profile-data`);
                if (response.data.profile) {
                    dispatch(setProfileData(response.data.profile));
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        if (Object.keys(profileData).length === 0) {
            // Fetch profile data when the component mounts or updates
            fetchProfileData();
        }
    }, [dispatch]);

    const handleEditProfile = () => {
        setEditModal(true);
    };

    const handleModalClose = () => {
        setEditModal(false);
    };

    return (
        <div className='parent'>
            {isSmallScreen ? (
                <a>
                    <img src={Image} alt="Logo" style={{ height: '60px', }} />
                </a>
            ) : (
                <div
                    className="profile-container"
                    onMouseEnter={() => setIsHovered(true)}  // Track hover on
                    onMouseLeave={() => setIsHovered(false)} // Track hover off
                    style={{ position: 'relative', display: 'inline-block' }}
                >
                    <img
                        src={profileData.profileImageUrl || Profile}
                        alt="Profile"
                        onClick={() => { navigate('/user-profile', { state: profileData }) }}
                        style={{
                            height: '50px',
                            width: '50px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            objectFit: 'cover',
                            border: '2px solid rgba(255,255,255,0.5)',
                        }}
                    />
                    {/* Use Badge component */}
                    <Badge badgeImageUrl={profileData.badgeImageUrl} />

                    {/* Edit Button */}
                    <IconButton
                        onClick={handleEditProfile}
                        style={{
                            position: 'absolute',
                            top: '0',
                            right: '0',
                            color: '#0294c5',
                            padding: '0',
                            backgroundColor: 'transparent',
                            opacity: isHovered ? 1 : 0,  // Show or hide based on hover state
                            transition: 'opacity 0.3s ease',  // Smooth transition
                        }}
                    >
                        <EditIcon
                            style={{
                                height: '15px',
                                width: '15px',
                                borderRadius: '50%',
                                backgroundColor: 'white',
                                border: '1px solid lightgrey'
                            }}
                        />
                    </IconButton>
                </div>
            )}

            <EditProfileModal open={editModal} onClose={handleModalClose} />
            <div className="overlay"></div>
            <div className="heading-text">
                {letters1.map((letter, index) => (
                    <div key={index} className="wrapper">
                        <div className="letter">{letter}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Heading;
