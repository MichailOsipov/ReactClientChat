import PropTypes from 'prop-types';

export const UserPropType = {
    nickname: PropTypes.string,
    roomId: PropTypes.string,
    userId: PropTypes.string
};

export const RoomPropType = {
    roomId: PropTypes.string,
    roomName: PropTypes.string
};
