import OpenApp from './Action/OpenApp';
import call, { callPercobaan } from './Action/Call';

export const action = (paramenter) => {
  switch (paramenter.action) {
    case 'call':
      call();
      // callPercobaan();
      break;
    case 'openApp':
      OpenApp(paramenter.parameter);
      break;
  }
}
