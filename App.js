import React, { useEffect } from "react";
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PersistGate } from 'redux-persist/integration/react';
import SplashScreen from "react-native-splash-screen";

import { persistor, store } from './src/Redux/Store';
import Home from "./src/Screen/Home/Index";
import Torrent from "./src/Screen/Torrrent/Index";
import listApp from "./src/Screen/App/ListApp";
import Developer from './src/Screen/Developer/Developer';
import { DEEP_LINK } from '@env';
import database from '@react-native-firebase/database';
import { setSchduleNotification } from './src/Notification/Notification';

const Stack = createStackNavigator();

database()
  .ref('schdule')
  .orderByKey()
  .limitToLast(1)
  .on('value', snapshot => {
    snapshot.forEach((data) => {
      const dataJson = data.toJSON();
      setSchduleNotification(dataJson.title, dataJson.date);
    });
  });

const linking = {
  prefixes: [DEEP_LINK],
  config: {
    initialRouteName: 'AISetting',
    // screens: {
    //   AISetting: {
    //     path: 'home'
    //   },
    //   torrentDownload: {
    //     path: 'torrent'
    //   }
    // }
  }
};

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer
          linking={linking}
        >
          <Stack.Navigator >
            <Stack.Screen
              name="AISetting"
              component={Home}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="torrentDownload"
              component={Torrent}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="listApp"
              component={listApp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="developer"
              component={Developer}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
