import React, { useState, useEffect } from 'react';
import { Toolbar, Button } from '@mui/material';
import Lottie from 'react-lottie';
import { makeStyles } from '@mui/styles';
import { Wave } from 'react-animated-text';
import animationData from '../../lottie/Evento_bot.json';
import ChatModal from './chatmodal'; // Import the ChatModal component
import './chatbot.css';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        backgroundColor: 'rgba(9, 0, 79,0.3)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
    },
}));

function ToolbarBelowNavbar() {
    const classes = useStyles();
    const [paused, setPaused] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const animationDuration = 8000;

    useEffect(() => {
        let timeoutId;

        const startAnimation = () => {
            setPaused(false);
            timeoutId = setTimeout(() => {
                setPaused(true);
                timeoutId = setTimeout(() => {
                    setPaused(false);
                }, 1000);
            }, animationDuration);
        };

        startAnimation();

        return () => clearTimeout(timeoutId);
    }, [paused]);

    return (
        <Toolbar className={classes.toolbar}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Lottie
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: animationData,
                    }}
                    height={50}
                    width={50}
                />
                <section className="animation-2">
                    <div className="first-text"><div>Hi! Im Evento</div></div>
                    <div className="second-text"><div>Chat with me</div></div>
                    <div className="third-text"><div>Get Assistance</div></div>
                    <div className="fourth-text"><div>Get Support</div></div>
                </section>
            </div>
            <Button variant="contained" sx={{ fontSize: '0.75rem', padding: '6px 12px' }} style={{ backgroundColor: 'transparent', border: '1px solid white', color: 'white', }} className={classes.button} onClick={handleOpen}>
                <Wave
                    text="Try Evento Now"
                    effect="stretch"
                    effectChange={2.5}
                    effectDuration={0.5}
                    iterations={1}
                    paused={paused}
                />
            </Button>
            {/* Use ChatModal component */}
            <ChatModal open={open} handleClose={handleClose} />
        </Toolbar>
    );
}

export default ToolbarBelowNavbar;
