import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import { removeChat } from '../redux/actions/chats';
import { API_ROOT, HEADERS } from '../constants/index';

export const AcceptChatPrompt = ({ chat, removeChat }) => {
	const acceptChat = () => {
		const config = {
			method: 'PATCH',
			headers: HEADERS,
			body: JSON.stringify({ accepted: true }),
		};
		fetch(`${API_ROOT}/chats/${chat.id}`, config);
	};

	const deleteChat = () => {
		fetch(`${API_ROOT}/chats/${chat.id}`, { method: 'DELETE' });
		removeChat(chat);
	};

	if (chat.initiator.username === localStorage.username) {
		return (
			<div className="accept-chat-wrapper">
				<div className="accept-chat-content">
					<h1>Please wait for {chat.user} to accept...</h1>
					<Link to="/app">
						<Button onClick={deleteChat} variant="danger">
							Cancel Chat
						</Button>
					</Link>
				</div>
			</div>
		);
	} else {
		return (
			<div className="accept-chat-content">
				<h1>{chat.user} wants to chat with you!</h1>
				<Button className="primary-btn" onClick={acceptChat}>
					Accept Chat
				</Button>
				<Link to="/app">
					<Button onClick={deleteChat} variant="danger">
						Decline Chat
					</Button>
				</Link>
			</div>
		);
	}
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
	removeChat: (chat) => dispatch(removeChat(chat)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AcceptChatPrompt);
