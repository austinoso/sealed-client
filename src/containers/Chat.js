import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Redirect } from 'react-router-dom';
import actionCable from 'actioncable';

import MessageArea from './MessageArea';
import NewMessageForm from '../components/NewMessageForm';

import { API_ROOT, API_WS_ROOT } from '../constants/index';
import Button from 'react-bootstrap/Button';

export default function Chat({ match }) {
	const [chat, setChat] = useState(null);
	const [messages, setMessages] = useState([]);

	let channel;

	useEffect(() => {
		fetch(`${API_ROOT}/chats/${match.params.chatId}`)
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

		channel = cable.subscriptions.create(
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
		fetch(`${API_ROOT}/chats/${chat.id}`, { method: 'DELETE' });
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
		<div>
			{chat ? (
				<div className="chats">
					{chat.error ? <Redirect to={{ pathname: '/app' }} /> : null}
					{chatUser().includes(localStorage.username) ? null : (
						<Redirect to={{ pathname: '/app' }} />
					)}
					<h1>Chat with: {chatUser()}</h1>
					<MessageArea messages={messages} />
					<NewMessageForm chatId={chat.id} />
					<Button onClick={deleteChat} variant="danger" size="sm">
						Delete Chat
					</Button>
				</div>
			) : null}
		</div>
	);
}
