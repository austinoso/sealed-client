import React from 'react';
import AddContactForm from './AddContactForm';
import Contacts from '../containers/Contacts';
import Button from 'react-bootstrap/Button';

export default function Welcome() {
	const logout = () => {
		localStorage.clear();
	};

	return (
		<div className="text-center welcome">
			<h1>Welcome {localStorage.username}!</h1>
			<p>Get started by adding a contact!</p>
			<AddContactForm />
			<Contacts />

			<Button onClick={logout}>Log Out</Button>
		</div>
	);
}
