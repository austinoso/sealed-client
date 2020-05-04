import React, { useEffect, useLayoutEffect } from 'react';

import { connect } from 'react-redux';
import { setChats, addChat, updateChat } from '../redux/actions/chats';

import { API_ROOT, HEADERS, cable } from '../constants/index';
import { ChatCard } from '../components/ChatCard';

export const ChatsList = ({ chats, setChats, updateChat }) => {
	const fetchUser = () => {
		return fetch(`${API_ROOT}/users/${localStorage.userId}`, {
			headers: HEADERS,
		})
			.then((r) => r.json())
			.then((user) => user);
	};

	// const chatCable = cable.subscriptions.create(
	// 	{ channel: 'MessagesChannel', id: chat.id },
	// 	{
	// 		received: function (message) {
	// 			setMessages([...messages, message]);
	// 		},
	// 	}
	// );

	useEffect(async () => {
		const user = await fetchUser();
		console.log(await user.chats);
		setChats(
			await user.chats.map((chat) => {
				return {
					...chat,
					cable: cable.subscriptions.create(
						{ channel: 'MessagesChannel', id: chat.id },
						{
							received: (message) => {
								{
									updateChat(chat, {
										...chat,
										messages: [...chat.messages, message],
									});
									console.log(chats);
								}
							},
						}
					),
				};
			})
		);
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
	updateChat: (chat, newChat) => dispatch(updateChat(chat, newChat)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatsList);
