import React from 'react';
import PropTypes from 'prop-types';
import {block} from '@redneckz/react-bem-helper';
import {map} from 'lodash';
import {MiddleText} from 'modules/middle-text';
import {Message} from './message';
import styles from './messages-list.scss';

export const MessagesList = block('messages-list', {styles})(({
    className,
    nickname,
    messages
}) => (
    <div className={className}>
        {messages.length
            ? map(messages, (message, i) => (
                <Message
                    key={JSON.stringify({...message, i})}
                    nickname={nickname}
                    nextDifferent={!isTheSameAuthor(message, messages[i + 1])}
                    previousDifferent={!isTheSameAuthor(message, messages[i - 1])}
                    {...message}
                />
            ))
            : <MiddleText>No messages yet</MiddleText>
        }
    </div>
));

MessagesList.propTypes = {
    nickname: PropTypes.string,
    messages: PropTypes.arrayOf(PropTypes.shape({
        author: PropTypes.string,
        text: PropTypes.string
    }))
};

function isTheSameAuthor(message1, message2) {
    if (!message1 || !message2) {
        return false;
    }
    return message1.author === message2.author;
}
