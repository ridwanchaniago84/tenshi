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

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
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
