import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { API_ROOT, HEADERS } from '../../constants/index';

import { setContacts } from '../../redux/actions/contacts';
import { addChat } from '../../redux/actions/chats';
import { removeContact } from '../../redux/actions/contacts';

function SentContacts({ contacts, addChat, removeContact }) {
	const startChat = (id) => {
		fetch(`${API_ROOT}/chats`, {
			method: 'POST',
			headers: HEADERS,
			body: JSON.stringify({
				chat: {
					initiator_id: localStorage.userId,
					recipient_id: id,
				},
			}),
		});
		// .then((r) => r.json())
		// .then((chat) => addChat(chat));
	};

	const removeFromContacts = (id) => {
		fetch(`${API_ROOT}/contacts/${id}`, {
			method: 'DELETE',
			headers: HEADERS,
		}).then(removeContact('current', id));
	};

	const contactUser = (contact) => {
		return contact.sender.username === localStorage.username
			? contact.receiver.username
			: contact.sender.username;
	};

	const mapContacts = () => {
		return contacts.map((contact) => (
			<div>
				<h6>{contactUser(contact)}</h6>
				<p>
					<Button
						size="sm"
						onClick={() =>
							startChat(
								contact.sender.username === localStorage.username
									? contact.receiver.id
									: contact.sender.id
							)
						}
					>
						Start Chat
					</Button>
					<Button
						size="sm"
						variant="danger"
						onClick={() => {
							removeFromContacts(contact.id);
						}}
					>
						Remove Contact
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
		addChat: (chat) => {
			dispatch(addChat(chat));
		},
		removeContact: (list, chatId) => {
			dispatch(removeContact(list, chatId));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SentContacts);
