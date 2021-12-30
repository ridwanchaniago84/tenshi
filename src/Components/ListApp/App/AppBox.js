import React from "react";
import {
    View,
    Text,
    Image,
    Pressable
} from 'react-native';
import { connect } from 'react-redux';

import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { defaultFont } from '../../../Commons/Style';
import { changeAppInfo } from '../../../Redux/Action/Action';

const AppBox = React.memo((props) => {
    return (
        <View
            style={{
                backgroundColor: '#4883f7',
                borderRadius: 40 / 5,
                padding: 15,
                marginBottom: 15
            }}>
            <View
                style={{
                    flexDirection: 'row',
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
                        }}>{props.appName}</Text>
                        <Text style={{
                            marginTop: 10,
                            fontFamily: defaultFont.normal,
                            color: '#f0f3fc',
                            fontSize: 15
                        }}>{props.package}</Text>
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
                    <Image style={{ width: 35, height: 35, transform: [{ translateX: 8 }, { translateY: 8 }] }} source={{ uri: props.icon }} />
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
                onPress={() => props.dispatch(changeAppInfo({
                    modal: true,
                    name: props.appName,
                    package: props.package
                })) }
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
    );
});

const mapStateToProps = (state, props) => {
    return {
        appInfo: state.mainState.appInfo,
        appName: props.appName,
        icon: props.icon,
        package: props.package
    };
}

export default connect(mapStateToProps)(AppBox);
