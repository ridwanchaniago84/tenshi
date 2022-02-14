import PushNotification, { Importance } from 'react-native-push-notification';
import { AUTHORIZATION } from "@env";
import { action } from '../Commons/Action';

PushNotification.createChannel(
  {
    channelId: "1",
    channelName: "Default",
    channelDescription: "Default Notification Channel",
    playSound: false,
    soundName: "default",
    importance: Importance.HIGH,
    vibrate: true,
  },
);

PushNotification.configure({
  largeIcon: "ic_launcher",
  smallIcon: "ic_notification",
  requestPermissions: Platform.OS === 'ios'
});

const defaultNotif = (message) => {
  PushNotification.localNotification({
    channelId: "1",
    title: 'Tenshi',
    message: message,
    vibration: 300
  });
}

const responseAI = (message, AIName) => {
  const callingAI = AIName.find(name =>
    name === message
  );

  if (callingAI) return defaultNotif('Iya? Kenapa?');

  fetch(`https://tenshihinanai.000webhostapp.com/api/tenshi`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': AUTHORIZATION
    },
    body: JSON.stringify({
      message: message,
      platform: 'android'
    })
  })
    .then(response => response.json())
    .then(response => {
      if (response.execution.status)
        action(response.execution);

      return response;
    })
    .then(response => {
      defaultNotif(response.result);
    })
    .catch(err => {
      console.error(err);
    });
}

const statusNotification = () => {
  PushNotification.localNotification({
    channelId: "1",
    title: 'Tenshi',
    actions: ["Restart", "Deactive", "ReplyInput"],
    message: 'AI Active',
    // ongoing: true,
    reply_placeholder_text: "Send text to Tenshi ...",
    reply_button_text: "Send Message",
    invokeApp: false
  });
}

const cancelNotif = () => PushNotification.cancelAllLocalNotifications()

export { responseAI, cancelNotif, statusNotification };
