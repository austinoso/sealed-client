import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { API_ROOT } from '../constants/index';

export default function AddContactForm({ addContact }) {
	const [username, setUsername] = useState();
	const [error, setError] = useState();

	const postRequest = () => {
		const config = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
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
					setError(
						"User doesn't exist, Please make sure you're using proper case"
					);
				} else {
					addContact(contact);
				}
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setUsername('');
		postRequest();
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
					<Button variant="primary" type="submit">
						Add
					</Button>
				</InputGroup>
			</Form>
			{error ? <p>{error}</p> : null}
		</>
	);
}
