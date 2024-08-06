import React from 'react';
import { IconButton, Tooltip, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { Facebook, WhatsApp, Email, LinkedIn } from '@mui/icons-material';

const ShareComponent = ({ open, handleClose, url, title }) => {

    const handleShare = (platform) => {
        const encodedUrl = encodeURIComponent(url);
        const encodedTitle = encodeURIComponent(title);

        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
                break;
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, '_blank');
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`, '_blank');
                break;
            case 'email':
                window.open(`mailto:?subject=${encodedTitle}&body=${encodedUrl}`, '_blank');
                break;
            default:
                break;
        }
        handleClose(); // Close the modal after sharing
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Share This</DialogTitle>
            <DialogContent>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <Tooltip title="Share on Facebook">
                        <IconButton onClick={() => handleShare('facebook')} style={{ margin: '8px' }}>
                            <Facebook />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Share on WhatsApp">
                        <IconButton onClick={() => handleShare('whatsapp')} style={{ margin: '8px' }}>
                            <WhatsApp />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Share on LinkedIn">
                        <IconButton onClick={() => handleShare('linkedin')} style={{ margin: '8px' }}>
                            <LinkedIn />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Share via Email">
                        <IconButton onClick={() => handleShare('email')} style={{ margin: '8px' }}>
                            <Email />
                        </IconButton>
                    </Tooltip>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ShareComponent;
