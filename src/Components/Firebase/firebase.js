// firebase.js
import { initializeApp } from '@firebase/app';
import { getMessaging, getToken, onMessage } from '@firebase/messaging';
import constants from '../../Constants/constants';
import createAuthenticatedRequest from '../../RequestwithHeader';

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
const requestInstance = createAuthenticatedRequest();

const setupNotifications = async (onMessageCallback) => {
    try {
        // Request permission for notifications
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
            console.log('Notification permission granted.');
            // Get the FCM token
            const token = await getToken(messaging);
            console.log('FCM Token:', token);

            // Send token to the backend
            requestInstance.post(`${constants.BASE_URL}add-fcm-token`, { token })
                .then(response => {
                    console.log('FCM Token sent to the backend:', response.data);
                })
                .catch(error => {
                    console.error('Error sending FCM Token to the backend:', error);
                });

        } else {
            console.log('Notification permission denied.');
        }

        // Handle foreground notifications
        onMessage(messaging, (payload) => {
            console.log('Foreground Message:', payload);
            // Handle the notification or update your UI
            onMessageCallback(payload);
        });
    } catch (error) {
        console.error('Error setting up notifications:', error);
    }
};

export { messaging, setupNotifications };
