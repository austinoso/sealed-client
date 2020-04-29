import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';

import AddContactForm from '../components/AddContactForm';
import SentContacts from '../components/Contacts/SentContacts';
import CurrentContacts from '../components/Contacts/CurrentContacts';

import { setContacts } from '../redux/actions/contacts';
import { API_ROOT } from '../constants/index';

function Contacts({ setContacts, contacts }) {
	// const [contacts, setContacts] = useState([]);
	// const [receivedContacts, setReceivedContacts] = useState([]);
	// const [sentContacts, setSentContacts] = useState([]);

	const setData = (user) => {
		setContacts({
			current: user.contacts,
			received: user.received_requests,
			sent: user.pending_requests,
		});
	};

	useEffect(() => {
		fetch(`${API_ROOT}/users/${localStorage.userId}`)
			.then((r) => r.json())
			.then((user) => setData(user));
	}, []);

	const addContact = (contact) => {
		setContacts({
			...contacts,
			sent: [...contacts.sent, contact],
		});
	};

	const handleClick = (type, id) => {
		switch (type) {
			case 'del':
				fetch(`${API_ROOT}/contacts/${id}`, {
					method: 'DELETE',
				}).then(
					setContacts({
						...contacts,
						sent: contacts.sent.splice(id, 1),
					})
				);

				break;
			case 'accept':
				fetch(`${API_ROOT}/contacts/${id}`, {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					body: JSON.stringify({ status: true }),
				});
			case 'chat':
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
				});
				break;
		}
	};

	const mapContacts = () => {
		return contacts.current.map((contact) => (
			<div>
				<p>
					<Button
						onClick={() =>
							handleClick(
								'chat',
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

	const mapReceivedContacts = () => {
		return contacts.received.map((contact) => (
			<div>
				<p>
					{contact.sender.username}
					<Button
						onClick={() => handleClick('accept', contact.id)}
						variant="success"
						size="sm"
					>
						Accept
					</Button>
				</p>
			</div>
		));
	};

	return (
		<div>
			<h3>Hello! @{localStorage.username}</h3>
			{console.log(contacts.current)}
			<h5>Add a Contact</h5>
			<AddContactForm addContact={addContact} />
			{contacts.received && contacts.received.length >= 1 ? (
				<>
					<h5>Pending Contacts:</h5>
					<>{mapReceivedContacts()}</>
				</>
			) : null}
			<h5>Contacts:</h5>
			<CurrentContacts />
			<>
				<h5>Sent Contacts:</h5>
				<SentContacts />
			</>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		contacts: state.contacts,
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		setContacts: (contacts) => {
			dispatch(setContacts(contacts));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
