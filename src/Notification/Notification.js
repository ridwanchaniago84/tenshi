import PushNotification, { Importance } from 'react-native-push-notification'

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

const notif = (message) => {
  fetch('https://tenshihinanai.000webhostapp.com/api/c3240bced4d9afdcdcb375fbdde8f3ad/tenshi', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: message
    })
  })
    .then(response => response.json())
    .then(response => {
      PushNotification.localNotification({
        channelId: "1",
        title: 'Tenshi',
        message: response.result,
        vibration: 300
      });
    })
    .catch(err => {
      console.error(err);
    });
}

const statusNotification = () => {
  PushNotification.localNotification({
    channelId: "1",
    title: 'Tenshi',
    message: 'AI Active',
    ongoing: true
  })
}

const cancelNotif = () => PushNotification.cancelAllLocalNotifications()

export { notif, cancelNotif, statusNotification };
