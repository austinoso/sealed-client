import React from 'react';
import { connect } from 'react-redux';
import { addChat } from '../redux/actions/chats';

import ChatCard from '../components/ChatCard';

export const ChatsList = ({ chats }) => {
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
	activeChat: state.activeChat,
});

const mapDispatchToProps = (dispatch) => ({
	addChat: (chat) => dispatch(addChat(chat)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatsList);
