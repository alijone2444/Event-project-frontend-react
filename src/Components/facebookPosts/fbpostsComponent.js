import React, { useState } from 'react';
import constants from '../../Constants/constants';
import createAuthenticatedRequest from '../../RequestwithHeader';
import TopBar from '../AdminBar';
const FacebookPost = () => {
    const [posting, setPosting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [eventName, setEventName] = useState('');
    const [message, setMessage] = useState('');
    const [description, setDescription] = useState('');
    const [societyName, setSocietyName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [image, setImage] = useState(null);
    const requestInstance = createAuthenticatedRequest();

    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handlePost = async () => {
        setPosting(true);
        setError(null);
        setSuccess(false);

        const formattedMessage = `${eventName}\n\nDescription: ${description}\nSociety: ${societyName}\nEvent Date: ${eventDate}`;

        const formData = new FormData();
        formData.append('message', formattedMessage);
        formData.append('description', description);
        formData.append('societyName', societyName);
        formData.append('eventDate', eventDate);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await requestInstance.post(`${constants.BASE_URL}post-to-facebook`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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
        <>
        <TopBar title={'Post to facebook'}/>
        <div style={{ marginTop:'5%',maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <input
                type="text"
                placeholder="Enter event name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <input
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <input
                type="text"
                placeholder="Enter society name"
                value={societyName}
                onChange={(e) => setSocietyName(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <input
                type="text"
                placeholder="Enter event date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ width: '100%', marginBottom: '10px' }}
            />
            <button 
                onClick={handlePost} 
                disabled={posting}
                style={{ width: '100%', padding: '10px', backgroundColor: posting ? '#ccc' : '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: posting ? 'not-allowed' : 'pointer' }}
            >
                {posting ? 'Posting...' : 'Post to Facebook'}
            </button>
            {error && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{error}</p>}
            {success && <p style={{ color: 'green', marginTop: '10px', textAlign: 'center' }}>Successfully posted to Facebook!</p>}
        </div>
        </>
    );
};


export default FacebookPost;
