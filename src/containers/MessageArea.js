import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';

import { fetchChatMessages } from '../redux/actions/chats';

export function MessageArea({ messages }) {
	const viewMessages = () => {
		return messages
			.map((message) => (
				<Card>
					<Card.Body>
						<p>{message.content}</p>
						<footer className="text-muted">{message.user.username}</footer>
					</Card.Body>
				</Card>
			))
			.reverse();
	};

	return (
		<div className="messages">
			{messages ? viewMessages() : null}
			<h3 className="text-muted text-center">
				This is the start of the Messages
			</h3>
		</div>
	);
}

const mapStateToProps = (state) => ({
	chats: state.chats,
});

const mapDispatchToProps = (dispatch) => ({
	fetchMessages: (chat) => dispatch(fetchChatMessages(chat)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageArea);
