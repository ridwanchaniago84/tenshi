import React from "react";
import {
    View
} from 'react-native';

import VoiceSpeech from '../../Components/Developer/VoiceSpeech';
import { style } from '../../Commons/Style';
import Header from '../../Commons/Header';

const Developer = () => {
    return (
        <View style={style.body}>
            <Header />
            <VoiceSpeech />
        </View>
    );
}

export default Developer;
