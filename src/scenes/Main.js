import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Chat from '../containers/Chat';
import Welcome from '../components/Welcome';
import ChatsList from '../containers/ChatsList';

export default function Main({ match }) {
	return (
		<div className="main">
			{localStorage.token ? null : <Redirect to={{ pathname: '/login' }} />}
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
