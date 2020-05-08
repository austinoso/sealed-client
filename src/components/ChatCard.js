import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const ChatCard = ({ chat, activeChat }) => {
	console.log(activeChat);
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
			<div
				className={
					activeChat && chat.id === activeChat.id
						? 'chat-card-active'
						: 'chat-card'
				}
			>
				<h6>{chatUser().username}</h6>
				<p className="text-muted">{lastMessage()}</p>
			</div>
		</Link>
	);
};

const mapStateToProps = (state) => ({
	activeChat: state.activeChat,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps)(ChatCard);
