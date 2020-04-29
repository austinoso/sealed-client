import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { API_ROOT } from '../constants/index';

export default function AddContactForm() {
	const [username, setUsername] = useState();

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

		fetch(`${API_ROOT}/contacts`, config);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		postRequest();
	};

	return (
		<Form onSubmit={handleSubmit}>
			<InputGroup controlId="formNewMessage">
				<Form.Control
					placeholder="Username"
					onChange={(e) => setUsername(e.target.value)}
				/>
				<Button variant="primary" type="submit">
					Add
				</Button>
			</InputGroup>
		</Form>
	);
}
