import { store } from '../../Redux/Store'
import IncomingCall from 'react-native-incoming-call';
import { BOT_ID } from "@env";
import RNCallKeep from 'react-native-callkeep';
import { Linking } from "react-native";
import { DEEP_LINK } from '@env';

const call = async () => {
    const avatar = store.getState().mainState.avatar;
    await Linking.openURL(DEEP_LINK);

    setTimeout(() => {
        IncomingCall.display(
            'TenshiUUIDv1',
            'Tenshi',
            `https://cdn.discordapp.com/avatars/${BOT_ID}/${avatar}.webp`,
            'Di sini! Di sini!',
            20000
        );
    }, 1000);
}

const callPercobaan = () => {
    const options = {
        ios: {
            appName: 'My app name',
        },
        android: {
            alertTitle: 'Permissions required',
            alertDescription: 'This application needs to access your phone accounts',
            cancelButton: 'Cancel',
            okButton: 'ok',
            imageName: 'phone_account_icon'
        }
    };

    RNCallKeep.setup(options).then(accepted => {
        let localizedCallerName = 'Tenshi';
        let handleType = 'generic';
        let hasVideo = false;
        RNCallKeep.displayIncomingCall('TenshiUUIDv1', 'Tenshi', localizedCallerName, handleType, hasVideo, options);
    });
}

export default call;
export { callPercobaan };
