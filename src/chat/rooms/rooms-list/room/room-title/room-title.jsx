import React from 'react';
import PropTypes from 'prop-types';
import {block} from '@redneckz/react-bem-helper';
import {MiddleText} from 'modules/middle-text';
import styles from './room-title.scss';

export const RoomTitle = block('room-title', {styles})(({
    className,
    onChangeRoom,
    name
}) => (
    <div className={className}>
        <JoinButton onClick={onChangeRoom}>Join</JoinButton>
        <MiddleText>{name}</MiddleText>
    </div>
));

RoomTitle.propTypes = {
    name: PropTypes.string,
    onChangeRoom: PropTypes.func
};

const JoinButton = RoomTitle.element('join-button')('div');
