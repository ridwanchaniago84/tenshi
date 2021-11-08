import React from "react";
import {
    View,
    StyleSheet,
    Button
} from 'react-native';
import Tts from 'react-native-tts'

Tts.setDefaultLanguage('ja-JP');

const Developer = () => {

    const testVoince = () => {
        Tts.getInitStatus().then(() => {
            Tts.speak('Hello World!')
        }, (err) => {
            if (err.code === 'no_engine') {
                Tts.requestInstallEngine();
            }
        });
    }

    return (
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
    );
}

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

export default Developer;
