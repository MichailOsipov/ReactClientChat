import React from 'react';
import PropTypes from 'prop-types';
import {block} from '@redneckz/react-bem-helper';
import {concat} from 'lodash';
import styles from './message.scss';

export const Message = block('message', generateDifferentModificator, {styles})(({
    className,
    nickname,
    author,
    text,
    nextDifferent,
    previousDifferent
}) => {
    const realNickname = nickname === author ? 'You' : author;
    return (
        <div className={className}>
            <Author>{previousDifferent && `${realNickname}:`}</Author>
            <Text
                nickname={nickname}
                author={author}
                nextDifferent={nextDifferent}
                previousDifferent={previousDifferent}
            >
                {text}
            </Text>
        </div>
    );
});

const Author = Message.element('author')('div');
const Text = Message.element('text', generateTextModificator)('div');

Message.propTypes = {
    nickname: PropTypes.string,
    author: PropTypes.string,
    text: PropTypes.string,
    nextDifferent: PropTypes.bool
};

function generateTextModificator(props) {
    return concat(
        generateMessageModificatior(props),
        generateDifferentModificator(props)
    );
}

function generateMessageModificatior({nickname, author}) {
    return nickname === author ? ['own'] : ['not-own'];
}

function generateDifferentModificator({nextDifferent, previousDifferent}) {
    return [{nextDifferent}, {previousDifferent}];
}
