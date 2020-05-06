import React, { useState, useEffect, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import MessageArea from './MessageArea';
import NewMessageForm from '../components/NewMessageForm';
import {
	removeChat,
	fetchChatMessages,
	setActiveChat,
	updateChat,
} from '../redux/actions/chats';
import { API_ROOT, HEADERS } from '../constants/index';

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

	const acceptChat = () => {
		const config = {
			method: 'PATCH',
			headers: HEADERS,
			body: JSON.stringify({ accepted: true }),
		};
		fetch(`${API_ROOT}/chats/${activeChat.id}`, config);
		updateChat(activeChat, { ...activeChat, accepted: true });
	};

	const acceptChatPrompt = () => {
		if (activeChat.initiator.username === localStorage.username) {
			return <h1>Please wait</h1>;
		} else {
			return (
				<div className="text-center">
					<Button onClick={acceptChat}>Accept Chat</Button>
					<Button onClick={deleteChat} variant="danger">
						Decline Chat
					</Button>
				</div>
			);
		}
	};

	return (
		<div className="chat">
			<>
				<div className="chat-info">
					<h1>Chat with: {chatUser()}</h1>
					<Link to="/app">
						<Button onClick={deleteChat} variant="danger" size="sm">
							Delete Chat
						</Button>
					</Link>
				</div>
				<div className="message-section">
					<MessageArea messages={activeChat.messages} />
				</div>
				{activeChat.accepted ? (
					<NewMessageForm chatId={activeChat.id} />
				) : (
					acceptChatPrompt()
				)}
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
	updateChat: (chat, newChat) => dispatch(updateChat(chat, newChat)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
