import React from 'react';
import PropTypes from 'prop-types';
import {block} from '@redneckz/react-bem-helper';
import styles from './message.scss';

export const Message = block('message', generateMessageModificatior, {styles})(({
    className,
    nickname,
    author,
    text
}) => {
    const realNickname = nickname === author ? 'You' : author;
    return (
        <div className={className}>{`${realNickname}: ${text}`}</div>
    );
});

Message.propTypes = {
    nickname: PropTypes.string,
    author: PropTypes.string,
    text: PropTypes.string
};

function generateMessageModificatior({nickname, author}) {
    return nickname === author ? ['own'] : ['not-own'];
}
