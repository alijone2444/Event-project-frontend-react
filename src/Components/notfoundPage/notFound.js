// src/NotFound.js
import React from 'react';
import Lottie from 'react-lottie';
import { Alert } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design styles
import notFoundAnimation from '../../lottie/notfound.json'; // Adjust the path as needed

const NotFound = () => {
    return (
        <div style={styles.container}>
            <Lottie
                options={{
                    loop: true,
                    autoplay: true,
                    animationData: notFoundAnimation,
                }}
                height={styles.lottie.height}
                width={styles.lottie.width}
            />
            <Alert
                message="404 - Page Not Found"
                description="Sorry, the page you are looking for does not exist."
                type="info"
                showIcon
                style={styles.alert}
            />
        </div>
    );
};

const styles = {
    container: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        height: '100vh', // Ensure the container takes full viewport height
        width: '100vw',  // Ensure the container takes full viewport width
    },
    lottie: {
        width: '70vw', // Adjust width as needed
        height: '70vh', // Adjust height as needed
    },
    alert: {
        marginTop: '20px',
        maxWidth: '500px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
};

export default NotFound;
