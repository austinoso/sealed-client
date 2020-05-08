import React, { useEffect, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { API_ROOT, HEADERS, cable } from '../constants/index';
import { addChat } from '../redux/actions/chats';

import { ChatCard } from '../components/ChatCard';

export const ChatsList = ({ chats }) => {
	// const orderedChats = () => {
	// 	return [...chats].sort((a, b) => {
	// 		if (a.messages.length && b.messages.length) {
	// 			console.log(a);
	// 			return (
	// 				Date.parse(a.messages[0].created_at) -
	// 				Date.parse(b.messages[0].created_at)
	// 			);
	// 		}
	// 	});
	// };

	return (
		<div>
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
	addChat: (chat) => dispatch(addChat(chat)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatsList);
