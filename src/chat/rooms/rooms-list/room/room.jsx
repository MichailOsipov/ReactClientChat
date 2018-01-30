import React from 'react';
import PropTypes from 'prop-types';
import {block} from '@redneckz/react-bem-helper';
import {map} from 'lodash';
import {RoomTitle} from './room-title';
import {RoomUser} from './room-user';
import styles from './room.scss';

export const Room = block('room', {styles})(({
    name,
    users,
    nickname,
    onChangeRoom
}) => (
    <div>
        <RoomTitle onChangeRoom={onChangeRoom} name={name} />
        {map(users, user => (
            <RoomUser
                key={JSON.stringify(user)}
                name={user.name}
                highlight={nickname === user.name}
            />
        ))}
    </div>
));

Room.propTypes = {
    name: PropTypes.string,
    users: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string
    })),
    onChangeRoom: PropTypes.func,
    nickname: PropTypes.string
};
