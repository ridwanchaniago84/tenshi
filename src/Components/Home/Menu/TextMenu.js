import React from "react";
import {
    Text
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { menu } from '../../../Commons/Style';

const TextMenu = React.memo((props) => {
    return (
        <>
            <FontAwesomeIcon style={menu.icon} size={20} icon={props.Icon} />
            <Text style={menu.text}>{props.Text}</Text>
        </>
    );
});

export default TextMenu;
