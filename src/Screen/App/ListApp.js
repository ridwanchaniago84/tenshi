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
    ActivityIndicator,
    Pressable
} from 'react-native';
import RNInstalledApplication from 'react-native-installed-application';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { refreshApp } from '../../Redux/Action/Action';
import { style, defaultFont } from '../../Commons/Style';
import Header from '../../Commons/Header';


const ListApp = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const refreshAppsList = () => {
        setIsLoading(true);

        RNInstalledApplication.getNonSystemApps()
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
        <View style={style.body}>
            <Header />
            <View
                style={{
                    margin: 15
                }}
            >
                <View
                    style={{
                        backgroundColor: '#4883f7',
                        borderRadius: 40 / 5,
                        padding: 15
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            // justifyContent: 'space-between'
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                            }}
                        >
                            <View>
                                <Text style={{
                                    fontFamily: defaultFont.bold,
                                    color: '#f0f3fc',
                                    fontSize: 18
                                }}>Facebook</Text>
                                <Text style={{
                                    marginTop: 10,
                                    fontFamily: defaultFont.normal,
                                    color: '#f0f3fc',
                                    fontSize: 15
                                }}>com.facebook.android</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                marginRight: 15
                            }}
                        >
                            <Image style={{ width: 35, height: 35, transform: [{ translateX: 8 }, { translateY: 8 }] }} source={{ uri: `https://www.iconsdb.com/icons/preview/white/facebook-3-xxl.png` }} />
                        </View>
                    </View>
                    <View
                        style={{
                            marginTop: 15,
                            borderBottomColor: '#f0f3fc',
                            borderBottomWidth: 0.94,
                        }}
                    />
                    <Pressable
                        style={{
                            marginTop: 15,
                            flexDirection: 'row'
                        }}
                        onPress={() => { }}
                    >
                        <FontAwesomeIcon
                            size={24}
                            icon={faCog}
                            style={{
                                color: '#f0f3fc'
                            }}
                        />
                        <Text style={{
                            fontFamily: defaultFont.bold,
                            fontSize: 17,
                            color: '#f0f3fc',
                            transform: [
                                { translateX: 15 },
                                { translateY: 2 }
                            ]
                        }}>Setting</Text>
                    </Pressable>
                </View>
            </View>
        </View>
        // <SafeAreaView style={styles.container}>

        //     {/* Spinner */}
        //     {isLoading && <Loader />}

        //     <View style={styles.containerButton}>
        //         <View style={{ alignSelf: 'center' }}>
        //             <TouchableWithoutFeedback onPress={refreshAppsList}>
        //                 <View>
        //                     <Image style={{ width: 55, height: 55 }} source={require('../../Assets/Icons/refresh.png')} />
        //                     <Text style={{ color: '#FFF', marginTop: 10, textAlign: 'center' }}>Refresh</Text>
        //                 </View>
        //             </TouchableWithoutFeedback>
        //         </View>
        //     </View>
        //     <ScrollView>
        //         {
        //             props.listApp.map((appName, index) => {
        //                 return (
        //                     <TouchableHighlight onPress={() => { return }} key={index}>
        //                         <View style={{ flexDirection: 'row', backgroundColor: "#36393f" }}>
        //                             <Image style={{ width: 35, height: 35, transform: [{ translateX: 8 }, { translateY: 8 }] }} source={{ uri: `data:image/png;base64,${appName.icon}` }} />
        //                             <Text style={{ color: '#e1e2e4', fontSize: 16, paddingLeft: 15, paddingTop: 15, paddingBottom: 15 }}>{appName.appName}</Text>
        //                         </View>
        //                     </TouchableHighlight>
        //                 )
        //             })
        //         }
        //     </ScrollView>
        // </SafeAreaView>
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
