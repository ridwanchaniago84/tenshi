import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image
} from 'react-native';
import { BOT_ID, BOT_TOKEN } from "@env"

import { style, defaultFont } from '../../Commons/Style';

const Header = () => {
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        fetch(`https://discord.com/api/v9/users/${BOT_ID}`, {
            headers: {
                'Authorization': `Bot ${BOT_TOKEN}`,
            },
        })
        .then(response => response.json())
        .then(responseJson => setAvatar(responseJson.avatar))
    }, []);

    return (
        <View style={style.container}>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center', textAlign: 'center'
            }}>
                <Text style={[style.whiteText, { fontFamily: defaultFont.bold, fontSize: 22 }]}>Tenshi</Text>
                <Image
                    style={{ width: 125, height: 125, borderRadius: 125 / 2, marginTop: 25 }}
                    source={{ uri: `https://cdn.discordapp.com/avatars/${BOT_ID}/${avatar}.webp` }}
                />
                <View style={{ width: 40, height: 40, borderRadius: 40 / 2, borderWidth: 3, borderColor: '#2f3136', backgroundColor: '#3eb0c9', transform: [{ translateX: 45 }, { translateY: -35 }] }} />
                <Text style={[style.mainTextColor, { fontFamily: defaultFont.normal, fontSize: 22 }]}>Catatan</Text>
                <Text style={[style.TransparentTextColor, { fontFamily: defaultFont.normal, fontSize: 17, marginTop: 10 }]}>Voice Input</Text>
                {/* <View style={{ width: 30, height: 30, borderRadius: 30 / 2, borderWidth: 3, borderColor: '#2f3136', position: 'absolute', backgroundColor: props.statusAI ? '#3ba55d' : '#b9bbbe', transform: [{ translateX: 83 }, { translateY: 23 }] }} /> */}
            </View>
        </View>
    );
}

export default Header;
