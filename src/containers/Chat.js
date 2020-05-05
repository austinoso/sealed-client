import React, { useState, useEffect, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

import MessageArea from './MessageArea';
import NewMessageForm from '../components/NewMessageForm';
import {
	removeChat,
	fetchChatMessages,
	setActiveChat,
} from '../redux/actions/chats';
import { API_ROOT } from '../constants/index';

function Chat({ match, chats, fetchMessages, setActiveChat }) {
	const activeChat = chats.find(
		(chat) => chat.id === parseInt(match.params.chatId)
	);

	useEffect(() => {
		fetchMessages(activeChat);
		setActiveChat(activeChat.id);
	}, [match.params.chatId]);

	const deleteChat = () => {
		fetch(`${API_ROOT}/chats/${activeChat.id}`, { method: 'DELETE' });
		removeChat(activeChat);
	};

	const chatUser = () => {
		return activeChat.initiator.username === localStorage.username
			? activeChat.recipient.username
			: activeChat.initiator.username;
	};

	return (
		<div className="chat">
			<>
				<div className="chat-info">
					<h1>Chat with: {chatUser()}</h1>
					<Button onClick={deleteChat} variant="danger" size="sm">
						Delete Chat
					</Button>
				</div>
				<div className="message-section">
					<MessageArea messages={activeChat.messages} />
				</div>
				<NewMessageForm chatId={activeChat.id} />
			</>
		</div>
	);
}

const mapStateToProps = (state) => ({
	chats: state.chats,
});

const mapDispatchToProps = (dispatch) => ({
	removeChat: (chat) => dispatch(removeChat(chat)),
	fetchMessages: (chat) => dispatch(fetchChatMessages(chat)),
	setActiveChat: (chat) => dispatch(setActiveChat(chat)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
