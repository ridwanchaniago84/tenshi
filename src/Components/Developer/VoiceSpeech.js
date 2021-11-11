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

const VoiceSpeech = React.memo((props) => {
    const [showModalVoice, setShowModalVoice] = useState(false);
    const [voiceList, setVoiceList] = useState(['tes1', 'tes2']);

    // useEffect(() => {
    //     return setVoiceList(['tes1', 'tes2']);
    // }, []);

    const testVoince = () => {
        Tts.getInitStatus().then(() => {
            Tts.speak('Hello World!')
        }, (err) => {
            if (err.code === 'no_engine') {
                Tts.requestInstallEngine();
            }
        });
    }

    const VoiceListComponent = voiceList.map((voice, index) => {
        return (
            <TouchableHighlight key={index}>
                <View style={{ flexDirection: 'row', backgroundColor: "#36393f" }}>
                    <Text style={{ color: '#e1e2e4', fontSize: 16, paddingLeft: 40, paddingTop: 15, paddingBottom: 15 }}>{voice}</Text>
                </View>
            </TouchableHighlight>
        )
    })

    return (
        <>
            <SafeAreaView>
                <ScrollView>

                    <Text style={{ color: '#b9bbbe', fontWeight: "bold", fontSize: 15, padding: 15 }}>Voice Setting</Text>

                    <TouchableHighlight
                        onPress={() => setShowModalVoice(true)}
                    >
                        <View style={{ flexDirection: 'row', backgroundColor: "#36393f" }}>
                            <Text style={{ color: '#e1e2e4', fontSize: 16, paddingLeft: 15, paddingTop: 15, paddingBottom: 15 }}>Language</Text>
                        </View>
                    </TouchableHighlight>

                    <View style={styles.container}>
                        <View style={{ margin: 15 }}>
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
        listApp: state.mainState.listApp,
    };
}

export default connect(mapStateToProps)(VoiceSpeech);
