import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setChatsState } from '../redux/actions/chats';

import Contacts from '../containers/Contacts';
import Chat from '../containers/Chat';

import { API_ROOT } from '../constants/index';

function Main({ match, chats, setChats }) {
	useEffect(() => {
		fetch(`${API_ROOT}/users/${localStorage.userId}`)
			.then((r) => r.json())
			.then((user) => {
				setChats(user.chats);
			});
	}, []);

	return (
		<div>
			<div className="side-bar">
				<Contacts />
				{chats ? (
					<div>
						<h5>Current Chats</h5>
						{chats.map((chat) => (
							<div>
								<Link to={`/app/${chat.id}`}>
									{chat.initiator.username === localStorage.username
										? chat.recipient.username
										: chat.initiator.username}{' '}
									>
								</Link>
							</div>
						))}
					</div>
				) : null}
			</div>
			<div className="chat-section">
				<Route
					exact
					path={`${match.url}/:chatId`}
					render={(routerProps) => <Chat {...routerProps} />}
				/>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		chats: state.chats,
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		setChats: (chats) => {
			dispatch(setChatsState(chats));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
