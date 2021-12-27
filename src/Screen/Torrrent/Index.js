import React from "react";
import {
    View
} from 'react-native';
import { style } from '../../Commons/Style';
import Header from '../../Commons/Header';
import MagnetInput from '../../Components/Torrent/MagnetInput';

const Torrent = () => {
    return (
        <View style={style.body}>
            <Header />
            <MagnetInput />
        </View >
    );
}

export default Torrent;
