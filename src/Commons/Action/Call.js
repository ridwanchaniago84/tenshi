import { store } from '../../Redux/Store'
import IncomingCall from 'react-native-incoming-call';
import { BOT_ID } from "@env";

const call = () => {
    const avatar = store.getState().mainState.avatar;

    IncomingCall.display(
        'TenshiUUIDv1',
        'Tenshi',
        `https://cdn.discordapp.com/avatars/${BOT_ID}/${avatar}.webp`,
        'Di sini! Di sini!',
        20000
    );
} 

export default call;
