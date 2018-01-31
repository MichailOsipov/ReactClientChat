import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import {ChatLayoutContainer, ChatLayoutModule} from 'modules/chat-layout';
import {NicknameForm} from './nickname-form';
import {Rooms} from './rooms';
import {Messages} from './messages';
import {
    setUserId,
    addMessage,
    clearMessages,
    setRoomScheme,
    setNicknameForm,
    clearMessageForm
} from './actions';
import {getUserId, getMessages, getRoomScheme} from './selectors';
import {UserPropType, RoomPropType} from './chat-prop-types';

@connect(state => ({
    userId: getUserId(state),
    messages: getMessages(state),
    roomScheme: getRoomScheme(state)
}), {
    setUserId,
    addMessage,
    clearMessages,
    setRoomScheme,
    setNicknameForm,
    clearMessageForm
})
export class Chat extends React.Component {
    static propTypes = {
        userId: PropTypes.string,
        messages: PropTypes.arrayOf(PropTypes.shape({
            userId: PropTypes.string,
            text: PropTypes.string
        })),
        roomScheme: PropTypes.shape({
            users: PropTypes.arrayOf(UserPropType),
            rooms: PropTypes.arrayOf(RoomPropType)
        }),
        setNicknameForm: PropTypes.func,
        clearMessageForm: PropTypes.func,
        setUserId: PropTypes.func,
        addMessage: PropTypes.func,
        clearMessages: PropTypes.func,
        setRoomScheme: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.socket = io('localhost:8088');
        this.socket.on('connect', () => {
            this.socket.emit('ask a nickname', {});
            this.socket.emit('ask a userId', {});
            this.socket.on('set a userId', this.props.setUserId);
            this.socket.on('set a nickname', this.props.setNicknameForm);
            this.socket.on('set a room scheme', this.props.setRoomScheme);
            this.socket.on('broadcast message', this.props.addMessage);
        });
    }

    setNickname = ({nickname}) => {
        this.socket.emit('set a nickname', {nickname});
    }

    sendMessage = ({message}) => {
        this.socket.emit('send message', {text: message});
        this.props.clearMessageForm();
    }

    createRoom = ({roomName}) => {
        this.socket.emit('create room', {roomName});
        this.props.clearMessages();
    }

    changeRoom = ({roomId}) => {
        this.socket.emit('change room', {roomId});
        this.props.clearMessages();
    }

    render() {
        const {userId, messages, roomScheme} = this.props;
        return (
            <ChatLayoutContainer>
                <ChatLayoutModule md={2} height={8}>
                    <Rooms
                        onCreateRoom={this.createRoom}
                        onChangeRoom={this.changeRoom}
                        roomScheme={roomScheme}
                        userId={userId}
                    />
                </ChatLayoutModule>
                <ChatLayoutModule md={3}>
                    <Messages
                        userId={userId}
                        messages={messages}
                        roomScheme={roomScheme}
                        onSendMessage={this.sendMessage}
                    />
                </ChatLayoutModule>
                <ChatLayoutModule md={2} height={1}>
                    <NicknameForm userId={userId} onSubmit={this.setNickname} />
                </ChatLayoutModule>
            </ChatLayoutContainer>
        );
    }
}
