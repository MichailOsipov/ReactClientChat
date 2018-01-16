import React from 'react';
import PropTypes from 'prop-types';
import {map} from 'lodash';

export const Room = ({
    name,
    users,
    onChangeRoom
}) => (
    <div>
        <div onClick={() => { onChangeRoom({roomName: name}); }}>
            {`Room name: ${name}`}
        </div>
        {map(users, user => (
            <div>{`User: ${user.name}`}</div>
        ))}
    </div>
);

Room.propTypes = {
    name: PropTypes.string,
    users: PropTypes.arrayOf({
        name: PropTypes.string
    })
};
