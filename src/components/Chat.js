import React, { useState, useEffect } from 'react';
// import consumer from '../services/consumer';
import { API_ROOT, API_WS_ROOT } from '../constants/index';
import actionCable from 'actioncable';

export default function Chat({ id }) {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		fetch(`${API_ROOT}/chats/${id}`)
			.then((r) => r.json())
			.then((chat) => setMessages(chat.messages));
	}, []);

	const cable = actionCable.createConsumer(API_WS_ROOT);

	const channel = cable.subscriptions.create(
		{ channel: 'ChatsChannel', id: 1 },
		{
			received: function (data) {
				console.log('hit');
				setMessages([...messages, data]);
			},
		}
	);

	// const chatChannel = consumer.subscriptions.create(
	// 	{ channel: 'ChatChannel', id: id },
	// 	{
	// 		received(data) {
	// 			setMessages([...messages, data]);
	// 		},
	// 	}
	// );

	// const sendMessage = (e) => {
	// 	chatChannel.send(data);
	// };

	return (
		<div>
			<ul>
				{messages.map((message) => (
					<li>{message.content}</li>
				))}
			</ul>
		</div>
	);
}
