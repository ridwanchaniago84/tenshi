import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableHighlight,
    Button
} from 'react-native';
import Modal from "react-native-modal";
import Tts from 'react-native-tts';

import { changeVoiceCharacter } from '../../Redux/Action/Action';

const VoiceSpeech = React.memo((props) => {
    const [showModalVoice, setShowModalVoice] = useState(false);
    const [voiceList, setVoiceList] = useState([]);

    useEffect(() => {
        // setVoiceList([
        //     { id: 'com.apple.ttsbundle.Moira-compact', name: 'Moira', language: 'en-IE', quality: 300 },
        //     { id: 'com.apple.ttsbundle.Samantha-compact', name: 'Samantha', language: 'en-US' }
        // ]);
        Tts.voices().then(voices => setVoiceList(voices));
        Tts.setDefaultLanguage(props.voiceCharacter.language);
        Tts.setDefaultVoice(props.voiceCharacter.compact);
    }, []);

    const testVoince = () => {
        Tts.getInitStatus().then(() => {
            Tts.speak('Hello World!')
        }, (err) => {
            if (err.code === 'no_engine') {
                Tts.requestInstallEngine();
            }
        });
    }

    const changeVoice = (voice) => {
        props.dispatch(changeVoiceCharacter({
            name: voice.name,
            language: voice.language,
            compact: voice.id
        }));

        Tts.setDefaultLanguage(voice.language);
        Tts.setDefaultVoice(voice.id);

        setShowModalVoice(false);
    }

    const VoiceListComponent = voiceList.map((voice, index) => {
        return (
            <TouchableHighlight
                key={index}
                onPress={() => changeVoice(voice)}
            >
                <View style={{ flexDirection: 'row', backgroundColor: "#36393f" }}>
                    <Text style={{ color: '#e1e2e4', fontSize: 16, paddingLeft: 20, paddingTop: 15, paddingBottom: 15 }}>{voice.name} ({voice.language})</Text>
                </View>
            </TouchableHighlight>
        )
    });

    return (
        <>
            <SafeAreaView>
                <ScrollView>

                    <Text style={{ color: '#b9bbbe', fontWeight: "bold", fontSize: 15, padding: 15 }}>Voice Setting</Text>

                    <TouchableHighlight
                        onPress={() => setShowModalVoice(true)}
                    >
                        <View style={{ flexDirection: 'row', backgroundColor: "#36393f" }}>
                            <Text style={{ color: '#e1e2e4', fontSize: 16, paddingLeft: 15, paddingTop: 15, paddingBottom: 15 }}>Voice</Text>
                            <Text style={{ color: '#e1e2e4', fontSize: 16, paddingTop: 15, position: 'absolute', right: 0, paddingRight: 15 }}>{props.voiceCharacter.name}</Text>
                        </View>
                    </TouchableHighlight>

                    <View style={styles.container}>
                        <View style={{ margin: 15, marginTop: 0 }}>
                            <View style={styles.buttonContainer}>
                                <Button
                                    style={styles.button}
                                    title="Test Voice"
                                    color="#5865f2"
                                    onPress={testVoince}
                                />
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>

            <Modal
                isVisible={showModalVoice}
                onBackdropPress={() => setShowModalVoice(false)}
                onRequestClose={() => setShowModalVoice(false)}
            >
                <View style={{ backgroundColor: '#36393f' }}>
                    <Text style={{ padding: 15, color: '#ffffff', fontSize: 20, fontWeight: "bold", borderBottomWidth: 1, borderBottomColor: '#42454a', textAlign: 'center' }}>Language</Text>

                    <SafeAreaView>
                        <ScrollView>
                            {VoiceListComponent}
                        </ScrollView>
                    </SafeAreaView>

                </View>
            </Modal>
        </>
    );
});

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 20
    },
    button: {
        borderRadius: 3,
        color: '#fff',
        borderWidth: 1
    },
    container: {
        flex: 1,
        backgroundColor: '#36393f'
    }
});

const mapStateToProps = (state, props) => {
    return {
        voiceCharacter: state.mainState.voiceCh,
    };
}

export default connect(mapStateToProps)(VoiceSpeech);
