import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { API_ROOT, HEADERS } from '../../constants/index';

import { setContacts } from '../../redux/actions/contacts';
import { removeContact } from '../../redux/actions/contacts';
import { Redirect } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function SentContacts({ contacts, removeContact, chats }) {
	const [redirect, setRedirect] = useState(null);

	const startChat = async (user) => {
		const userChat = chats.find((chat) => chat.user === user.username);
		if (userChat) {
			setRedirect(userChat.id);
		} else {
			fetch(`${API_ROOT}/chats`, {
				method: 'POST',
				headers: HEADERS,
				body: JSON.stringify({
					chat: {
						initiator_id: localStorage.userId,
						recipient_id: user.id,
					},
				}),
			})
				.then((r) => r.json())
				.then((chat) => setRedirect(chat.id));
		}
	};

	const removeFromContacts = (id) => {
		fetch(`${API_ROOT}/contacts/${id}`, {
			method: 'DELETE',
			headers: HEADERS,
		}).then(removeContact('current', id));
	};

	const contactUser = (contact) => {
		return contact.sender.username === localStorage.username
			? contact.receiver
			: contact.sender;
	};

	const mapContacts = () => {
		return contacts.map((contact) => (
			<>
				<div className="contact-card">
					{contactUser(contact).username}
					<p>
						<ButtonGroup className="contact-btns">
							<Button
								className="primary-btn"
								size="large"
								onClick={() => startChat(contactUser(contact))}
							>
								<svg
									class="bi bi-chat-fill"
									width="1.2em"
									height="1.2em"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 008 15z" />
								</svg>
							</Button>
							<Button
								size="sm"
								variant="danger"
								onClick={() => {
									removeFromContacts(contact.id);
								}}
							>
								<svg
									class="bi bi-x"
									width="1.2em"
									height="1.2em"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z"
										clip-rule="evenodd"
									/>
									<path
										fill-rule="evenodd"
										d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z"
										clip-rule="evenodd"
									/>
								</svg>
							</Button>
						</ButtonGroup>
					</p>
				</div>
				<hr />
			</>
		));
	};

	return (
		<div>
			{redirect ? <Redirect to={`/app/chat/${redirect}`} /> : null}
			{contacts ? mapContacts() : null}
		</div>
	);
}

function mapStateToProps(state) {
	return {
		contacts: state.contacts.current,
		chats: state.chats,
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		setContacts: (contacts) => {
			dispatch(setContacts(contacts));
		},
		removeContact: (list, chatId) => {
			dispatch(removeContact(list, chatId));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SentContacts);
