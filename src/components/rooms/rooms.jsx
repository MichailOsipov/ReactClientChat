import React from 'react';
import PropTypes from 'prop-types';
import {MainTitle} from 'modules/main-title';
import {CreateRoomForm} from './create-room-form';
import {RoomsList} from './rooms-list';

export const Rooms = ({
    onCreateRoom,
    onChangeRoom,
    roomScheme,
    nickname
}) => (
    <div>
        <MainTitle>Rooms:</MainTitle>
        <CreateRoomForm onSubmit={onCreateRoom} />
        <RoomsList
            roomScheme={roomScheme}
            onChangeRoom={onChangeRoom}
            nickname={nickname}
        />
    </div>
);

Rooms.propTypes = {
    onCreateRoom: PropTypes.func,
    onChangeRoom: PropTypes.func,
    roomScheme: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        users: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string
        }))
    })),
    nickname: PropTypes.string
};
