import React, { useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    SafeAreaView,
    ScrollView,
    TouchableHighlight,
    AppRegistry
} from 'react-native';
import { connect } from 'react-redux';
import Voice from '@react-native-voice/voice';
import Modal from "react-native-modal";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDotCircle, faMagnet, faThLarge, faCode } from '@fortawesome/free-solid-svg-icons'
import { style } from '../../Commons/Style';

import Header from '../../Components/Home/Header';

import { responseAI, cancelNotif, statusNotification } from '../../Notification/Notification';
import { changeVoice, changeStatus, changeStatusModal } from '../../Redux/Action/Action';

let checkStatus = false;

const startRecord = async () => {
    try {
        await Voice.start('id-ID');
    } catch (e) {
        console.error(e); 0
    }
}

const Home = (props) => {
    const AIName = [
        'tenshi', 'Tenshi', 'tensi', 'Tensi', 'pensi', 'Pensi', 'fancy', 'Fancy', 'mc', 'MC'
    ];

    const statusChanged = (status) => {
        props.dispatch(changeStatus(status));
        props.dispatch(changeStatusModal(false));
        checkStatus = status;

        if (status) {
            startRecord();
            statusNotification();
            return;
        }

        Voice.destroy()
        cancelNotif();
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
                    responseAI(e.value[0]);
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
        <View style={style.body}>
            <Header />
            {/* <Image
                style={{ width: '100%' }}
                source={require('../../Assets/106874dd3c2c1644490e257c7447a25a.png')}
            />
            <View style={{ position: 'relative', zIndex: 1 }}>
                <Image
                    style={{ width: 100, height: 100, borderRadius: 100 / 2, position: 'absolute', transform: [{ translateY: -50 }, { translateX: 15 }] }}
                    // source={require('../../Assets/723ed5ec3a7938481878344b4389dd7a.png')}
                    source={{uri: 'https://cdn.discordapp.com/avatars/559213233404379156/f9f5fe54a533a10712aa3ec54777093c.webp'}}
                />
                <View style={{ width: 30, height: 30, borderRadius: 30 / 2, borderWidth: 3, borderColor: '#2f3136', position: 'absolute', backgroundColor: props.statusAI ? '#3ba55d' : '#b9bbbe', transform: [{ translateX: 83 }, { translateY: 23 }] }} />
            </View>
            <View style={{ backgroundColor: '#2f3136', flexDirection: 'row' }}>
                <View style={{ flex: 0.5 }}>
                    <Text style={{ paddingTop: 60, paddingLeft: 35, paddingBottom: 15, color: '#ffffff', fontSize: 20, fontWeight: "bold" }}>Tenshi</Text>
                </View>
                <View style={{ flex: 0.5 }}>
                    <Text style={{ paddingTop: 60, paddingRight: 15, color: '#b9bbbe', textAlign: 'right' }}>Input: {props.voiceText}</Text>
                </View>
            </View>
            <SafeAreaView>
                <ScrollView>
                    <Text style={{ color: '#b9bbbe', fontSize: 18, padding: 15 }}>AI SETTING</Text>

                    <TouchableHighlight onPress={() => props.dispatch(changeStatusModal(true))}>
                        <View style={{ flexDirection: 'row', backgroundColor: "#36393f" }}>
                            <FontAwesomeIcon style={{ color: '#b9bbbe', paddingLeft: 50, transform: [{ translateY: 15 }] }} size={20} icon={faDotCircle} />
                            <Text style={{ color: '#e1e2e4', fontSize: 16, paddingLeft: 15, paddingTop: 15, paddingBottom: 15 }}>Set Status</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() =>
                        props.propsNavigation.navigate('torrentDownload')
                    }>
                        <View style={{ flexDirection: 'row', backgroundColor: "#36393f" }}>
                            <FontAwesomeIcon style={{ color: '#b9bbbe', paddingLeft: 50, transform: [{ translateY: 15 }] }} size={20} icon={faMagnet} />
                            <Text style={{ color: '#e1e2e4', fontSize: 16, paddingLeft: 15, paddingTop: 15, paddingBottom: 15 }}>Torrent Download</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() =>
                        props.propsNavigation.navigate('listApp')
                    }>
                        <View style={{ flexDirection: 'row', backgroundColor: "#36393f" }}>
                            <FontAwesomeIcon style={{ color: '#b9bbbe', paddingLeft: 50, transform: [{ translateY: 15 }] }} size={20} icon={faThLarge} />
                            <Text style={{ color: '#e1e2e4', fontSize: 16, paddingLeft: 15, paddingTop: 15, paddingBottom: 15 }}>Openable Application</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() =>
                        props.propsNavigation.navigate('developer')
                    }>
                        <View style={{ flexDirection: 'row', backgroundColor: "#36393f" }}>
                            <FontAwesomeIcon style={{ color: '#b9bbbe', paddingLeft: 50, transform: [{ translateY: 15 }] }} size={20} icon={faCode} />
                            <Text style={{ color: '#e1e2e4', fontSize: 16, paddingLeft: 15, paddingTop: 15, paddingBottom: 15 }}>Developer Menu</Text>
                        </View>
                    </TouchableHighlight>
                </ScrollView>
            </SafeAreaView>
            <Modal
                isVisible={props.statusModal}
                onBackdropPress={() => props.dispatch(changeStatusModal(false))}
                style={{ justifyContent: 'flex-end', margin: 0 }}>
                <View style={{ backgroundColor: '#36393f' }}>
                    <Text style={{ padding: 15, color: '#ffffff', fontSize: 20, fontWeight: "bold", borderBottomWidth: 1, borderBottomColor: '#42454a' }}>Set Status</Text>
                    <TouchableHighlight onPress={() => statusChanged(true)}>
                        <View style={{ flexDirection: 'row', backgroundColor: "#36393f" }}>
                            <View style={{ width: 20, height: 20, borderRadius: 30 / 2, backgroundColor: '#3ba55d', transform: [{ translateY: 15 }, { translateX: 15 }] }} />
                            <Text style={{ color: '#e1e2e4', fontSize: 16, paddingLeft: 40, paddingTop: 15, paddingBottom: 15 }}>Active</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => statusChanged(false)}>
                        <View style={{ flexDirection: 'row', backgroundColor: "#36393f" }}>
                            <FontAwesomeIcon style={{ color: '#b9bbbe', transform: [{ translateY: 15 }, { translateX: 15 }] }} size={20} icon={faDotCircle} />
                            <Text style={{ color: '#e1e2e4', fontSize: 16, paddingLeft: 40, paddingTop: 15, paddingBottom: 15 }}>Deactive</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </Modal> */}
        </View>
    );
}

const mapStateToProps = (state, props) => {
    return {
        voiceText: state.mainState.voiceText,
        statusAI: state.mainState.statusAI,
        statusModal: state.mainState.statusModal,
        propsNavigation: props.navigation
    };
}

// AppRegistry.registerHeadlessTask('SomeTaskName', () => {
//     if (checkStatus) startRecord();
// });

export default connect(mapStateToProps)(Home);
