import React from 'react';
import Card from 'react-bootstrap/Card';

export default function MessageArea({ messages }) {
	const viewMessages = () => {
		return messages
			.map((message) => (
				<Card>
					<Card.Body>
						<p>{message.content}</p>
						<footer className="text-muted">{message.user.username}</footer>
					</Card.Body>
				</Card>
			))
			.reverse();
	};

	return (
		<div className="message-area">
			{viewMessages()}
			<h3 className="text-muted text-center">
				This is the start of the Messages
			</h3>
		</div>
	);
}
