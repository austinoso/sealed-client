import React from 'react';
import LoginForm from '../components/LoginForm';
import Card from 'react-bootstrap/Card';
import { Redirect, Link } from 'react-router-dom';

export default function Register() {
	return (
		<div>
			{localStorage.token ? <Redirect to={{ pathname: '/' }} /> : null}

			<Card className="login-reg text-center">
				<Card.Body>
					<h2>Sign In</h2>
					<LoginForm />
				</Card.Body>
			</Card>
			<p className="text-center">
				Don't have an account? <Link to="/register">Register</Link>
			</p>
		</div>
	);
}
