import {CHAT_STORE_KEY} from './constants';

const getDomain = store => store[CHAT_STORE_KEY];

export const getUserId = state => getDomain(state).userId;
export const getMessages = state => getDomain(state).messages;
export const getRoomScheme = state => getDomain(state).roomScheme;
