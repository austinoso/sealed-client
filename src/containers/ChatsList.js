import React, { useEffect, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { API_ROOT, HEADERS, cable } from '../constants/index';
import { addChat } from '../redux/actions/chats';

import { ChatCard } from '../components/ChatCard';

export const ChatsList = ({ chats }) => {
	// const orderedChats = chats.sort(chat => chat.)

	return (
		<div>
			<h4>Current Chats</h4>

			<div>
				{chats.map((chat) => (
					<ChatCard chat={chat} />
				))}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	chats: state.chats,
});

const mapDispatchToProps = (dispatch) => ({
	// setChats: (chats) => dispatch(setChats(chats)),
	addChat: (chat) => dispatch(addChat(chat)),
	// updateChat: (chat, newChat) => dispatch(updateChat(chat, newChat)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatsList);
