import { createStore, combineReducers } from 'redux';
import reducer from './Reducer';

const rootReducer = combineReducers(
    {
        mainState: reducer
    }
);

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;
