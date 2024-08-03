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

function Heading(props) {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const [editModal, setEditModal] = useState(false);
    const letters1 = ["I", "S", "T", "\u00A0", "E", "M", "S"];
    const profileData = useSelector(state => state.profiledata);
    const dispatch = useDispatch();

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
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img src={profileData.profileImageUrl || Profile} alt="Profile" style={{ height: '50px', width: '50px', borderRadius: '50%', cursor: 'pointer', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.5)' }} onClick={() => { navigate('/user-profile', { state: profileData }) }} />

                    <IconButton
                        style={{
                            position: 'absolute',
                            bottom: '0',
                            color: '#0294c5',
                            right: '0',
                            padding: '0',
                            backgroundColor: 'transparent',
                        }}
                        onClick={handleEditProfile}
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
                        <div className="shadow">{letter}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Heading;
