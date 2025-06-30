import React, { useEffect } from 'react';
import {
    Modal,
    Typography,
    Button,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // MUI icon
import { pollTypes } from '../../Constants/constants';

const PollCreationModal = ({ open, onClose, onSelectPollType }) => {
    useEffect(() => {

    }, [])
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="poll-creation-modal"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    padding: '2.5rem 2rem',
                    borderRadius: '18px',
                    minWidth: 340,
                    maxWidth: 380,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    position: 'relative',
                }}
            >
                {/* Close Button */}
                <IconButton
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        zIndex: 10,
                        background: 'rgba(0,0,0,0.05)',
                    }}
                >
                    <CloseIcon style={{ fontSize: 20 }} />
                </IconButton>

                <Typography
                    variant="h5"
                    style={{
                        marginBottom: '2rem',
                        textAlign: 'left',
                        fontWeight: 500,
                        color: '#444',
                    }}
                >
                    What do you want to do?
                </Typography>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}
                >
                    {pollTypes.map((pollType) => (
                        <Button
                            key={pollType.type}
                            onClick={() =>
                                onSelectPollType(pollType.type, pollType.color)
                            }
                            startIcon={pollType.icon}
                            style={{
                                background: pollType.color,
                                color: '#fff',
                                fontWeight: 500,
                                fontSize: '1.1rem',
                                borderRadius: 8,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                                padding: '0.9rem 1.2rem',
                                justifyContent: 'flex-start',
                                textTransform: 'none',
                                transition: 'box-shadow 0.2s',
                            }}
                            fullWidth
                        >
                            {pollType.title}
                        </Button>
                    ))}
                </div>
            </div>
        </Modal>
    );
};

export default PollCreationModal;
