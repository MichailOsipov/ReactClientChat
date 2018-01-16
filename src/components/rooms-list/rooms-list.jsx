import React from 'react';
import PropTypes from 'prop-types';
import {map} from 'lodash';
import {Room} from './room';

export const RoomsList = ({
    roomScheme,
    onChangeRoom
}) => (
    <div>
        <div>Rooms:</div>
        {map(roomScheme, room => (
            <Room onChangeRoom={onChangeRoom} {...room} />
        ))}
    </div>
);

RoomsList.propTypes = {
    roomScheme: PropTypes.arrayOf({
        name: PropTypes.string,
        users: PropTypes.arrayOf({
            name: PropTypes.string
        })
    }),
    onChangeRoom: PropTypes.func
};
