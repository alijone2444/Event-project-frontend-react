import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useMediaQuery } from '@mui/material';

const AppBarComponent = ({ title, onBackButtonClick }) => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return (
        <AppBar position="static" style={{ backgroundColor: ' rgba(30, 144, 255, 0.5)' }}>
            <Toolbar variant="dense" style={{ minHeight: '0px', marginTop: isSmallScreen ? '-5px' : '7px' }}>
                {onBackButtonClick && (
                    <IconButton edge="start" color="inherit" onClick={onBackButtonClick}>
                        <ArrowBack style={{ fontSize: '20px' }} />
                    </IconButton>
                )}
                <Typography variant="body1">{title}</Typography>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarComponent;
