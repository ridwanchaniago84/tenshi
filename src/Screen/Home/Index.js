import React, { useEffect } from "react";
import {
    View
} from 'react-native';
import { style } from '../../Commons/Style';

import Header from '../../Components/Home/Header';
import Menu from '../../Components/Home/Menu';
// import messaging from '@react-native-firebase/messaging';

const Home = (props) => {
    // const checkToken = async () => {
    //     const fcmToken = await messaging().getToken();

    //     if (fcmToken) {
    //         console.log(fcmToken);
    //     }
    // }

    // useEffect(() => {
    //     checkToken();
    // }, []);

    return (
        <View style={style.body}>
            <Header />
            <Menu Navigation={props.navigation} />
        </View>
    );
}

export default Home;
