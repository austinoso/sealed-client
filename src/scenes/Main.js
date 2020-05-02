import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Chat from '../containers/Chat';
import Welcome from '../components/Welcome';
import Contacts from '../containers/Contacts';

import ChatsList from '../containers/ChatsList';

export default function Main({ match }) {
	return (
		<div className="main">
			{localStorage.token ? null : <Redirect to={{ pathname: '/login' }} />}
			<div className="side-bar">
				<Link to={'/app'}>
					<h3>Hello! @{localStorage.username}</h3>
				</Link>
				<ChatsList />
				<hr></hr>
				<h5>Start a New Chat</h5>
				<Contacts />
			</div>
			<div className="app-section">
				<Route
					exact
					path={`${match.url}/chat/:chatId`}
					render={(routerProps) => <Chat {...routerProps} />}
				/>
				<Route exact path={`${match.url}/`} render={() => <Welcome />} />
			</div>
		</div>
	);
}
