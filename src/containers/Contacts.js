import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

import AddContactForm from '../components/AddContactForm';

import { API_ROOT } from '../constants/index';

export default function Contacts() {
	const [contacts, setContacts] = useState([]);
	const [receivedContacts, setReceivedContacts] = useState([]);
	const [sentContacts, setSentContacts] = useState([]);

	const setData = (user) => {
		setContacts(user.contacts);
		setReceivedContacts(user.received_requests);
		setSentContacts(user.pending_requests);
	};

	useEffect(() => {
		fetch(`${API_ROOT}/users/${localStorage.userId}`)
			.then((r) => r.json())
			.then((user) => setData(user));
	}, []);

	const handleClick = (type, id) => {
		switch (type) {
			case 'del':
				fetch(`${API_ROOT}/contacts/${id}`, {
					method: 'DELETE',
				});
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
		return contacts.map((contact) => (
			<div>
				<p>
					{contact.sender.username === localStorage.username
						? contact.receiver.username
						: contact.sender.username}
					<Button
						onClick={() =>
							handleClick(
								'chat',
								contact.sender.username === localStorage.username
									? contact.receiver.id
									: contact.sender.id
							)
						}
						size="sm"
					>
						Start Chat
					</Button>
				</p>
			</div>
		));
	};

	const mapSentContacts = () => {
		return sentContacts.map((contact) => (
			<div>
				<p>
					{contact.receiver.username}
					<Button
						onClick={() => handleClick('del', contact.id)}
						variant="outline-danger"
						size="sm"
					>
						Cancel
					</Button>
				</p>
			</div>
		));
	};

	const mapReceivedContacts = () => {
		return receivedContacts.map((contact) => (
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
			<h5>Add a Contact</h5>
			<AddContactForm />
			{receivedContacts ? (
				<>
					<h5>Pending Contacts:</h5>
					<>{mapReceivedContacts()}</>
				</>
			) : null}

			<h5>Contacts:</h5>
			{mapContacts()}

			{sentContacts ? (
				<>
					<h5>Sent Contacts:</h5>
					<>{mapSentContacts()}</>
				</>
			) : null}
		</div>
	);
}
