import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { setChats } from '../redux/actions/chats';

import { API_ROOT, HEADERS } from '../constants/index';

export const ChatsList = ({ chats, setChats }) => {
	useEffect(() => {
		fetch(`${API_ROOT}/users/${localStorage.userId}`, { headers: HEADERS })
			.then((r) => r.json())
			.then((user) => {
				setChats(user.chats);
			});
	}, []);

	return (
		<div>
			<h4>Current Chats</h4>
			{chats && chats.length ? (
				<div>
					{chats.map((chat) => (
						<div>
							<Link to={`/app/chat/${chat.id}`}>
								{chat.initiator.username === localStorage.username
									? chat.recipient.username
									: chat.initiator.username}
								>
							</Link>
						</div>
					))}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatsList);
