import OpenApp from './Action/OpenApp';
import call from './Action/Call';

export const action = (paramenter) => {
  switch (paramenter.action) {
    case 'call':
      call();
      break
    case 'openApp':
      OpenApp(paramenter.parameter);
      break;
  }
}
