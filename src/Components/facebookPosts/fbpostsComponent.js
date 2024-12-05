import React, { useState } from 'react';
import axios from 'axios';
import constants from '../../Constants/constants';
import createAuthenticatedRequest from '../../RequestwithHeader';

const FacebookPostButton = () => {
    const [posting, setPosting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);
    const requestInstance = createAuthenticatedRequest();

    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handlePost = async () => {
        setPosting(true);
        setError(null);
        setSuccess(false);

        const formData = new FormData();
        formData.append('message', message);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await requestInstance.post(`${constants.BASE_URL}post-to-facebook`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type for FormData
                },
            });

            if (response.data.success) {
                setSuccess(true);
            } else {
                setError('Failed to post to Facebook.');
            }
        } catch (err) {
            setError('Error occurred: ' + err.message);
        }

        setPosting(false);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />
            <button onClick={handlePost} disabled={posting}>
                {posting ? 'Posting...' : 'Post to Facebook'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Successfully posted to Facebook!</p>}
        </div>
    );
};

export default FacebookPostButton;
