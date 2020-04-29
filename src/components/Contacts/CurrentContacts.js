import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { API_ROOT } from '../../constants/index';

import { setContacts } from '../../redux/actions/contacts';
import { setChatsState, addChat } from '../../redux/actions/chats';

function SentContacts({ contacts, setChats }) {
	const handleClick = (id) => {
		fetch(`${API_ROOT}/chats/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				chat: {
					initiator_id: localStorage.userId,
					recipient_id: id,
				},
			}),
		})
			.then((r) => r.json())
			.then((chat) => setChats(chat));
	};

	const mapContacts = () => {
		return contacts.map((contact) => (
			<div>
				<p>
					<Button
						onClick={() =>
							handleClick(
								contact.sender.username === localStorage.username
									? contact.receiver.id
									: contact.sender.id
							)
						}
					>
						{contact.sender.username === localStorage.username
							? contact.receiver.username
							: contact.sender.username}
					</Button>
				</p>
			</div>
		));
	};

	return <div>{contacts ? mapContacts() : null}</div>;
}

function mapStateToProps(state) {
	return {
		contacts: state.contacts.current,
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		setContacts: (contacts) => {
			dispatch(setContacts(contacts));
		},
		setChats: (chat) => {
			dispatch(addChat(chat));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SentContacts);
