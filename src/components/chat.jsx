import React from 'react';
import io from 'socket.io-client';
import {concat} from 'lodash';
import {MessageForm} from './message-form';
import {NicknameForm} from './nickname-form';
import {CreateRoomForm} from './create-room-form';
import {MessagesList} from './messages-list';
import {RoomsList} from './rooms-list';

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
    }

    changeRoom = ({roomName}) => {
        this.socket.emit('change room', {roomName});
    }

    render() {
        const {nickname, messages, roomScheme} = this.state;
        return (
            <div>
                <span>{`People know you as: ${nickname}`}</span>
                <NicknameForm onSubmit={this.setNickname} />
                <MessageForm onSubmit={this.sendMessage} />
                <CreateRoomForm onSubmit={this.createRoom} />
                <MessagesList nickname={nickname} messages={messages} />
                <RoomsList roomScheme={roomScheme} onChangeRoom={this.changeRoom} />
            </div>
        );
    }
}
