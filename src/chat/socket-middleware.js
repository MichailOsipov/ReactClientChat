import io from 'socket.io-client';
import {identity, find, noop} from 'lodash';
import {SOCKET_EMIT} from './constants';

export const socketMiddleware = config => store => (next) => {
    const {url, onConnect = noop, onDisconnect = noop, input, output} = config;
    const socket = io(url);
    socket.on('connect', () => {
        onConnect({socket});
        input.forEach(({eventName, actionCreator, dataProvider = identity}) => {
            socket.on(eventName, (data) => {
                next(actionCreator(dataProvider(data)));
            });
        });
    });
    socket.on('disconnect', () => {
        onDisconnect({socket});
    });
    return (action) => {
        if (action.type === SOCKET_EMIT) {
            const {eventName} = action && action.meta;
            const {payload} = action;
            const descriptor = find(output, {eventName});
            if (descriptor) {
                const {actionCreator, dataProvider = identity} = descriptor;
                socket.emit(eventName, dataProvider(payload));
                if (actionCreator) {
                    next(actionCreator(payload));
                }
            }
        }
        const result = next(action);
        return result;
    };
};
