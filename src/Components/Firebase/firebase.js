import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import createAuthenticatedRequest from '../../RequestwithHeader';
import constants from '../../Constants/constants';
import axios from 'axios';
const firebaseConfig = {
    apiKey: "AIzaSyBZC4X_NNkjDv82ZtZWskZtFASGtMW0mCc",
    authDomain: "event-notifications-105e1.firebaseapp.com",
    projectId: "event-notifications-105e1",
    storageBucket: "event-notifications-105e1.appspot.com",
    messagingSenderId: "558605341302",
    appId: "1:558605341302:web:287791e72638d115db4557",
    measurementId: "G-099Q6Y8259"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const requestInstance = createAuthenticatedRequest();
const getAuthToken = () => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            resolve(token);
        } else {
            reject(new Error('No authToken found in localStorage.'));
        }
    });
};
const setupNotifications = async (onMessageCallback) => {
    try {
        const permission = await Notification.requestPermission();
        const authToken = await getAuthToken();
        if (permission === 'granted') {
            const token = await getToken(messaging);
            if (authToken) {
                await axios.post(
                    `${constants.BASE_URL}add-fcm-token`,
                    { token },
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
            }

            onMessage(messaging, (payload) => {
                onMessageCallback(payload);
            });

            return token; // Return the token after the request is complete
        } else {
            console.log('Notification permission denied.');
            return null;
        }
    } catch (error) {
        console.error('Error setting up notifications:', error);
        return null;
    }
};

export { messaging, setupNotifications, auth, db, firebaseConfig };
