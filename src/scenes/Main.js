import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	setChats,
	addChat,
	updateChat,
	addMessages,
} from '../redux/actions/chats';
import { API_ROOT, HEADERS, cable } from '../constants/index';

import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import MainView from '../containers/MainView';
import ChatsList from '../containers/ChatsList';

export function Main({
	match,
	setChats,
	addChat,
	updateChat,
	chats,
	addMessages,
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
						addMessages(chat, [message]);
					}
				},
			}
		);
	};

	const fetchChats = async () => {
		const user = await fetchUser();
		const chats = await user.chats.map((chat) => {
			return {
				...chat,
				cable: createChatCable(chat),
				notications: 0,
				messages: [],
			};
		});
		setChats(await chats);
	};

	const createChatsCable = () => {
		cable.subscriptions.create(
			{ channel: 'ChatsChannel' },
			{
				received: function (chat) {
					addChat({ ...chat, cable: createChatCable(chat) });
				},
			}
		);
	};

	useEffect(() => {
		createChatsCable();
		fetchChats();
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
						<Button href="/app" size="sm">
							Start a New Chat
						</Button>
						<div className="scroll">
							<ChatsList />
						</div>
					</div>
				</div>
				<MainView />
			</>
		);
	};

	return (
		<div className="main">
			{localStorage.token ? null : <Redirect to={{ pathname: '/login' }} />}
			{chats ? render() : null}
		</div>
	);
}

const mapStateToProps = (state) => ({
	chats: state.chats,
});

const mapDispatchToProps = (dispatch) => ({
	setChats: (chats) => dispatch(setChats(chats)),
	addChat: (chat) => dispatch(addChat(chat)),
	updateChat: (chat, newChat) => dispatch(updateChat(chat, newChat)),
	addMessages: (chat, messages) => dispatch(addMessages(chat, messages)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
