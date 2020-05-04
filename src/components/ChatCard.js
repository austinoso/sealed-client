import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { cable } from '../constants/index';
import { Link } from 'react-router-dom';

export const ChatCard = ({ chat }) => {
	// const [messages, setMessages] = useState(chat.messages);

	// useEffect(() => {
	// 	cable.subscriptions.create(
	// 		{ channel: 'MessagesChannel', id: chat.id },
	// 		{
	// 			received: function (message) {
	// 				setMessages([...messages, message]);
	// 			},
	// 		}
	// 	);
	// 	return () => {
	// 		// cleanup
	// 	};
	// }, []);

	return (
		<div>
			<Link to={`/app/chat/${chat.id}`}>chat {chat.id}</Link>
			{chat.messages && chat.messages.length ? (
				<p>{chat.messages[chat.messages.length - 1].content}</p>
			) : null}
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChatCard);
