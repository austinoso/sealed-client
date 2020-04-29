import React from 'react';
import LoginForm from '../components/LoginForm';
import Card from 'react-bootstrap/Card';
import { Redirect } from 'react-router-dom';

export default function Register() {
	return (
		<div>
			{localStorage.token ? <Redirect to={{ pathname: '/' }} /> : null}

			<h1>Login</h1>
			<Card>
				<LoginForm />
			</Card>
		</div>
	);
}
