import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { API_ROOT } from '../constants/index';

export default function NewMessageForm({ chatId }) {
	const [message, setMessage] = useState();

	const postMessage = () => {
		const config = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				message: {
					chat_id: chatId,
					user_id: localStorage.userId,
					content: message,
				},
			}),
		};

		fetch(`${API_ROOT}/messages`, config);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		postMessage();
		setMessage(' ');
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group controlId="formNewMessage">
				<Form.Control
					type="textarea"
					placeholder="New Message"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
			</Form.Group>
			<Button variant="primary">Submit</Button>
		</Form>
	);
}
