import React from 'react';
import PropTypes from 'prop-types';
import {block} from '@redneckz/react-bem-helper';
import {MainTitle} from 'modules/main-title';
import {MessageForm} from './message-form';
import {MessagesList} from './messages-list';
import styles from './messages.scss';

export const Messages = block('messages', {styles})(({
    className,
    nickname,
    messages,
    onSendMessage
}) => (
    <div className={className}>
        <MainTitle>Chat:</MainTitle>
        <MessagesList nickname={nickname} messages={messages} />
        <MessageForm onSubmit={onSendMessage} />
    </div>
));

Messages.propTypes = {
    className: PropTypes.string,
    nickname: PropTypes.string,
    messages: PropTypes.arrayOf(PropTypes.shape({
        author: PropTypes.string,
        text: PropTypes.string
    })),
    onSendMessage: PropTypes.func
};
