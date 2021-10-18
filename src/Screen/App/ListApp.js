import React, { useState } from "react";
import { connect } from 'react-redux';
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Image,
    ActivityIndicator
} from 'react-native';
// import IntentLauncher, { IntentConstant } from 'react-native-intent-launcher'
import RNInstalledApplication from 'react-native-installed-application';

import { refreshApp } from '../../Redux/Action/Action';

// const openOtherApp = () => {
//     // IntentLauncher.startAppByPackageName('io.stellio.player')
//     //     .then((result) => {
//     //         console.log('startAppByPackageName started');
//     //     })
//     //     .catch((error) => console.warn('startAppByPackageName: could not open', error)); // Open App
// }

const ListApp = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    // const contoh2 = [
    //     {
    //         appName: 'hesoyam',
    //         appPackage: 'com.hesoyam'
    //     },
    //     {
    //         appName: 'akjjyglc',
    //         appPackage: 'com.akjjyglc'
    //     }
    // ];

    // console.log(contoh2.find(object => object.appName === 'akjjyglc').appPackage);

    const refreshAppsList = () => {
        setIsLoading(true);

        RNInstalledApplication.getApps()
            .then(apps => props.dispatch(refreshApp(apps)))
            .then(() => setIsLoading(false))
            .catch(error => console.log(error));
    }

    const Loader = () => {
        return (
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
                <ActivityIndicator size="large" color="#5865f2" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>

            {/* Spinner */}
            {isLoading && <Loader />}

            <View style={styles.containerButton}>
                <View style={{ alignSelf: 'center' }}>
                    <TouchableWithoutFeedback onPress={refreshAppsList}>
                        <View>
                            <Image style={{ width: 55, height: 55 }} source={require('../../Assets/Icons/refresh.png')} />
                            <Text style={{ color: '#FFF', marginTop: 10, textAlign: 'center' }}>Refresh</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <ScrollView>
                {
                    props.listApp.map((appName, index) => {
                        return (
                            <TouchableHighlight onPress={() => { return }} key={index}>
                                <View style={{ flexDirection: 'row', backgroundColor: "#36393f" }}>
                                    <Image style={{ width: 35, height: 35, transform: [{ translateX: 8 }, { translateY: 8 }] }} source={{ uri: `data:image/png;base64,${appName.icon}` }} />
                                    <Text style={{ color: '#e1e2e4', fontSize: 16, paddingLeft: 15, paddingTop: 15, paddingBottom: 15 }}>{appName.appName}</Text>
                                </View>
                            </TouchableHighlight>
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#36393f'
    },
    containerButton: {
        width: '100%',
        paddingBottom: 20,
        marginTop: 25,
        borderBottomWidth: 1,
        marginBottom: 15,
        borderColor: '#42454a'
    }
});

const mapStateToProps = (state, props) => {
    return {
        listApp: state.mainState.listApp,
    };
}

export default connect(mapStateToProps)(ListApp);
