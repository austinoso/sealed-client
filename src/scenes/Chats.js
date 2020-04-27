import React, { useState, useEffect } from 'react';
import consumer from '../services/consumer';
import { API_ROOT } from '../constants';
import Chat from '../components/Chat';
import Cable from '../components/Cable';

export default function UserChats() {
	const [chats, setChats] = useState([]);
	const [activeChat, setActiveChat] = useState(1);

	useEffect(() => {
		fetch(`${API_ROOT}/chats`)
			.then((r) => r.json())
			.then((chats) => setChats(chats));
	}, []);

	const handleClick = (id) => {
		setActiveChat(id);
	};

	const handleReceivedChat = (response) => {
		const { chat } = response;
		setChats(...chats, chat);
	};

	const handleReceivedMessage = (response) => {
		console.log(response);
		const { message } = response;
		const newChats = [...chats];
		const chat = newChats.find((chat) => (chat.id = message.chat_id));

		chat.messages = [...chat.messages, message];
		setChats(newChats);
	};

	return (
		<div>
			<ActionCableConsumer
				channel={{ channel: 'ChatsChannel' }}
				onReceived={handleReceivedChat}
			/>
			{chats.length ? (
				<Cable chats={chats} handleReceivedMessage={handleReceivedMessage} />
			) : null}
			<h2>Chats</h2>
			<ul>
				{chats.map((chat) => (
					<h3 onClick={() => handleClick(chat.id)}>{chat.id}</h3>
				))}
			</ul>
			{findActiveChat(chats, activeChat) ? (
				<div>
					<h4>Chat: {activeChat}</h4>
					<Chat chat={findActiveChat(chats, activeChat)} />
					{/* <ul>
						{getActiveChat().messages.map((message) => (
							<li>{message.content}</li>
						))}
					</ul> */}
				</div>
			) : null}
		</div>
	);

	function findActiveChat(chats, activeChat) {
		return chats.find((chat) => chat.id === activeChat);
	}
}
