import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Box, Typography } from '@mui/material';
import axios from 'axios'; // Make sure to install axios if you haven't already
import constants from '../../Constants/constants';
import createAuthenticatedRequest from '../../RequestwithHeader';
const SocietyAdminConstantsForm = () => {
    const [numSocieties, setNumSocieties] = useState('');
    const [subHeading, setSubHeading] = useState('');
    const [loading, setLoading] = useState(false);
    const requestInstance = createAuthenticatedRequest()
    const handleSubmit = async () => {
        setLoading(true);
        try {
            await requestInstance.post(`${constants.BASE_URL}edit-constants`, {
                SocietiesCount: numSocieties,
                SocietyVantaSubheader: subHeading
            });
            // Handle success
            alert('Request sent successfully!');
        } catch (error) {
            // Handle error
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                width: '100%',
                borderRadius: 1,
                boxShadow: 1,
                backgroundColor: 'transparent',
            }}
        >
            <div>
                <Typography variant="h6" gutterBottom style={{ paddingLeft: '5%' }}>
                    Update Society Details
                </Typography>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', width: '50%', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', background: 'transparent' }}>
                        <TextField
                            label="Set number of societies in IST"
                            type="number"
                            fullWidth
                            margin="normal"
                            value={numSocieties}
                            onChange={(e) => setNumSocieties(e.target.value)}
                        />
                        <TextField
                            label="Sub heading of societies shown in the societies page"
                            fullWidth
                            margin="normal"
                            multiline
                            rows={5}
                            value={subHeading}
                            onChange={(e) => setSubHeading(e.target.value)}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                disabled={loading}
                                fullWidth
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                            </Button>
                        </Box>
                    </div>
                </div>

            </div>
        </Box >
    );
};

export default SocietyAdminConstantsForm;
