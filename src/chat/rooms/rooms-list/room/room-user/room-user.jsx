import React from 'react';
import PropTypes from 'prop-types';
import {block} from '@redneckz/react-bem-helper';
import {MiddleText} from 'modules/middle-text';
import styles from './room-user.scss';

export const RoomUser = block('room-user', {styles})(({
    className,
    name,
    highlight
}) => (
    <div className={className}>
        <UserIcon />
        <MiddleText highlight={highlight}>{name}</MiddleText>
    </div>
));

RoomUser.propTypes = {
    name: PropTypes.string,
    important: PropTypes.bool
};

const UserIcon = RoomUser.element('user-icon')('div');
