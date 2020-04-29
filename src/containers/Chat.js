import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import actionCable from 'actioncable';

import MessageArea from './MessageArea';
import NewMessageForm from '../components/NewMessageForm';

import { API_ROOT, API_WS_ROOT } from '../constants/index';

export default function Chat({ match }) {
	const [messages, setMessages] = useState([]);

	let channel;

	useEffect(() => {
		fetch(`${API_ROOT}/chats/${match.params.chatId}`)
			.then((r) => r.json())
			.then((chat) => setMessages(chat.messages));

		console.log(messages);
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

	// channel.received(message){
	// 	console.log(message)
	// };

	function addMessage(message) {
		console.log(message);
	}

	return (
		<div>
			{messages ? (
				<div className="chats">
					<h1>Chat: {match.params.chatId}</h1>
					<MessageArea messages={messages} />
					<NewMessageForm chatId={match.params.chatId} />{' '}
				</div>
			) : (
				<Redirect to={{ pathname: '/app' }} />
			)}
		</div>
	);
}
