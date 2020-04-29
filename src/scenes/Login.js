import React from 'react';
import LoginForm from '../components/LoginForm';
import Card from 'react-bootstrap/Card';

export default function Register() {
	return (
		<div>
			<h1>Login</h1>
			<Card>
				<LoginForm />
			</Card>
		</div>
	);
}
