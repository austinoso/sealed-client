import React from 'react';
import AddContactForm from './AddContactForm';

export default function Welcome() {
	return (
		<div className="text-center welcome">
			<h1>Welcome {localStorage.username}!</h1>
			<p>Get started by adding a contact!</p>
			<AddContactForm />
		</div>
	);
}
