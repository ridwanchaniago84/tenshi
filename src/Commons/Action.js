import OpenApp from './Action/OpenApp';
import call, { callPercobaan } from './Action/Call';
import { setSchduleNotification } from '../Notification/Notification';

export const action = (paramenter) => {
  switch (paramenter.action) {
    case 'call':
      // call();
      callPercobaan();
      break;
    case 'openApp':
      OpenApp(paramenter.parameter);
      break;
    case 'saveSchdule':
      setSchduleNotification(paramenter.parameter.message, paramenter.parameter.date);
      break;
  }
}
