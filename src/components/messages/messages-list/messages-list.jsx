import React from 'react';
import PropTypes from 'prop-types';
import {map} from 'lodash';
import {Message} from './message';

export const MessagesList = ({
    nickname,
    messages
}) => (
    <div>
        {messages.length
            ? map(messages, (message, i) => (
                <Message
                    key={JSON.stringify(message)}
                    nickname={nickname}
                    nextDifferent={!isTheSameAuthor(message, messages[i + 1])}
                    previousDifferent={!isTheSameAuthor(message, messages[i - 1])}
                    {...message}
                />
            ))
            : 'No messages yet'
        }
    </div>
);

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
