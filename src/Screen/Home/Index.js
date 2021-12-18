import React from "react";
import {
    View,
} from 'react-native';
import { style } from '../../Commons/Style';

import Header from '../../Components/Home/Header';
import Menu from '../../Components/Home/Menu';

const Home = (props) => {
    return (
        <View style={style.body}>
            <Header />
            <Menu Navigation={props.navigation} />
        </View>
    );
}

export default Home;
