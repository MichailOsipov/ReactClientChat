import React from 'react';
import PropTypes from 'prop-types';

export const Message = ({nickname, author, text}) => {
    const realNickname = nickname === author ? 'You' : author;
    return (
        <div>{`${realNickname}: ${text}`}</div>
    );
};

Message.propTypes = {
    nickname: PropTypes.string,
    author: PropTypes.string,
    text: PropTypes.string
};
