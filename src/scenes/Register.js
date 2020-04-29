import React from 'react';
import RegisterForm from '../components/RegisterForm';
import Card from 'react-bootstrap/Card';
import { Redirect } from 'react-router-dom';

export default function Register() {
	return (
		<div>
			{localStorage.token ? <Redirect to={{ pathname: '/' }} /> : null}
			<Card>
				<h1>Register</h1>
				<RegisterForm />
			</Card>
		</div>
	);
}
