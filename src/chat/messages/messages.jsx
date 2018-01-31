import React from 'react';
import PropTypes from 'prop-types';
import {block} from '@redneckz/react-bem-helper';
import {MainTitle} from 'modules/main-title';
import {MessageForm} from './message-form';
import {MessagesList} from './messages-list';
import styles from './messages.scss';
import {UserPropType, RoomPropType} from '../chat-prop-types';

export const Messages = block('messages', {styles})(({
    className,
    userId,
    messages,
    onSendMessage,
    roomScheme
}) => (
    <div className={className}>
        <MainTitle>Chat:</MainTitle>
        <MessagesList userId={userId} messages={messages} roomScheme={roomScheme} />
        <MessageForm onSubmit={onSendMessage} />
    </div>
));

Messages.propTypes = {
    className: PropTypes.string,
    nickname: PropTypes.string,
    messages: PropTypes.arrayOf(PropTypes.shape({
        userId: PropTypes.string,
        text: PropTypes.string
    })),
    roomScheme: PropTypes.shape({
        users: PropTypes.arrayOf(UserPropType),
        rooms: PropTypes.arrayOf(RoomPropType)
    }),
    onSendMessage: PropTypes.func
};
