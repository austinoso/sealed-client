import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Button } from 'react-bootstrap';

export default function Home() {
	return (
		<div className="home text-center">
			<Jumbotron>
				<h1>Welcome to Sealed</h1>
				<p>
					{localStorage.token ? (
						<p>You're signed in!</p>
					) : (
						<p>
							<Link to="/login">Login</Link> or{' '}
							<Link to="/register">Register</Link>
						</p>
					)}
				</p>
				<p>
					<Link to="/app">
						<Button variant="primary">Start Chatting</Button>
					</Link>
				</p>
			</Jumbotron>
		</div>
	);
}
