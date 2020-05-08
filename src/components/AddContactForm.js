import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addContact } from '../redux/actions/contacts';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { API_ROOT, HEADERS } from '../constants/index';

function AddContactForm({ addContact, contacts }) {
	const [username, setUsername] = useState();
	const [displayMsg, setDisplayMsg] = useState();

	const postRequest = () => {
		const config = {
			method: 'POST',
			headers: HEADERS,
			body: JSON.stringify({
				contact: {
					receiver_username: username,
					sender_id: localStorage.userId,
				},
			}),
		};

		fetch(`${API_ROOT}/contacts`, config)
			.then((r) => r.json())
			.then((contact) => {
				if (contact.receiver[0] === 'must exist') {
					setDisplayMsg(
						"User doesn't exist, Please make sure you're using proper case"
					);
				} else {
					addContact('sent', contact);
					setDisplayMsg('Contact Request Sent!');
				}
			});
	};

	const validContact = () => {
		let allContacts = [];

		if (contacts.recevied) {
			allContacts = allContacts.concat(contacts.recevied);
		}
		if (contacts.current) {
			allContacts = allContacts.concat(contacts.current);
		}
		if (contacts.sent) {
			allContacts = allContacts.concat(contacts.sent);
		}

		const dupContact = allContacts.find(
			(contact) =>
				contact.receiver.username || contact.sender.username === username
		);

		if (dupContact || username === localStorage.username) {
			return false;
		} else {
			return true;
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validContact()) {
			setUsername('');
			postRequest();
		} else {
			setDisplayMsg('Invalid Contact Request');
		}
	};

	return (
		<>
			<Form onSubmit={handleSubmit}>
				<InputGroup>
					<Form.Control
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<Button className="primary-btn" variant="primary" type="submit">
						Add
					</Button>
				</InputGroup>
			</Form>
			{displayMsg ? <p>{displayMsg}</p> : null}
		</>
	);
}

const mapStateToProps = (state) => ({
	contacts: state.contacts,
});

const mapDispatchToProps = (dispatch) => ({
	addContact: (list, contact) => dispatch(addContact(list, contact)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddContactForm);
