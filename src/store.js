import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from './root';
import {socketMiddleware, config} from './chat';

const reduxLogger = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__({ maxAge: 10 }) : f => f;
export const store = createStore(
    rootReducer,
    compose(reduxLogger),
    applyMiddleware(socketMiddleware(config), thunk)
);
