import React, { useState, useEffect, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Link, Redirect } from 'react-router-dom';
import MessageArea from './MessageArea';
import NewMessageForm from '../components/NewMessageForm';
import AcceptChatPrompt from '../components/AcceptChatPrompt';
import {
	removeChat,
	fetchChatMessages,
	updateChat,
} from '../redux/actions/chats';
import { API_ROOT } from '../constants/index';

function Chat({ match, chats, fetchMessages }) {
	const activeChat = chats.find(
		(chat) => chat.id === parseInt(match.params.chatId)
	);

	useEffect(() => {
		if (!activeChat.messages.length) fetchMessages(activeChat);
	}, [match.params.chatId]);

	const deleteChat = () => {
		fetch(`${API_ROOT}/chats/${activeChat.id}`, { method: 'DELETE' });
		removeChat(activeChat);
	};

	return (
		<div className="chat">
			{activeChat ? null : <Redirect to="/app" />}
			<>
				<div className="chat-info">
					<h1>Chat with: {activeChat.user}</h1>
					<Link to="/app">
						<Button onClick={deleteChat} variant="danger" size="sm">
							Delete Chat
						</Button>
					</Link>
				</div>

				{activeChat.accepted ? (
					<>
						<div className="message-section">
							<MessageArea messages={activeChat.messages} />
						</div>
						<NewMessageForm chatId={activeChat.id} />
					</>
				) : (
					<AcceptChatPrompt chat={activeChat} />
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
	updateChat: (chat, newChat) => dispatch(updateChat(chat, newChat)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
