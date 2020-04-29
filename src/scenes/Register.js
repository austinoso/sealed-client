import React from 'react';
import RegisterForm from '../components/RegisterForm';
import Card from 'react-bootstrap/Card';

export default function Register() {
	return (
		<div>
			<Card>
				<h1>Register</h1>
				<RegisterForm />
			</Card>
		</div>
	);
}
