import React, { useEffect } from "react";
import { connect } from 'react-redux';
import {
    View,
    SafeAreaView,
    ScrollView,
    TouchableHighlight,
    Switch,
    AppRegistry
} from 'react-native';
import { faDotCircle, faMagnet, faThLarge, faCode } from '@fortawesome/free-solid-svg-icons';
import Voice from '@react-native-voice/voice';
import PushNotification, { Importance } from 'react-native-push-notification';

import TextMenu from './Menu/TextMenu';
import { responseAI, cancelNotif, statusNotification } from '../../Notification/Notification';
import { changeVoice, changeStatus } from '../../Redux/Action/Action';

let checkStatus = false;

const startRecord = async () => {
    try {
        await Voice.start('id-ID');
    } catch (e) {
        console.error(e); 0
    }
}

const Menu = React.memo((props) => {
    const AIName = [
        'tenshi', 'Tenshi', 'tensi', 'Tensi', 'pensi', 'Pensi', 'fancy', 'Fancy', 'mc', 'MC'
    ];

    const sendMessage = (text) => {
        responseAI(text, AIName);
    }

    PushNotification.configure({
        requestPermissions: Platform.OS === 'ios',
        onNotification(notification) {
            if (notification.action === "Restart") {
                statusChanged(true);
                return;
            }

            if (notification.action === "Deactive") {
                statusChanged(false, true);
                return;
            }

            if (notification.action === "ReplyInput") {
                const text = notification.reply_text;

                sendMessage(`Tenshi ${text}`);
                return;
            }
        }
    });

    const statusChanged = (status, notifStillActive = false) => {
        props.dispatch(changeStatus(status));
        checkStatus = status;
        
        if (status) {
            startRecord();
            statusNotification();
            return;
        }

        Voice.destroy()

        if (!notifStillActive) {
            cancelNotif();
            return;
        }

        statusNotification();
        return;
    }

    useEffect(() => {
        function onSpeechResults(e) {
            const splitTextVoice = e.value[0].split(' ');
            let founded = false;
            splitTextVoice.map((message) => {
                let callingAI = AIName.find(name =>
                    name === message
                );

                if (callingAI && !founded) {
                    founded = true;
                    responseAI(e.value[0], AIName);
                }
            });

            props.dispatch(changeVoice(e.value[0]));
            startRecord();
        };

        function onSpeechError() {
            startRecord();
        }

        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechError = onSpeechError;
    }, []);

    return (
        <SafeAreaView style={{ marginLeft: 25, marginRight: 45, marginTop: 40 }}>
            <ScrollView>

                <TouchableHighlight
                    onPress={() => statusChanged(props.statusAI ? false : true)}
                    style={{ marginBottom: 10 }}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <TextMenu Text="Active AI" Icon={faDotCircle} />
                        <Switch
                            style={{ marginLeft: 'auto' }}
                            trackColor={'#2c374c'}
                            thumbColor={props.statusAI ? "#3eb0c9" : "#a6a6ae"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => statusChanged(props.statusAI ? false : true)}
                            value={props.statusAI}
                        />
                    </View>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() =>
                        props.navigation.navigate('torrentDownload')
                    }
                    style={{ marginBottom: 10 }}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <TextMenu Text="Torrent Download" Icon={faMagnet} />
                    </View>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() =>
                        props.navigation.navigate('listApp')
                    }
                    style={{ marginBottom: 10 }}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <TextMenu Text="Openable Application" Icon={faThLarge} />
                    </View>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() =>
                        props.navigation.navigate('developer')
                    }
                    style={{ marginBottom: 10 }}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <TextMenu Text="Developer Menu" Icon={faCode} />
                    </View>
                </TouchableHighlight>
            </ScrollView>
        </SafeAreaView >
    );
})

const mapStateToProps = (state, props) => {
    return {
        statusAI: state.mainState.statusAI,
        navigation: props.Navigation
    };
}

AppRegistry.registerHeadlessTask('SomeTaskName', () => {
    if (checkStatus) startRecord();
});

export default connect(mapStateToProps)(Menu);
