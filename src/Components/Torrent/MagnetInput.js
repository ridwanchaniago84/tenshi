import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Linking,
    ToastAndroid,
    TouchableWithoutFeedback,
    Pressable
} from 'react-native';
import { style, defaultFont } from '../../Commons/Style'

const MagnetInput = React.memo(() => {
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
        <>
            <View style={[style.container, { marginLeft: 25, marginRight: 25 }]}>
                <Text style={[style.whiteText, { fontFamily: defaultFont.bold, fontSize: 30 }]}>Torrent</Text>
                <Text style={[style.TransparentTextColor, { fontFamily: defaultFont.normal, marginLeft: 25, marginTop: 5 }]}>Please magnet torrent input below with prefix magnet:?xt</Text>
                <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: borderColor,
                        backgroundColor: '#1a1b20',
                        color: '#dcddde',
                        fontSize: 16,
                        padding: 15,
                        marginTop: 15,
                        borderRadius: 10,
                    }}
                    onFocus={() => setBorderColor('#00aff4')}
                    onBlur={() => setBorderColor('#0000004d')}
                    placeholder='Magnet'
                    placeholderTextColor="#8f8f97"
                    value={magnet}
                    onChangeText={setMagnet}
                />
                <Text style={{
                    color: '#e83f35',
                    fontFamily: defaultFont.normal,
                    marginLeft: 25,
                    marginTop: 10
                }}>
                    IMPORTANT:
                    <Text style={style.TransparentTextColor}> Make sure you remember the file is temporary. For view file you can visit
                        <TouchableWithoutFeedback onPress={() => { Linking.openURL('https://ztorrentdowloader.herokuapp.com/file/') }}>
                            <Text style={{ color: '#1484b2' }}> here</Text>
                        </TouchableWithoutFeedback>
                        .
                    </Text>
                </Text>

            </View>
            <View style={{
                flexDirection: 'column',
                flex: 1,
                marginLeft: 50,
                marginRight: 50,
            }}>
                <View style={{
                    position: 'absolute',
                    bottom: 25,
                    width: '100%'
                }}>
                    <Pressable
                        style={style.button}
                        onPress={sendMagnet}
                    >
                        <Text style={{ fontFamily: defaultFont.normal, fontSize: 17, color: '#deeeff' }}>Download</Text>
                    </Pressable>
                </View>
            </View>
        </>
    );
})

export default MagnetInput;
