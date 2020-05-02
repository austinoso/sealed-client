import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { API_ROOT, HEADERS } from '../constants/index';

export default function NewMessageForm({ chatId }) {
	const [message, setMessage] = useState();

	const postMessage = () => {
		const config = {
			method: 'POST',
			headers: HEADERS,
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
		<div className="message-form">
			<Form onSubmit={handleSubmit}>
				<InputGroup controlId="formNewMessage">
					<Form.Control
						type="textarea"
						placeholder="New Message"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<Button type="submit" variant="primary">
						Submit
					</Button>
				</InputGroup>
			</Form>
		</div>
	);
}
