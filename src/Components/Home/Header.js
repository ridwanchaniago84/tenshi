import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import {
    View,
    Text,
    Image
} from 'react-native';
import { BOT_ID, BOT_TOKEN } from "@env"

import { style, defaultFont } from '../../Commons/Style';

const Header = (props) => {
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
                <View style={{ width: 40, height: 40, borderRadius: 40 / 2, borderWidth: 3, borderColor: '#2f3136', backgroundColor: `${props.statusAI ? '#3eb0c9' : '#747f8d'}`, transform: [{ translateX: 45 }, { translateY: -35 }] }} />
                <Text style={[style.mainTextColor, { fontFamily: defaultFont.normal, fontSize: 22 }]}>Catatan</Text>
                <Text style={[style.TransparentTextColor, { fontFamily: defaultFont.normal, fontSize: 17, marginTop: 10 }]}>{props.voiceText}</Text>
            </View>
        </View>
    );
}

const mapStateToProps = (state) => {
    return {
        statusAI: state.mainState.statusAI,
        voiceText: state.mainState.voiceText
    };
}

export default connect(mapStateToProps)(Header);
