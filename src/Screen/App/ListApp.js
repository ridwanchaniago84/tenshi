import React from "react";
import {
    View,
} from 'react-native';

import { style } from '../../Commons/Style';
import Header from '../../Commons/Header';
import App from '../../Components/ListApp/App'


const ListApp = () => {
    return (
        <View style={style.body}>
            <Header />
            <App />
        </View>
    );
}



export default ListApp;
