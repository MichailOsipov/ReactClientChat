import {createStore, compose} from 'redux';
import {rootReducer} from './root';

const reduxLogger = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__({ maxAge: 10 }) : f => f;
export const store = createStore(rootReducer, compose(reduxLogger));
