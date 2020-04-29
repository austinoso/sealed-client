import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';

import AddContactForm from '../components/AddContactForm';

import { API_ROOT } from '../constants/index';

function Contacts({ username }) {
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

	const handleClick = (type, item) => {
		switch (type) {
			case 'del':
				fetch(`${API_ROOT}/contacts/${item.id}`, {
					method: 'DELETE',
				});

				break;
			case 'accept':
				fetch(`${API_ROOT}/contacts/${item.id}`, {
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
							recipient_id: item.id,
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
					<Button
						onClick={() =>
							handleClick(
								'chat',
								contact.sender.username === localStorage.username
									? contact.receiver
									: contact.sender
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

	const mapSentContacts = () => {
		return sentContacts.map((contact) => (
			<div>
				<p>
					<Button
						onClick={() => handleClick('del', contact)}
						variant="outline-danger"
						size="sm"
					>
						{contact.receiver.username} X
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
						onClick={() => handleClick('accept', contact)}
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
			<h3>Hello! @{username}</h3>

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

function mapStateToProps(state) {
	return {
		username: state.username,
	};
}

export default connect(mapStateToProps)(Contacts);
