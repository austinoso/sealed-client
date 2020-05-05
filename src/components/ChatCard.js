import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateChat } from '../redux/actions/chats';

export const ChatCard = ({ chat, activeChat }) => {
	// const [messages, setMessages] = useState(chat.messages);


	return (
		<div>
			<Link to={`/app/chat/${chat.id}`}>chat {chat.id}</Link>
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
