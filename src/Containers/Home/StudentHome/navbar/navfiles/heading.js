import '../../../../../styles/navbar_home.css';
import { useMediaQuery, IconButton } from '@mui/material';
import Image from '../../../../../images/paint_logo.png';
import Profile from '../../../../../images/noProfile.png';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import EditProfileModal from '../../../../Profile/profileEditModal';
function Heading(props) {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const [toggle, settoggle] = useState(false)
    const letters1 = ["I", "S", "T", "\u00A0", "E", "M", "S"];
    const [editModal, setEditModal] = useState(false);

    // const letters2 = ["E", "V", "E", "N", "T", "\u00A0", "M", "A", "N", "A", "G", "E", "M", "E", "N", "T", "\u00A0", "S", "Y", "S", "T", "E", "M"];
    const navigate = useNavigate()
    return (
        <div className='parent'>
            {isSmallScreen ? (
                <a
                >
                    <img src={Image} alt="Logo" style={{ height: '60px' }} />
                </a>
            ) : (
                <div style={{ position: 'relative', display: 'inline-block', borderRadius: '50%', border: '1px solid lightgrey' }}>
                    <img src={Profile} alt="Profile" style={{ height: '40px', width: '40px', borderRadius: '50%', cursor: 'pointer' }} onClick={() => { navigate('/user-profile') }} />
                    <IconButton
                        style={{
                            position: 'absolute',
                            bottom: '0',
                            color: '#0294c5',
                            right: '0',
                            padding: '0', // Remove extra padding from the IconButton
                            backgroundColor: 'transparent', // Make background transparent
                        }}
                        onClick={() => {
                            setEditModal(true)
                        }}
                    >
                        {/* Pass editModal state to open prop of EditProfileModal */}

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
            <EditProfileModal open={editModal} onClose={() => setEditModal(false)} />

            <div className="overlay"></div>
            <div className="heading-text">
                {letters1.map((letter, index) => (
                    <div key={index} className="wrapper">
                        <div className="letter">{letter}</div>
                        <div className="shadow">{letter}</div>
                    </div>))}
            </div>
        </div>
    );
}

export default Heading;
