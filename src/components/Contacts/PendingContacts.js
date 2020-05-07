import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { API_ROOT, HEADERS } from '../../constants/index';

import { addContact, removeContact } from '../../redux/actions/contacts';

function SentContacts({ contacts, addContact, removeContact }) {
	const acceptContact = (chatId) => {
		fetch(`${API_ROOT}/contacts/${chatId}`, {
			method: 'PATCH',
			headers: HEADERS,
			body: JSON.stringify({ status: true }),
		})
			.then((r) => r.json())
			.then((contact) => {
				removeContact('received', chatId);
				addContact('current', contact);
			});
	};

	const declineContact = (id) => {
		fetch(`${API_ROOT}/contacts/${id}`, {
			method: 'DELETE',
			headers: HEADERS,
		}).then(removeContact('received', id));
	};

	const mapContacts = () => {
		return contacts.map((contact) => (
			<div>
				<h6>Pending Requests:</h6>
				{console.log(contact)}
				<p>
					{contact.sender.username}
					<Button
						onClick={() => acceptContact(contact.id)}
						variant="success"
						size="sm"
					>
						Accept
					</Button>
					<Button
						onClick={() => declineContact(contact.id)}
						variant="danger"
						size="sm"
					>
						Decline
					</Button>
				</p>
			</div>
		));
	};

	return <div>{contacts ? mapContacts() : null}</div>;
}

const mapStateToProps = (state) => ({
	contacts: state.contacts.received,
});

const mapDispatchToProps = (dispatch) => ({
	addContact: (list, contact) => dispatch(addContact(list, contact)),
	removeContact: (list, contactId) => dispatch(removeContact(list, contactId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SentContacts);
