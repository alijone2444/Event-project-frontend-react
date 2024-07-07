// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyBZC4X_NNkjDv82ZtZWskZtFASGtMW0mCc",
    authDomain: "event-notifications-105e1.firebaseapp.com",
    projectId: "event-notifications-105e1",
    storageBucket: "event-notifications-105e1.appspot.com",
    messagingSenderId: "558605341302",
    appId: "1:558605341302:web:287791e72638d115db4557",
    measurementId: "G-099Q6Y8259"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
// Customize background notification handling here
messaging.onBackgroundMessage((payload) => {
    console.log('Background Message:', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});
