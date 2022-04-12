import React, { useEffect } from "react";
import { connect } from 'react-redux';
import {
    View,
    SafeAreaView,
    ScrollView,
    TouchableHighlight,
    Switch
} from 'react-native';
import { faDotCircle, faMagnet, faThLarge, faCode } from '@fortawesome/free-solid-svg-icons';
import Voice from '@react-native-voice/voice';
import PushNotification from 'react-native-push-notification';
import BackgroundService from 'react-native-background-actions';

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
        onAction: function (notification) {
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

    const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

    const options = {
        taskName: 'Background Action',
        taskTitle: 'Tenshi',
        taskDesc: 'Services Active',
        taskIcon: {
            name: 'ic_notification',
            type: 'mipmap',
        },
        linkingURI: 'https://discord.com/api/oauth2/authorize?client_id=559213233404379156&permissions=8&scope=bot', // See Deep Linking for more info
        parameters: {
            delay: 1000,
        },
    };

    const veryIntensiveTask = async (taskDataArguments) => {
        startRecord();

        const { delay } = taskDataArguments;
        await new Promise(async (resolve) => {
            for (let i = 0; BackgroundService.isRunning(); i++) {
                console.log(i);
                await sleep(delay);
            }
        });
    };

    const statusChanged = (status, notifStillActive = false) => {
        props.dispatch(changeStatus(status));
        checkStatus = status;

        if (status) {
            BackgroundService.start(veryIntensiveTask, options);
            statusNotification();
            return;
        }

        BackgroundService.stop();
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

export default connect(mapStateToProps)(Menu);
