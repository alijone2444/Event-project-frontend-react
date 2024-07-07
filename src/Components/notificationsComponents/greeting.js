import React, { useState, useEffect } from 'react';
import { Alert } from 'antd';

const Greeting = ({ message }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false); // Hide the alert after 5 seconds
        }, 5000);

        return () => {
            clearTimeout(timer); // Cleanup the timer on unmount or dependency change
        };
    }, []);

    return (
        <>
            {visible && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        right: '20px',
                        zIndex: 9999,
                    }}
                >
                    <Alert
                        message={message}
                        type="success"
                        showIcon
                        style={{ minWidth: '300px' }}
                    />
                </div>
            )}
        </>
    );
};

export default Greeting;
