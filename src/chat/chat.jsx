import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ChatLayoutContainer, ChatLayoutModule} from 'modules/chat-layout';
import {NicknameForm} from './nickname-form';
import {Rooms} from './rooms';
import {Messages} from './messages';
import {emit} from './actions';
import {getNickname, getMessages, getRoomScheme} from './selectors';
import {
    SET_NICKNAME,
    SEND_MESSAGE,
    CREATE_ROOM,
    CHANGE_ROOM
} from './socket-events';

@connect(state => ({
    nickname: getNickname(state),
    messages: getMessages(state),
    roomScheme: getRoomScheme(state)
}), {
    emit
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
        emit: PropTypes.func
    };

    render() {
        const {nickname, messages, roomScheme} = this.props;
        return (
            <ChatLayoutContainer>
                <ChatLayoutModule md={2} height={8}>
                    <Rooms
                        onCreateRoom={(data) => { this.props.emit(CREATE_ROOM, data); }}
                        onChangeRoom={(data) => { this.props.emit(CHANGE_ROOM, data); }}
                        roomScheme={roomScheme}
                        nickname={nickname}
                    />
                </ChatLayoutModule>
                <ChatLayoutModule md={3}>
                    <Messages
                        nickname={nickname}
                        messages={messages}
                        onSendMessage={(data) => { this.props.emit(SEND_MESSAGE, data); }}
                    />
                </ChatLayoutModule>
                <ChatLayoutModule md={2} height={1}>
                    <NicknameForm
                        nickname={nickname}
                        onSubmit={(data) => { this.props.emit(SET_NICKNAME, data); }}
                    />
                </ChatLayoutModule>
            </ChatLayoutContainer>
        );
    }
}
