import React from 'react';
import PropTypes from 'prop-types';
import {block} from '@redneckz/react-bem-helper';
import {map} from 'lodash';
import {RoomTitle} from './room-title';
import {RoomUser} from './room-user';
import styles from './room.scss';
import {UserPropType} from '../../../chat-prop-types';

export const Room = block('room', {styles})(({
    roomId,
    roomName,
    userId,
    usersInRoom,
    onChangeRoom
}) => (
    <div>
        <RoomTitle onChangeRoom={() => { onChangeRoom({roomId}); }} name={roomName} />
        {map(usersInRoom, ({userId: currUserId, nickname}) => (
            <RoomUser
                key={currUserId}
                name={nickname}
                highlight={currUserId === userId}
            />
        ))}
    </div>
));

Room.propTypes = {
    roomId: PropTypes.string,
    name: PropTypes.string,
    users: PropTypes.arrayOf(UserPropType),
    onChangeRoom: PropTypes.func,
    nickname: PropTypes.string
};
