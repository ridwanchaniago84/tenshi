import React from "react";
import { connect } from 'react-redux';
import {
  View,
  Image
} from 'react-native';
import { BOT_ID } from "@env";
import { style } from './Style';

const Header = (props) => {

  return (
    <View style={style.container}>
      <Image
        style={{ width: 70, height: 70, borderRadius: 70 / 5, marginTop: 25, marginLeft: 20 }}
        source={{ uri: `https://cdn.discordapp.com/avatars/${BOT_ID}/${props.avatar}.webp` }}
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
      avatar: state.mainState.avatar
  };
}

export default connect(mapStateToProps)(Header);
