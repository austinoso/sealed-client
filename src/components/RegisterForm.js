import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { API_ROOT } from '../constants/index';

export default function RegisterForm() {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();

	const setUser = ({ jwt, user }) => {
		localStorage.setItem('token', jwt);
		localStorage.setItem('username', user.username);
		localStorage.setItem('userId', user.id);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const config = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				user: {
					username,
					password,
				},
			}),
		};

		fetch(`${API_ROOT}/api/v1/users`, config)
			.then((r) => r.json())
			.then((token) =>
				token.jwt ? setUser(token) : console.log('failed to create user')
			);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Control
				placeholder="Username"
				onChange={(e) => setUsername(e.target.value)}
			/>
			<Form.Control
				placeholder="Password"
				onChange={(e) => setPassword(e.target.value)}
			/>
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
}
