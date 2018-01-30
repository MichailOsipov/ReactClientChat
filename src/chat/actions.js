import {change, reset} from 'redux-form';
import {NICKNAME_FORM_NAME, MESSAGE_FORM_NAME, SOCKET_EMIT} from './constants';

export const ADD_MESSAGE = 'add-message';
export const CLEAR_MESSAGES = 'clear-messages';
export const SET_ROOM_SCHEME = 'set-room-scheme';

export const addMessage = ({author, text}) => (dispatch) => {
    dispatch({
        type: ADD_MESSAGE,
        payload: {author, text}
    });
};

export const clearMessages = () => (dispatch) => {
    dispatch({
        type: CLEAR_MESSAGES
    });
};

export const setRoomScheme = ({roomScheme}) => (dispatch) => {
    dispatch({
        type: SET_ROOM_SCHEME,
        payload: {roomScheme}
    });
};

export const setNicknameForm = ({nickname}) => change(NICKNAME_FORM_NAME, 'nickname', nickname);
export const clearMessageForm = () => reset(MESSAGE_FORM_NAME);

export const emit = (eventName, data) => (dispatch) => {
    dispatch({
        type: SOCKET_EMIT,
        meta: {eventName},
        payload: data
    });
};
