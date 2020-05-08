import React from 'react';
import RegisterForm from '../components/RegisterForm';
import Card from 'react-bootstrap/Card';
import { Redirect, Link } from 'react-router-dom';

export default function Register() {
	return (
		<div>
			{localStorage.token ? <Redirect to={{ pathname: '/' }} /> : null}

			<Card className="login-reg text-center">
				<Card.Body>
					<h2>Sign Up</h2>
					<RegisterForm />
				</Card.Body>
			</Card>
			<p className="text-center">
				Already have an account? <Link to="/login">Sign In</Link>
			</p>
		</div>
	);
}
