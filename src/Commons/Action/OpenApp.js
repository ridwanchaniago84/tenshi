import { store } from '../../Redux/Store'
import SajjadLaunchApplication from 'react-native-launch-application';
import { DEEP_LINK } from '@env';

const openOtherApp = (appPackage) => {
  SajjadLaunchApplication.open(appPackage);
}

const titleCase = (str) => {
  let splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
}

const OpenApp = async (appName) => {
  appName = titleCase(appName);

  const appPackage = store.getState().mainState.listApp.find(object => object.appName === appName).packageName

  if (appPackage) {
    await Linking.openURL(DEEP_LINK);

    setTimeout(() => {
      openOtherApp(appPackage);
    }, 1000);
  }

  return;
}

export default OpenApp;
