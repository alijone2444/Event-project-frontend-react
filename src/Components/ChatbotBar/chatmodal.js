import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, List, ListItem, ListItemText, Typography, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import Lottie from 'react-lottie';
import axios from 'axios'; // Import Axios
import animationData from '../../lottie/Evento_bot.json'; // Make sure to use the correct path to your Lottie file
import animationData2 from '../../lottie/BotTyping.json'; // Make sure to use the correct path to your Lottie file
import WaveIcon from '@mui/icons-material/WavingHand';
import HelpIcon from '@mui/icons-material/HelpOutlined';
import ServicesIcon from '@mui/icons-material/MiscellaneousServices';
import createAuthenticatedRequest from '../../RequestwithHeader';
import constants from '../../Constants/constants';

const ChatModal = ({ open, handleClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const chatContainerRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const requestInstance = createAuthenticatedRequest();

    const handleSend = async (message) => {
        const text = message || input;
        if (text.trim() === '') return;

        setLoading(true);
        const userMessage = { text, sender: 'user' };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput(''); // Clear input field immediately after sending the message

        try {
            const response = await requestInstance.post(`${constants.BASE_URL_2}ask-evento`, { message: text });
            const responseData = response.data;
            setLoading(false);
            const botResponse = { text: responseData ? responseData : 'sorry i cant find an answer to you question', sender: 'bot' };
            setMessages([...updatedMessages, botResponse]);
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
    };

    const defaultOptions2 = {
        loop: true,
        autoplay: true,
        animationData: animationData2,
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    height: '90%',
                    background: 'linear-gradient(45deg, #1771ea, #5a9ffb)',
                    color: 'white',
                }
            }}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px', background: 'linear-gradient(45deg, #1771ea, #5a9ffb)', color: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Lottie options={defaultOptions} height={40} width={40} />
                    <Typography variant="h6" sx={{ marginLeft: 1 }}>Evento chat</Typography>
                </div>
                <IconButton onClick={handleClose} sx={{ color: 'white' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers ref={chatContainerRef} sx={{ background: 'white', color: 'black', padding: '8px 16px', overflowY: 'auto', flex: '1' }}>
                <List>
                    {messages.map((message, index) => (
                        <ListItem key={index} alignItems="flex-start">
                            <ListItemText
                                primary={
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        sx={{ color: '#1771ea' }}
                                    >
                                        {message.sender === 'user' ? 'You' : 'Evento'}
                                    </Typography>
                                }
                                secondary={
                                    <>
                                        {message.text}
                                        {(loading && index === messages.length - 1) && <Lottie options={defaultOptions2} height={40} width={40} />}
                                    </>
                                }
                                style={{ textAlign: message.sender === 'user' ? 'right' : 'left', background: '#f0f0f0', padding: '8px', borderRadius: '4px', marginBottom: '4px' }}
                            />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions sx={{ background: 'white', color: 'white', display: 'flex', alignItems: 'center', padding: '8px 16px' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type a message"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') handleSend();
                    }}
                    sx={{ backgroundColor: 'white', borderRadius: 1 }}
                />
                <IconButton onClick={() => handleSend()} color="primary" sx={{ marginLeft: 1 }}>
                    <SendIcon />
                </IconButton>
            </DialogActions>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', overflowX: 'auto' }}>
                <DialogActions sx={{ background: 'linear-gradient(45deg, #1771ea, #5a9ffb)', color: 'white', justifyContent: 'center', padding: '8px 16px' }}>
                    <Button
                        style={{ backgroundColor: 'transparent', color: 'white', border: '1px solid white' }}
                        onClick={() => handleSend('Hi, how are you?')}
                        startIcon={<WaveIcon />}
                    >
                        Greet Evento
                    </Button>
                </DialogActions>
                <DialogActions sx={{ background: 'linear-gradient(45deg, #1771ea, #5a9ffb)', color: 'white', justifyContent: 'center', padding: '8px 16px' }}>
                    <Button
                        style={{ backgroundColor: 'transparent', color: 'white', border: '1px solid white' }}
                        onClick={() => handleSend('Can you help me with something?')}
                        startIcon={<HelpIcon />}
                    >
                        Ask for Help
                    </Button>
                </DialogActions>
                <DialogActions sx={{ background: 'linear-gradient(45deg, #1771ea, #5a9ffb)', color: 'white', justifyContent: 'center', padding: '8px 16px' }}>
                    <Button
                        style={{ backgroundColor: 'transparent', color: 'white', border: '1px solid white' }}
                        startIcon={<ServicesIcon />}
                    >
                        Feedback
                    </Button>
                    ..............................
                </DialogActions>
            </div>
        </Dialog>
    );
};

export default ChatModal;
