import React, { useState, useCallback } from "react";
import {
    SafeAreaView,
    ScrollView,
    RefreshControl,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import RNInstalledApplication from 'react-native-installed-application';

import { refreshApp } from '../../Redux/Action/Action';
import AppBox from './App/AppBox';
import ModalAliasApp from './App/ModalAliasApp';

const App = (props) => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        RNInstalledApplication.getNonSystemApps()
            .then(apps => props.dispatch(refreshApp(apps)))
            .then(() => setRefreshing(false))
            .catch(error => console.log(error));
    }, []);

    const Content = () => {
        console.log(props.listApp.length);
        if (props.listApp.length > 0) {
            return (
                props.listApp.map((appName, index) => {
                    return (
                        <AppBox
                            appName={appName.appName}
                            icon={`data:image/png;base64,${appName.icon}`}
                            package={appName.packageName}
                            key={index}
                        />
                    )
                })
            );
        }
        
        return (
            <Text style={{ color: 'white', textAlign: 'center', marginBottom: '100%' }}>Pull down for refresh</Text>
        );
    }

    return (
        <>
            <SafeAreaView
                style={{
                    margin: 15,
                    marginBottom: 115
                }}
            >
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={["#4883f7", "#2068f5"]}
                        />
                    }>
                    <Content />
                </ScrollView>
            </SafeAreaView>
            <ModalAliasApp />
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        listApp: state.mainState.listApp,
    };
}

export default connect(mapStateToProps)(App);
