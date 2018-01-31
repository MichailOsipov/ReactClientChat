import {change, reset} from 'redux-form';
import {NICKNAME_FORM_NAME, MESSAGE_FORM_NAME} from './constants';

export const SET_USER_ID = 'set-user-id';
export const ADD_MESSAGE = 'add-message';
export const CLEAR_MESSAGES = 'clear-messages';
export const SET_ROOM_SCHEME = 'set-room-scheme';

export const setUserId = ({userId}) => (dispatch) => {
    dispatch({
        type: SET_USER_ID,
        payload: {userId}
    });
};

export const addMessage = ({userId, text}) => (dispatch) => {
    dispatch({
        type: ADD_MESSAGE,
        payload: {userId, text}
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
