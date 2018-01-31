import React from 'react';
import PropTypes from 'prop-types';
import {block} from '@redneckz/react-bem-helper';
import {filter, map} from 'lodash';
import {Room} from './room';
import styles from './rooms-list.scss';
import {UserPropType, RoomPropType} from '../../chat-prop-types';

export const RoomsList = block('rooms-list', {styles})(({
    className,
    roomScheme,
    onChangeRoom,
    userId
}) => {
    const {rooms, users} = roomScheme;
    return (
        <div className={className}>
            {map(rooms, ({roomId, roomName}) => (
                <Room
                    key={roomId}
                    onChangeRoom={onChangeRoom}
                    roomId={roomId}
                    roomName={roomName}
                    userId={userId}
                    usersInRoom={filter(users, {roomId})}
                />
            ))}
        </div>
    );
});

RoomsList.propTypes = {
    roomScheme: PropTypes.shape({
        users: PropTypes.arrayOf(UserPropType),
        rooms: PropTypes.arrayOf(RoomPropType)
    }),
    onChangeRoom: PropTypes.func,
    nickname: PropTypes.string
};
