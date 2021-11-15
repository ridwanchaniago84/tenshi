import { store } from '../../Redux/Store'
import IntentLauncher, { IntentConstant } from 'react-native-intent-launcher'
import SajjadLaunchApplication from 'react-native-launch-application';

const openOtherApp = (appPackage) => {
  IntentLauncher.startAppByPackageName(appPackage)
    .catch((error) => console.warn('startAppByPackageName: could not open', error));

  SajjadLaunchApplication.open(appPackage);
}

const titleCase = (str) => {
  let splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
}

const OpenApp = (appName) => {
  appName = titleCase(appName);

  const appPackage = store.getState().mainState.listApp.find(object => object.appName === appName).packageName

  if (appPackage) {
    openOtherApp(appPackage);
  }

  return;
}

export default OpenApp;
