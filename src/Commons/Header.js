import React from "react";
import {
  View,
  Image
} from 'react-native';
import { style } from './Style'

const Header = () => {

  return (
    <View style={style.container}>
      <Image
        style={{ width: 70, height: 70, borderRadius: 70 / 5, marginTop: 25, marginLeft: 20 }}
        source={{ uri: `https://cdn.discordapp.com/avatars/559213233404379156/f9f5fe54a533a10712aa3ec54777093c.webp` }}
      />
    </View>
  );
}

export default Header;
