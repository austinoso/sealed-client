import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateChat } from '../redux/actions/chats';

export const ChatCard = ({ chat, activeChat }) => {
	const chatUser = () => {
		return chat.initiator.username === localStorage.username
			? chat.recipient
			: chat.initiator;
	};

	return (
		<div>
			<Link to={`/app/chat/${chat.id}`}>{chatUser().username}</Link>
			{chat.messages && chat.messages.length ? (
				<p>{chat.messages.length}</p>
			) : null}
		</div>
	);
};

const mapStateToProps = (state) => ({
	activeChat: state.activeChat,
});

const mapDispatchToProps = (dispatch) => ({
	updateChat: (chat, newChat) => dispatch(updateChat(chat, newChat)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatCard);
