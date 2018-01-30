import {formValueSelector} from 'redux-form';
import {NICKNAME_FORM_NAME, CHAT_STORE_KEY} from './constants';

const getDomain = store => store[CHAT_STORE_KEY];
const valueSelector = formValueSelector(NICKNAME_FORM_NAME);

export const getNickname = state => valueSelector(state, 'nickname');
export const getMessages = state => getDomain(state).messages;
export const getRoomScheme = state => getDomain(state).roomScheme;
