import React, { useEffect } from 'react';
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
	setActiveChat,
} from '../redux/actions/chats';
import { API_ROOT } from '../constants/index';

function Chat({ match, chats, fetchMessages, setActiveChat }) {
	const activeChat = chats.find(
		(chat) => chat.id === parseInt(match.params.chatId)
	);

	useEffect(() => {
		setActiveChat(activeChat);
		if (!activeChat.messages.length) fetchMessages(activeChat);
	}, [match.params.chatId]);

	const deleteChat = () => {
		fetch(`${API_ROOT}/chats/${activeChat.id}`, { method: 'DELETE' });
		removeChat(activeChat);
	};

	if (activeChat) {
		return (
			<div className="chat">
				{activeChat.accepted ? (
					<>
						<div className="message-section">
							<MessageArea messages={activeChat.messages} />
						</div>
						<div className="message-form">
							<NewMessageForm chat={activeChat} />
						</div>
					</>
				) : (
					<>
						<AcceptChatPrompt chat={activeChat} />
						<div className="message-section">
							<MessageArea messages={activeChat.messages} />
						</div>
						<div className="message-form">
							<NewMessageForm chat={activeChat} />
						</div>
					</>
				)}
			</div>
		);
	} else {
		return <Redirect to="/app" />;
	}
}

const mapStateToProps = (state) => ({
	chats: state.chats,
});

const mapDispatchToProps = (dispatch) => ({
	removeChat: (chat) => dispatch(removeChat(chat)),
	fetchMessages: (chat) => dispatch(fetchChatMessages(chat)),
	updateChat: (chat, newChat) => dispatch(updateChat(chat, newChat)),
	setActiveChat: (chat) => dispatch(setActiveChat(chat)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
