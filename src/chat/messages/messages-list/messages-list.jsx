import React from 'react';
import PropTypes from 'prop-types';
import {block} from '@redneckz/react-bem-helper';
import {get, find, map} from 'lodash';
import {MiddleText} from 'modules/middle-text';
import {Message} from './message';
import styles from './messages-list.scss';
import {UserPropType, RoomPropType} from '../../chat-prop-types';

export const MessagesList = block('messages-list', {styles})(({
    className,
    userId,
    roomScheme: {users},
    messages
}) => (
    <div className={className}>
        {messages.length
            ? map(messages, (message, i) => (
                <Message
                    key={JSON.stringify(message)}
                    userId={userId}
                    authorId={message.userId}
                    authorName={get(find(users, {userId: message.userId}), 'nickname')}
                    text={message.text}
                    nextDifferent={!isTheSameAuthor(message, messages[i + 1])}
                    previousDifferent={!isTheSameAuthor(message, messages[i - 1])}
                />
            ))
            : <MiddleText>No messages yet</MiddleText>
        }
    </div>
));

MessagesList.propTypes = {
    nickname: PropTypes.string,
    messages: PropTypes.arrayOf(PropTypes.shape({
        userId: PropTypes.string,
        text: PropTypes.string
    })),
    roomScheme: PropTypes.shape({
        users: PropTypes.arrayOf(UserPropType),
        rooms: PropTypes.arrayOf(RoomPropType)
    })
};

function isTheSameAuthor(message1, message2) {
    if (!message1 || !message2) {
        return false;
    }
    return message1.userId === message2.userId;
}
