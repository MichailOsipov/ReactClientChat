import React from 'react';
import PropTypes from 'prop-types';
import {MainTitle} from 'modules/main-title';
import {MessageForm} from './message-form';
import {MessagesList} from './messages-list';

export const Messages = ({
    nickname,
    messages,
    onSendMessage
}) => (
    <div>
        <MainTitle>Chat:</MainTitle>
        <MessagesList nickname={nickname} messages={messages} />
        <MessageForm onSubmit={onSendMessage} />
    </div>
);

Messages.propTypes = {
    nickname: PropTypes.string,
    messages: PropTypes.arrayOf(PropTypes.shape({
        author: PropTypes.string,
        text: PropTypes.string
    })),
    onSendMessage: PropTypes.func
};
