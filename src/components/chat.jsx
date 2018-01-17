import React from 'react';
import {connect} from 'react-redux';
import {change} from 'redux-form';
import io from 'socket.io-client';
import {concat} from 'lodash';
import {
    ChatLayoutContainer,
    ChatLayoutModule
} from 'modules/chat-layout';
import {NicknameForm} from './nickname-form';
import {Rooms} from './rooms';
import {Messages} from './messages';

@connect(null, {
    setNewNickname: nickname => (dispatch) => { dispatch(change('nicknameForm', 'nickname', nickname)); }
})
export class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.socket = io('localhost:8088');
        this.socket.on('connect', () => {
            console.log('connection successfull');
        });
        this.socket.emit('ask a nickname', {});
        this.socket.on('set a nickname', ({nickname}) => {
            this.setState({nickname});
            this.props.setNewNickname(nickname);
        });
        this.socket.on('set a room scheme', ({roomScheme}) => {
            this.setState({roomScheme});
        });
        this.socket.on('broadcast message', (message) => {
            this.appendMessage(message);
        });
    }

    state = {
        nickname: '',
        messages: [],
        roomScheme: []
    };

    setNickname = ({nickname}) => {
        this.socket.emit('set a nickname', {nickname});
    }

    appendMessage = ({author, text}) => {
        this.setState(({messages}) => ({
            messages: concat(messages, {author, text})
        }));
    }

    sendMessage = ({message}) => {
        this.socket.emit('send message', {text: message});
    }

    createRoom = ({roomName}) => {
        this.socket.emit('create room', {roomName});
        this.setState({messages: []});
    }

    changeRoom = ({roomName}) => {
        this.socket.emit('change room', {roomName});
        this.setState({messages: []});
    }

    render() {
        const {nickname, messages, roomScheme} = this.state;
        return (
            <ChatLayoutContainer>
                <ChatLayoutModule md={2}>
                    <Rooms
                        onCreateRoom={this.createRoom}
                        onChangeRoom={this.changeRoom}
                        roomScheme={roomScheme}
                    />
                </ChatLayoutModule>
                <ChatLayoutModule md={3}>
                    <Messages
                        nickname={nickname}
                        messages={messages}
                        onSendMessage={this.sendMessage}
                    />
                </ChatLayoutModule>
                <ChatLayoutModule md={2}>
                    <NicknameForm nickname={nickname} onSubmit={this.setNickname} />
                </ChatLayoutModule>
            </ChatLayoutContainer>
        );
    }
}
