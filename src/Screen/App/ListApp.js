import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableHighlight
} from 'react-native';
// import IntentLauncher, { IntentConstant } from 'react-native-intent-launcher'
// import RNInstalledApplication from 'react-native-installed-application';

// const openOtherApp = () => {
//     // RNInstalledApplication.getApps()
//     //     .then(apps => {
//     //         let obj = apps.find(o => o.appName === 'example Wallpapers');
//     //         if (!obj) return console.log('success');
//     //         console.log(obj)
//     //     })
//     //     .catch(error => {
//     //         console.log(error);
//     //     }); // Listing App
//     // IntentLauncher.startAppByPackageName('io.stellio.player')
//     //     .then((result) => {
//     //         console.log('startAppByPackageName started');
//     //     })
//     //     .catch((error) => console.warn('startAppByPackageName: could not open', error)); // Open App
// }

const ListApp = () => {

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <TouchableHighlight onPress={() => { return }}>
                    <View style={{ flexDirection: 'row', backgroundColor: "#36393f" }}>
                        <Text style={{ color: '#e1e2e4', fontSize: 16, paddingLeft: 15, paddingTop: 15, paddingBottom: 15 }}>Set Status</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight onPress={() => { return }}>
                    <View style={{ flexDirection: 'row', backgroundColor: "#36393f" }}>
                        <Text style={{ color: '#e1e2e4', fontSize: 16, paddingLeft: 15, paddingTop: 15, paddingBottom: 15 }}>Set Status</Text>
                    </View>
                </TouchableHighlight>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#36393f'
    }
});

export default ListApp;
