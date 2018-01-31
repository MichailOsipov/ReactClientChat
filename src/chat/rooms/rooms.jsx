import React from 'react';
import PropTypes from 'prop-types';
import {MainTitle} from 'modules/main-title';
import {CreateRoomForm} from './create-room-form';
import {RoomsList} from './rooms-list';
import {UserPropType, RoomPropType} from '../chat-prop-types';

export const Rooms = ({
    onCreateRoom,
    onChangeRoom,
    roomScheme,
    userId
}) => (
    <div>
        <MainTitle>Rooms:</MainTitle>
        <CreateRoomForm onSubmit={onCreateRoom} />
        <RoomsList
            roomScheme={roomScheme}
            onChangeRoom={onChangeRoom}
            userId={userId}
        />
    </div>
);

Rooms.propTypes = {
    onCreateRoom: PropTypes.func,
    onChangeRoom: PropTypes.func,
    roomScheme: PropTypes.shape({
        users: PropTypes.arrayOf(UserPropType),
        rooms: PropTypes.arrayOf(RoomPropType)
    }),
    userId: PropTypes.string
};
