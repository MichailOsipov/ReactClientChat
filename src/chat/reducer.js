import {concat} from 'lodash';
import {SET_USER_ID, ADD_MESSAGE, CLEAR_MESSAGES, SET_ROOM_SCHEME} from './actions';

export const chatReducer = (state = {userId: '', messages: [], roomScheme: {}}, action) => {
    switch (action.type) {
        case SET_USER_ID: {
            const {userId} = action.payload;
            return {
                ...state,
                userId
            };
        }
        case ADD_MESSAGE: {
            const {userId, text} = action.payload;
            return {
                ...state,
                messages: concat(state.messages, {userId, text})
            };
        }
        case CLEAR_MESSAGES:
            return {
                ...state,
                messages: []
            };
        case SET_ROOM_SCHEME: {
            const {roomScheme} = action.payload;
            return {
                ...state,
                roomScheme
            };
        }
        default:
            return state;
    }
};
