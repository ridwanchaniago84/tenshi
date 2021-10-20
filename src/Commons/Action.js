import OpenApp from './Action/OpenApp';

export const action = (paramenter) => {
  switch (paramenter.action) {
    case 'openApp':
      OpenApp(paramenter.parameter);
      break;
  }
}
