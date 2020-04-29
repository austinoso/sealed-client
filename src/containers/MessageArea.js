import React from 'react';

export default function MessageArea({ messages }) {
	const viewMessages = () => {
		return messages.map((message) => <p>{message.content}</p>).reverse();
	};

	return (
		<div className="message-area">
			{viewMessages()}
			<h3 className="text-muted">This is the start of the Messages</h3>
		</div>
	);
}
