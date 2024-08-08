import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useMediaQuery } from '@mui/material';

const AppBarComponent = ({ title, onBackButtonClick, backgroundColor }) => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return (
        <AppBar position="static" style={{ backgroundColor: backgroundColor, marginTop: isSmallScreen && '-1%' }}>
            <Toolbar variant="dense" style={{ minHeight: '0px', marginTop: isSmallScreen ? '0' : '0.5%' }}>
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
