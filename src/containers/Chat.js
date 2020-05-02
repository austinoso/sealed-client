import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Redirect } from 'react-router-dom';
import actionCable from 'actioncable';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

import MessageArea from './MessageArea';
import NewMessageForm from '../components/NewMessageForm';
import { removeChat } from '../redux/actions/chats';

import { API_ROOT, API_WS_ROOT, HEADERS } from '../constants/index';

function Chat({ match, removeChat }) {
	const [chat, setChat] = useState(null);
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		fetch(`${API_ROOT}/chats/${match.params.chatId}`, {
			headers: HEADERS,
		})
			.then((r) => r.json())
			.then((chat) => {
				if (!chat.error) {
					setChat({
						id: chat.id,
						initiator: chat.initiator.username,
						recipient: chat.recipient.username,
					});
					setMessages(chat.messages);
				} else {
					setChat(chat);
				}
			});
	}, [match.params.chatId]);

	useLayoutEffect(() => {
		const cable = actionCable.createConsumer(API_WS_ROOT);

		cable.subscriptions.create(
			{ channel: 'ChatsChannel', id: match.params.chatId },
			{
				received: function (message) {
					setMessages([...messages, message]);
				},
			}
		);
		return () => {
			cable.disconnect();
		};
	});

	function deleteChat() {
		fetch(`${API_ROOT}/chats/${chat.id}`, {
			method: 'DELETE',
			headers: HEADERS,
		});

		removeChat(chat);
	}

	function chatUser() {
		return chat.initiator === localStorage.username
			? chat.recipient
			: chat.initiator;
	}

	function chatUsers() {
		return [chat.initiator, chat.recipient];
	}

	return (
		<div className="chat">
			{chat ? (
				<>
					{chat.error ? <Redirect to={{ pathname: '/app' }} /> : null}
					{chatUsers().includes(localStorage.username) ? null : (
						<Redirect to={{ pathname: '/app' }} />
					)}

					<h1>Chat with: {chatUser()}</h1>
					<div className="message-section">
						<MessageArea messages={messages} />
					</div>
					<NewMessageForm chatId={chat.id} />
					<Button href="/app" onClick={deleteChat} variant="danger" size="sm">
						Delete Chat
					</Button>
				</>
			) : null}
		</div>
	);
}

function mapDispatchToPross(dispatch) {
	return {
		removeChat: (chat) => {
			dispatch(removeChat(chat));
		},
	};
}

export default connect(null, mapDispatchToPross)(Chat);
