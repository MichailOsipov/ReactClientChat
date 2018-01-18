import React from 'react';
import PropTypes from 'prop-types';
import {block} from '@redneckz/react-bem-helper';
import {map} from 'lodash';
import {Room} from './room';
import styles from './rooms-list.scss';

export const RoomsList = block('rooms-list', {styles})(({
    className,
    roomScheme,
    onChangeRoom,
    nickname
}) => (
    <div className={className}>
        {map(roomScheme, room => (
            <Room
                key={JSON.stringify(room)}
                onChangeRoom={onChangeRoom}
                nickname={nickname}
                {...room}
            />
        ))}
    </div>
));

RoomsList.propTypes = {
    roomScheme: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        users: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string
        }))
    })),
    onChangeRoom: PropTypes.func,
    nickname: PropTypes.string
};
