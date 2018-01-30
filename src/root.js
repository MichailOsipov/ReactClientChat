import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {chatReducer, CHAT_STORE_KEY} from './chat';

export const rootReducer = combineReducers({
    form: formReducer,
    [CHAT_STORE_KEY]: chatReducer
});
