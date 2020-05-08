import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateChat } from '../redux/actions/chats';

import Card from 'react-bootstrap/Card';

export const ChatCard = ({ chat, activeChat }) => {
	const chatUser = () => {
		return chat.initiator.username === localStorage.username
			? chat.recipient
			: chat.initiator;
	};

	const lastMessage = () => {
		if (chat.messages && chat.messages.length) {
			return chat.messages[chat.messages.length - 1].content;
		} else if (chat.last_message) {
			return chat.last_message.content;
		}
	};

	return (
		<Link to={`/app/chat/${chat.id}`}>
			<div className="chat-card">
				<h6>{chatUser().username}</h6>
				<p className="text-muted">{lastMessage()}</p>
			</div>
		</Link>
	);
};

const mapStateToProps = (state) => ({
	activeChat: state.activeChat,
});

const mapDispatchToProps = (dispatch) => ({
	updateChat: (chat, newChat) => dispatch(updateChat(chat, newChat)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatCard);
