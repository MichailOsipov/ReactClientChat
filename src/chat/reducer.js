import {concat} from 'lodash';
import {ADD_MESSAGE, CLEAR_MESSAGES, SET_ROOM_SCHEME} from './actions';

export const chatReducer = (state = {messages: [], roomScheme: []}, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            const {author, text} = action.payload;
            return {
                ...state,
                messages: concat(state.messages, {author, text})
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
