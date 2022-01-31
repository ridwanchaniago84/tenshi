import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable
} from 'react-native';
import { connect } from 'react-redux';
import { style, defaultFont } from '../../../Commons/Style';
import Modal from "react-native-modal";
import { changeAppInfo, refreshApp } from '../../../Redux/Action/Action';

const ModalAliasApp = (props) => {
    const [appAlias, setAppAlias] = useState('')

    const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const prevName = usePrevious(props.appInfo.name);

    useEffect(() => {
        if (props.appInfo.name != prevName) {
            setAppAlias(props.appInfo.name);
        }
    });

    const closeModal = () => {
        props.dispatch(changeAppInfo({
            modal: false,
            name: '',
            package: ''
        }));

        setAppAlias('');
    }

    const titleCase = (str) => {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
    
        return splitStr.join(' '); 
     }

    const changeAlias = () => {
        const apps = props.listApp;
        apps.find(object => object.packageName === props.appInfo.package).appName = titleCase(appAlias);
        props.dispatch(refreshApp([]));
        props.dispatch(refreshApp(apps));
        closeModal();

        return;
    }

    return (
        <Modal
            isVisible={props.appInfo.modal}
            onBackdropPress={() => closeModal()}
            onRequestClose={() => closeModal()}
        >
            <View
                style={{
                    backgroundColor: '#3d3c40',
                    borderRadius: 10,
                    overflow: 'hidden',
                }}>
                <View style={{
                    paddingHorizontal: 30,
                    marginTop: 30,
                    marginBottom: 20
                }}>
                    <Text
                        style={{
                            color: '#f7f6f7',
                            fontFamily: defaultFont.normal,
                            fontSize: 20,
                            marginBottom: 15
                        }}>Change Alias App Name</Text>
                    <TextInput
                        style={{
                            backgroundColor: '#313033',
                            color: '#f7f6f7',
                            fontSize: 16,
                            padding: 15,
                            marginTop: 15,
                            borderRadius: 5,
                            marginBottom: 15
                        }}
                        placeholder='Alias App Name'
                        placeholderTextColor="#8d8b98"
                        value={appAlias}
                        onChangeText={setAppAlias}
                    />
                </View>
                <View
                    style={{
                        paddingHorizontal: 30,
                        backgroundColor: '#313033',
                        paddingVertical: 20,
                        alignItems: 'flex-end',
                        borderTopColor: '#2e2d30',
                        borderTopWidth: 2
                    }}
                >
                    <View style={{ flexDirection: 'row', }}>

                        <Pressable
                            style={[
                                style.button,
                                {
                                    backgroundColor: '#3e3d40',
                                    borderRadius: 10,
                                    paddingHorizontal: 0,
                                    width: '50%',
                                    marginLeft: 15
                                }
                            ]}
                            onPress={() => closeModal()}
                        >
                            <Text style={{ fontFamily: defaultFont.normal, fontSize: 17, color: '#928f9c' }}>Cancel</Text>
                        </Pressable>

                        <Pressable
                            style={[
                                style.button,
                                {
                                    backgroundColor: '#6562fc',
                                    borderRadius: 10,
                                    paddingHorizontal: 0,
                                    width: '50%',
                                    marginLeft: 15
                                }
                            ]}
                            onPress={() => changeAlias()}
                        >
                            <Text style={{ fontFamily: defaultFont.normal, fontSize: 17, color: '#ecebfe' }}>Save</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {
        appInfo: state.mainState.appInfo,
        listApp: state.mainState.listApp
    };
}

export default connect(mapStateToProps)(ModalAliasApp);
