import React, { useEffect, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { API_ROOT, HEADERS, cable } from '../constants/index';
import { addChat } from '../redux/actions/chats';

import { ChatCard } from '../components/ChatCard';

export const ChatsList = ({ chats }) => {
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
	addChat: (chat) => dispatch(addChat(chat)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatsList);
