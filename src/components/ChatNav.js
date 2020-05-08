import React from 'react';
import { connect } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import { removeChat } from '../redux/actions/chats';
import { API_ROOT } from '../constants/index';

export const ContactNav = ({ activeChat }) => {
	const deleteChat = () => {
		fetch(`${API_ROOT}/chats/${activeChat.id}`, { method: 'DELETE' });
		removeChat(activeChat);
	};
	return (
		<div className="chat-nav">
			<Nav.Item>
				<Nav.Link>{activeChat ? <h4>@{activeChat.user}</h4> : null}</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link>
					<Button onClick={deleteChat} variant="danger" size="sm">
						Delete Chat
					</Button>
				</Nav.Link>
			</Nav.Item>
		</div>
	);
};

const mapStateToProps = (state) => ({
	activeChat: state.activeChat,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ContactNav);
