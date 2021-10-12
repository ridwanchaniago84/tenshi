import React from "react";
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import configureStore from './src/Redux/Store';
import Home from "./src/Screen/Home/Index";
import Torrent from "./src/Screen/Torrrent/Index";

const store = configureStore();
const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen
            name="AISetting"
            component={Home}
            options={{
              headerStyle: {
                backgroundColor: '#2f3136'
              },
              headerTintColor: '#fff'
            }}
          />
          <Stack.Screen
            name="torrentDownload"
            component={Torrent}
            options={{
              headerStyle: {
                backgroundColor: '#2f3136'
              },
              headerTintColor: '#fff',
              title: 'Torrent Download'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
