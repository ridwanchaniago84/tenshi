/**
 * @format
 */

import React from "react";
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import { setSchduleNotification } from './src/Notification/Notification';

messaging().subscribeToTopic('schdule');

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    setSchduleNotification(remoteMessage.data.event, remoteMessage.data.date);
});

messaging().onMessage(async (remoteMessage) => {
    setSchduleNotification(remoteMessage.data.event, remoteMessage.data.date);
});

PushNotification.configure({
    largeIcon: "ic_launcher",
    smallIcon: "ic_notification",
    requestPermissions: Platform.OS === 'ios'
});

function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
        return null;
    }

    return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
