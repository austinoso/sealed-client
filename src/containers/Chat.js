import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Redirect } from 'react-router-dom';
import actionCable from 'actioncable';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

import MessageArea from './MessageArea';
import NewMessageForm from '../components/NewMessageForm';
import { removeChat } from '../redux/actions/chats';

import { API_ROOT, HEADERS, cable } from '../constants/index';

function Chat({ match, removeChat, chats }) {
	const [chat, setChat] = useState(match.params.chatId);
	const [messages, setMessages] = useState([]);

	// const chat = ;s
	// console.log
	// function findChat() {
	// 	setChat(chats.find((chat) => chat.id == match.params.chatId));
	// }

	// useEffect(() => {
	// 	findChat();
	// }, []);

	// useLayoutEffect(() => {
	// fetch(`${API_ROOT}/chats/${match.params.chatId}`, {
	// 	headers: HEADERS,
	// })
	// 	.then((r) => r.json())
	// 	.then((chat) => {
	// 		if (!chat.error) {
	// 			setChat({
	// 				id: chat.id,
	// 				initiator: chat.initiator.username,
	// 				recipient: chat.recipient.username,
	// 			});
	// 			setMessages(chat.messages);
	// 		} else {
	// 			setChat(chat);
	// 		}
	// 	});

	// console.log(cable.subscriptions);

	// const messagesCable = cable.subscriptions.create(
	// 	{ channel: 'MessagesChannel', id: match.params.chatId },
	// 	{
	// 		received: function (message) {
	// 			setMessages([...messages, message]);
	// 		},
	// 	}
	// );
	// return () => {
	// 	cable.subscriptions.remove(messagesCable);
	// };
	// }, [match.params.chatId]);

	// useLayoutEffect(() => {
	// 	const messagesCable = cable.subscriptions.create(
	// 		{ channel: 'MessagesChannel', id: match.params.chatId },
	// 		{
	// 			received: function (message) {
	// 				setMessages([...messages, message]);
	// 			},
	// 		}
	// 	);
	// 	return () => {
	// 		cable.subscriptions.remove(messagesCable);
	// 	};
	// });

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

	function currentChat() {
		return chats.find((chat) => chat.id == chat);
	}

	return (
		<div className="chat">
			<h1>CHAT</h1>
			{currentChat() ? console.log(currentChat()) : console.log(currentChat())}
			{/* {chat ? (
				<>
					{chat.error ? <Redirect to={{ pathname: '/app' }} /> : null}
					<div className="chat-info">
						<h1>Chat with: {chatUser()}</h1>
						<Button href="/app" onClick={deleteChat} variant="danger" size="sm">
							Delete Chat
						</Button>
					</div>
					<div className="message-section">
						<MessageArea messages={messages} />
					</div>
					<NewMessageForm chatId={chat.id} />
				</>
			) : null} */}
		</div>
	);
}

const mapStateToProps = (state) => ({
	chats: state.chats,
});

function mapDispatchToPross(dispatch) {
	return {
		removeChat: (chat) => {
			dispatch(removeChat(chat));
		},
	};
}

export default connect(mapStateToProps, mapDispatchToPross)(Chat);
