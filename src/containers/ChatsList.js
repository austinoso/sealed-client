import React, { useEffect, useLayoutEffect } from 'react';

import { connect } from 'react-redux';
import { setChats, addChat } from '../redux/actions/chats';

import { API_ROOT, HEADERS, cable } from '../constants/index';
import { ChatCard } from '../components/ChatCard';

export const ChatsList = ({ chats, setChats }) => {
	useEffect(() => {
		fetch(`${API_ROOT}/users/${localStorage.userId}`, { headers: HEADERS })
			.then((r) => r.json())
			.then((user) => {
				console.log(user.chats);
				setChats(user.chats);
			});
	}, []);

	// useLayoutEffect(() => {
	// 	const chatsCable = cable.subscriptions.create(
	// 		{ channel: 'ChatsChannel' },
	// 		{
	// 			received: function (chat) {
	// 				addChat(chat);
	// 			},
	// 		}
	// 	);
	// 	return () => {
	// 		cable.subscriptions.remove(chatsCable);
	// 	};
	// });

	return (
		<div>
			<h4>Current Chats</h4>
			{chats && chats.length ? (
				<div>
					{chats.map((chat) => (
						<ChatCard chat={chat} />

						// <div>
						// 	<Link to={`/app/chat/${chat.id}`}>
						// 		{chat.initiator.username === localStorage.username
						// 			? chat.recipient.username
						// 			: chat.initiator.username}
						// 		>
						// 	</Link>
						// </div>
					))}
					{console.log(cable.subscriptions)}
				</div>
			) : (
				<>
					<p>No current chats</p>
				</>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	chats: state.chats,
});

const mapDispatchToProps = (dispatch) => ({
	setChats: (chats) => dispatch(setChats(chats)),
	addChat: (chat) => dispatch(addChat(chat)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatsList);
