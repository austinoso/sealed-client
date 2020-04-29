import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Contacts from './Contacts';
import Chat from './Chat';

import { API_ROOT } from '../constants/index';

export default function ChatsList({ match }) {
	const [chats, setChats] = useState([]);
	const [activeChat, setActiveChat] = useState(null);

	useEffect(() => {
		fetch(`${API_ROOT}/users/${localStorage.userId}`)
			.then((r) => r.json())
			.then((user) => setChats(user.chats));
	}, []);

	return (
		<div>
			<div className="side-bar">
				<Contacts />
				{chats ? (
					<div>
						<h5>Current Chats</h5>
						{chats.map((chat) => (
							<Link to={`/app/${chat.id}`}>Chat: {chat.id} ></Link>
						))}
					</div>
				) : null}
			</div>

			<Route
				exact
				path={`${match.url}/:chatId`}
				render={(routerProps) => <Chat {...routerProps} />}
			/>
		</div>
	);
}
