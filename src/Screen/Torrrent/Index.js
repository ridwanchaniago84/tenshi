import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Button,
    Linking,
    ToastAndroid,
    TouchableWithoutFeedback
} from 'react-native';

const Torrent = () => {
    const [borderColor, setBorderColor] = useState('#0000004d');
    const [magnet, setMagnet] = useState('');

    const sendMagnet = () => {
        fetch('https://ztorrentdowloader.herokuapp.com/add-magnet', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                magnet: magnet
            })
        })
        .then(() => ToastAndroid.show("Magnet Sended", ToastAndroid.SHORT))
    }

    return (
        <View style={styles.container}>
            <View style={{ margin: 15 }}>
                <Text style={styles.label}>MAGNET</Text>
                <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: borderColor,
                        backgroundColor: '#313339',
                        color: '#dcddde',
                        fontSize: 16,
                        padding: 10
                    }}
                    onFocus={() => setBorderColor('#00aff4')}
                    onBlur={() => setBorderColor('#0000004d')}
                    value={magnet}
                    onChangeText={setMagnet}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        style={styles.button}
                        title="Download"
                        color="#5865f2"
                        onPress={sendMagnet}
                    />
                </View>

                <View style={{ marginTop: 15 }}>
                    <TouchableWithoutFeedback onPress={() => { Linking.openURL('https://ztorrentdowloader.herokuapp.com/file/') }}>
                        <Text style={{ color: '#1484b2', fontSize: 15 }}>View File</Text>
                    </TouchableWithoutFeedback>
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
    },
    label: {
        fontSize: 14,
        color: '#dcddde',
        fontWeight: "bold",
        marginBottom: 10
    }
});

export default Torrent;
