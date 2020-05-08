import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import { API_ROOT, HEADERS } from '../constants/index';

export default function NewMessageForm({ chat }) {
	const [message, setMessage] = useState();

	const postMessage = () => {
		const config = {
			method: 'POST',
			headers: HEADERS,
			body: JSON.stringify({
				message: {
					chat_id: chat.id,
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
		setMessage('');
	};

	return (
		<div className="message-form">
			<Form onSubmit={handleSubmit}>
				<InputGroup controlId="formNewMessage">
					<Form.Control
						type="textarea"
						placeholder={`Message @${chat.user}`}
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
				</InputGroup>
			</Form>
		</div>
	);
}
