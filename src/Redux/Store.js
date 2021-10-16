import { createStore, combineReducers, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import reducer from './Reducer';

const persistConfig = {
    key: 'listApp',
    storage: AsyncStorage,
    whitelist: ['listApp']
}

const rootReducer = combineReducers(
    {
        mainState: persistReducer(persistConfig, reducer),
    }
);

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
const persistor = persistStore(store);

export { persistor, store };
