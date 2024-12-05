// Badge.js
import React, { useState } from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import constants from '../../Constants/constants';
function Badge({ badgeImageUrl, isSidebar, onClick }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const NotSidebar = {
        position: "absolute",
        bottom: "0",
        right: "0",
        borderRadius: '50%',
        height: "20px",
        width: "20px",
        padding: "0",
        backgroundColor: "transparent",
        cursor: "pointer",
    }
    const ItIsSidebar = {
        position: "absolute",
        top: "10",
        left: "10",
        borderRadius: '50%',
        height: "30px",
        width: "30px",
        padding: "0",
        backgroundColor: "transparent",
        cursor: "pointer",
    }

    return (
        <div>
            {badgeImageUrl && (
                <img
                    src={`${constants.BASE_URL}badges/${badgeImageUrl}`}
                    alt="Profile Badge"
                    onClick={handleOpen} // Open modal on click
                    style={isSidebar ? ItIsSidebar : NotSidebar}
                />
            )}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="badge-modal-title"
                aria-describedby="badge-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 300,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "10px",
                        position: "relative", // To position the close button
                    }}
                >
                    {/* Close button in the top-right corner */}
                    <IconButton
                        onClick={handleClose}
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            color: "black", // Color of the close icon
                            backgroundColor: "transparent", // Transparent background
                            padding: "0", // No extra padding
                        }}
                    >
                        <CloseIcon /> {/* Close icon */}
                    </IconButton>

                    <img
                        src={`${constants.BASE_URL}badges/${badgeImageUrl}`}
                        alt="Profile Badge in Modal"
                        style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                        }}
                    />
                </Box>
            </Modal>
        </div>
    );
}

export default Badge;
