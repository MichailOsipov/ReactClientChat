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
            ? map(messages, message => (
                <Message
                    key={JSON.stringify(message)}
                    nickname={nickname}
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
