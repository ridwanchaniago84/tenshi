import React from "react";
import { Provider } from 'react-redux';
import configureStore from './src/Redux/Store';
import Home from "./src/Screen/Home/Index";

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
