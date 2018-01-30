import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import {ChatLayoutContainer, ChatLayoutModule} from 'modules/chat-layout';
import {NicknameForm} from './nickname-form';
import {Rooms} from './rooms';
import {Messages} from './messages';
import {
    addMessage,
    clearMessages,
    setRoomScheme,
    setNicknameForm,
    clearMessageForm
} from './actions';
import {getNickname, getMessages, getRoomScheme} from './selectors';

@connect(state => ({
    nickname: getNickname(state),
    messages: getMessages(state),
    roomScheme: getRoomScheme(state)
}), {
    addMessage,
    clearMessages,
    setRoomScheme,
    setNicknameForm,
    clearMessageForm
})
export class Chat extends React.Component {
    static propTypes = {
        nickname: PropTypes.string,
        messages: PropTypes.arrayOf(PropTypes.shape({
            author: PropTypes.string,
            text: PropTypes.string
        })),
        roomScheme: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            users: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string
            }))
        })),
        setNicknameForm: PropTypes.func,
        clearMessageForm: PropTypes.func,
        addMessage: PropTypes.func,
        clearMessages: PropTypes.func,
        setRoomScheme: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.socket = io('localhost:8088');
        this.socket.on('connect', () => {
            this.socket.emit('ask a nickname', {});
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

    changeRoom = ({roomName}) => {
        this.socket.emit('change room', {roomName});
        this.props.clearMessages();
    }

    render() {
        const {nickname, messages, roomScheme} = this.props;
        return (
            <ChatLayoutContainer>
                <ChatLayoutModule md={2} height={8}>
                    <Rooms
                        onCreateRoom={this.createRoom}
                        onChangeRoom={this.changeRoom}
                        roomScheme={roomScheme}
                        nickname={nickname}
                    />
                </ChatLayoutModule>
                <ChatLayoutModule md={3}>
                    <Messages
                        nickname={nickname}
                        messages={messages}
                        onSendMessage={this.sendMessage}
                    />
                </ChatLayoutModule>
                <ChatLayoutModule md={2} height={1}>
                    <NicknameForm nickname={nickname} onSubmit={this.setNickname} />
                </ChatLayoutModule>
            </ChatLayoutContainer>
        );
    }
}
