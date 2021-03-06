import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { API_ROOT } from '../constants/index';
import { Redirect } from 'react-router-dom';

export default function RegisterForm() {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(null);

	const setUser = ({ jwt, user }) => {
		localStorage.setItem('token', jwt);
		localStorage.setItem('username', user.username);
		localStorage.setItem('userId', user.id);
		setSuccess(true);
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

		fetch(`${API_ROOT}/api/v1/login`, config)
			.then((r) => r.json())
			.then((token) =>
				token.jwt ? setUser(token) : setError('Incorrect Username or Password')
			);
	};

	return (
		<>
			{success ? <Redirect to={'/app'} /> : null}

			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Control
						placeholder="Username"
						onChange={(e) => setUsername(e.target.value)}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
						type="password"
					/>
				</Form.Group>
				{error ? <p>{error}</p> : null}
				<Button className="login-btn" type="submit">
					Login
				</Button>
			</Form>
		</>
	);
}
