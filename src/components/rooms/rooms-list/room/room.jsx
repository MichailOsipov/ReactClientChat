import React from 'react';
import PropTypes from 'prop-types';
import {block} from '@redneckz/react-bem-helper';
import {map} from 'lodash';
import styles from './room.scss';

export const Room = block('room', {styles})(({
    className,
    name,
    users,
    onChangeRoom
}) => (
    <div>
        <div className={className} onClick={() => { onChangeRoom({roomName: name}); }}>
            {`Room name: ${name}`}
        </div>
        {map(users, user => (
            <div key={JSON.stringify(user)}>{`User: ${user.name}`}</div>
        ))}
    </div>
));

Room.propTypes = {
    name: PropTypes.string,
    users: PropTypes.arrayOf({
        name: PropTypes.string
    }),
    onChangeRoom: PropTypes.func
};
