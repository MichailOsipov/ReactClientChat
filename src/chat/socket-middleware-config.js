import {pick} from 'lodash/fp';
import {
    addMessage,
    clearMessages,
    setRoomScheme,
    setNicknameForm,
    clearMessageForm
} from './actions';
import {
    SET_NICKNAME,
    SEND_MESSAGE,
    SET_ROOM_SCHEME,
    BROADCAST_MESSAGE,
    CREATE_ROOM,
    CHANGE_ROOM
} from './socket-events';

export const config = {
    url: 'localhost:8088',
    onConnect: ({socket}) => { socket.emit('ask a nickname', {}); },
    input: [
        {
            eventName: SET_NICKNAME,
            actionCreator: setNicknameForm,
            dataProvider: pick(['nickname'])
        },
        {
            eventName: SET_ROOM_SCHEME,
            actionCreator: setRoomScheme,
            dataProvider: pick(['roomScheme'])
        },
        {
            eventName: BROADCAST_MESSAGE,
            actionCreator: addMessage,
            dataProvider: pick(['author', 'text'])
        }
    ],
    output: [
        {
            eventName: SET_NICKNAME,
            dataProvider: pick(['nickname'])
        },
        {
            eventName: SEND_MESSAGE,
            actionCreator: clearMessageForm,
            dataProvider: ({message}) => ({text: message})
        },
        {
            eventName: CREATE_ROOM,
            actionCreator: clearMessages,
            dataProvider: pick(['roomName'])
        },
        {
            eventName: CHANGE_ROOM,
            actionCreator: clearMessages,
            dataProvider: pick(['roomName'])
        }
    ]
};
