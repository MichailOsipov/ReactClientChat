import React from 'react';
import {connect} from 'react-redux';
import {change, reset} from 'redux-form';
import PropTypes from 'prop-types';
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
    setNewNicknameInForm: nickname => (dispatch) => { dispatch(change('nicknameForm', 'nickname', nickname)); },
    clearMessage: () => (dispatch) => { dispatch(reset('messageForm')); }
})
export class Chat extends React.Component {
    static propTypes = {
        setNewNicknameInForm: PropTypes.func,
        clearMessageInForm: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.socket = io('localhost:8088');
        this.socket.on('connect', () => {
            this.socket.emit('ask a nickname', {});
            this.socket.on('set a nickname', ({nickname}) => {
                this.setState({nickname});
                this.props.setNewNicknameInForm(nickname);
            });
            this.socket.on('set a room scheme', ({roomScheme}) => {
                this.setState({roomScheme});
            });
            this.socket.on('broadcast message', (message) => {
                this.appendMessage(message);
            });
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
        this.props.clearMessageInForm();
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
