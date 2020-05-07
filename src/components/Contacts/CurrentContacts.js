import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { API_ROOT, HEADERS } from '../../constants/index';

import { setContacts } from '../../redux/actions/contacts';
import { removeContact } from '../../redux/actions/contacts';
import { Redirect } from 'react-router-dom';

function SentContacts({ contacts, removeContact, chats }) {
	const [redirect, setRedirect] = useState(null);

	const startChat = async (user) => {
		const userChat = chats.find((chat) => chat.user === user.username);
		if (userChat) {
			setRedirect(userChat.id);
		} else {
			fetch(`${API_ROOT}/chats`, {
				method: 'POST',
				headers: HEADERS,
				body: JSON.stringify({
					chat: {
						initiator_id: localStorage.userId,
						recipient_id: user.id,
					},
				}),
			})
				.then((r) => r.json())
				.then((chat) => setRedirect(chat.id));
		}
	};

	const removeFromContacts = (id) => {
		fetch(`${API_ROOT}/contacts/${id}`, {
			method: 'DELETE',
			headers: HEADERS,
		}).then(removeContact('current', id));
	};

	const contactUser = (contact) => {
		return contact.sender.username === localStorage.username
			? contact.receiver
			: contact.sender;
	};

	const mapContacts = () => {
		return contacts.map((contact) => (
			<div>
				<h6>{contactUser(contact).username}</h6>
				<p>
					<Button size="sm" onClick={() => startChat(contactUser(contact))}>
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

	return (
		<div>
			{redirect ? <Redirect to={`/app/chat/${redirect}`} /> : null}
			{contacts ? mapContacts() : null}
		</div>
	);
}

function mapStateToProps(state) {
	return {
		contacts: state.contacts.current,
		chats: state.chats,
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		setContacts: (contacts) => {
			dispatch(setContacts(contacts));
		},
		removeContact: (list, chatId) => {
			dispatch(removeContact(list, chatId));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SentContacts);
