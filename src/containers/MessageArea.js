import React from 'react';
import { connect } from 'react-redux';

import { fetchChatMessages } from '../redux/actions/chats';

export function MessageArea({ messages, activeChat }) {
	const messageDate = (createdAt) => {
		const date = new Date(createdAt);

		var newDate = new Date(
			date.getTime() + date.getTimezoneOffset() * 60 * 1000
		);

		var offset = date.getTimezoneOffset() / 60;
		var hours = date.getHours();

		newDate.setHours(hours - offset);

		return newDate.toLocaleString().split(' ')[1];
	};

	const viewMessages = () => {
		return messages
			.map((message) => (
				<div className="message-card">
					<p>
						<strong className="chat-user">{message.user.username}</strong>{' '}
						<span className="text-muted message-time">
							{messageDate(message.created_at)}
						</span>
					</p>
					<p className="message-content">{message.content}</p>
				</div>
			))
			.reverse();
	};

	return (
		<div className="messages">
			{messages ? viewMessages() : null}
			<h4 className="text-muted text-center">
				This is the beginning of your message history with{' '}
				{activeChat ? activeChat.user : null}
			</h4>
		</div>
	);
}

const mapStateToProps = (state) => ({
	chats: state.chats,
	activeChat: state.activeChat,
});

const mapDispatchToProps = (dispatch) => ({
	fetchMessages: (chat) => dispatch(fetchChatMessages(chat)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageArea);
