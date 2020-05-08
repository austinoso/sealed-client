import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
import Navbar from '../containers/Navbar';
import { API_ROOT, HEADERS, cable } from '../constants/index';
import Button from 'react-bootstrap/Button';

export function Main({
	setChats,
	addChat,
	chats,
	addMessages,
	removeChat,
	acceptChat,
	location,
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
					addMessages(chat, [message]);
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
					if (data.action === 'DEL') {
						removeChat(data.chat);
					} else if (data.action === 'UPDATE') {
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
					<div className="top"></div>
					<div id="menu">
						<div class="menu-top">
							<Link to={'/app/contacts'}>
								<Button
									className={`btn-secondary new-chat-btn ${
										location.pathname === '/app/contacts' ? 'active' : null
									}`}
									block
								>
									Contacts{' '}
									<svg
										class="bi bi-people-fill"
										width="1.3em"
										height="1.5em"
										viewBox="0 0 16 16"
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 100-6 3 3 0 000 6zm-5.784 6A2.238 2.238 0 015 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 005 9c-4 0-5 3-5 4s1 1 1 1h4.216zM4.5 8a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
											clip-rule="evenodd"
										/>
									</svg>
								</Button>
							</Link>
							<Link to={'/app/contacts'}>
								<Button className="btn-primary new-chat-btn" block>
									Create Chat{' '}
									<svg
										class="bi bi-plus-circle-fill icon"
										width="1.3em"
										height="1.5em"
										viewBox="0 0 16 16"
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											d="M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z"
											clip-rule="evenodd"
										/>
									</svg>
								</Button>
							</Link>
						</div>
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
				<Navbar />

				<div className="main">{chats ? render() : null}</div>
			</>
		);
	} else {
		return <Redirect to={'/login'} />;
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
