import React from 'react';
import io from 'socket.io-client';
import {concat} from 'lodash';
import {MessageForm} from './message-form';
import {NicknameForm} from './nickname-form';
import {MessagesList} from './messages-list';

export class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.socket = io('localhost:8088');
        this.socket.on('connect', () => {
            console.log('connection successfull');
        });
        this.socket.on('broadcast message', (data) => {
            this.appendMessage(data);
        });
    }

    state = {
        nickname: '',
        messages: []
    };

    setNickname = ({nickname}) => {
        this.setState({nickname});
        this.socket.emit('set nickname', {nickname});
    }

    appendMessage = ({author, text}) => {
        this.setState(({messages}) => ({
            messages: concat(messages, {author, text})
        }));
    }

    sendMessage = ({message}) => {
        this.socket.emit('send message', {text: message});
    }

    render() {
        const {nickname, messages} = this.state;
        return (
            <div>
                <span>{`People know you as: ${nickname}`}</span>
                <NicknameForm onSubmit={this.setNickname} />
                <MessageForm onSubmit={this.sendMessage} />
                <MessagesList nickname={nickname} messages={messages} />
            </div>
        );
    }
}
