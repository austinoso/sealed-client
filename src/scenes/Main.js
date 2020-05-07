import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';
import {
	setChats,
	addChat,
	acceptChat,
	addMessages,
	removeChat,
} from '../redux/actions/chats';

import MainView from '../containers/MainView';
import ChatsList from '../containers/ChatsList';
import { API_ROOT, HEADERS, cable } from '../constants/index';

export function Main({
	match,
	setChats,
	addChat,
	chats,
	addMessages,
	removeChat,
	acceptChat,
}) {
	const fetchUser = () => {
		return fetch(`${API_ROOT}/users/${localStorage.userId}`, {
			headers: HEADERS,
		})
			.then((r) => r.json())
			.then((user) => user);
	};

	const createChatCable = (chat) => {
		return cable.subscriptions.create(
			{ channel: 'MessagesChannel', id: chat.id },
			{
				received: (message) => {
					{
						console.log(message);
						addMessages(chat, [message]);
					}
				},
			}
		);
	};

	const fetchChats = async () => {
		const user = await fetchUser();
		if (await user.chats) {
			const chats = await user.chats.map((chat) => {
				return {
					...chat,
					cable: createChatCable(chat),
					messages: [],
					user:
						chat.initiator.username === localStorage.username
							? chat.recipient.username
							: chat.initiator.username,
				};
			});
			setChats(await chats);
		} else {
			setChats([]);
		}
	};

	const createChatsCable = () => {
		cable.subscriptions.create(
			{ channel: 'ChatsChannel' },
			{
				received: function (data) {
					console.log(data);
					if (data.action === 'DEL') {
						removeChat(data.chat);
					} else if (data.action === 'UPDATE') {
						console.log(data);
						acceptChat(data.chat);
					} else {
						addChat({
							...data.chat,
							cable: createChatCable(data.chat),
							user:
								data.chat.initiator.username === localStorage.username
									? data.chat.recipient.username
									: data.chat.initiator.username,
						});
					}
				},
			}
		);
	};

	useEffect(() => {
		if (localStorage.token) {
			createChatsCable();
			fetchChats();
		}
	}, []);

	const render = () => {
		return (
			<>
				<div className="side-bar">
					<div className="top">
						<Link to={'/app'}>
							<h3>Hello! @{localStorage.username}</h3>
						</Link>
					</div>
					<hr></hr>
					<div id="menu">
						<Link to={'/app'} className="btn btn-primary">
							Start a New Chat
						</Link>
						<div className="scroll">
							<ChatsList />
						</div>
					</div>
				</div>
				<MainView />
			</>
		);
	};

	if (localStorage.token) {
		return (
			<>
				<div className="main">{chats ? render() : null}</div>
			</>
		);
	} else {
		return (
			<>
				<Redirect to={'/login'} />
			</>
		);
	}
}

const mapStateToProps = (state) => ({
	chats: state.chats,
});

const mapDispatchToProps = (dispatch) => ({
	setChats: (chats) => dispatch(setChats(chats)),
	addChat: (chat) => dispatch(addChat(chat)),
	acceptChat: (chat) => dispatch(acceptChat(chat)),
	addMessages: (chat, messages) => dispatch(addMessages(chat, messages)),
	removeChat: (chat) => dispatch(removeChat(chat)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
