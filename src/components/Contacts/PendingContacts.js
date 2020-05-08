import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { API_ROOT, HEADERS } from '../../constants/index';

import { addContact, removeContact } from '../../redux/actions/contacts';

function SentContacts({ contacts, addContact, removeContact }) {
	const acceptContact = (chatId) => {
		fetch(`${API_ROOT}/contacts/${chatId}`, {
			method: 'PATCH',
			headers: HEADERS,
			body: JSON.stringify({ status: true }),
		})
			.then((r) => r.json())
			.then((contact) => {
				removeContact('received', chatId);
				addContact('current', contact);
			});
	};

	const declineContact = (id) => {
		fetch(`${API_ROOT}/contacts/${id}`, {
			method: 'DELETE',
			headers: HEADERS,
		}).then(removeContact('received', id));
	};

	const mapContacts = () => {
		return contacts.map((contact) => (
			<div className="contact-card">
				<h6>{contact.sender.username}</h6>
				<p>
					<ButtonGroup>
						<Button
							className="accept-btn primary-btn"
							onClick={() => acceptContact(contact.id)}
							size="large"
						>
							<svg
								class="bi bi-check"
								width="1.2em"
								height="1.2em"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z"
									clip-rule="evenodd"
								/>
							</svg>
						</Button>
						<Button
							onClick={() => declineContact(contact.id)}
							variant="danger"
							size="sm"
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
		));
	};

	return (
		<div>
			<h3>Pending</h3>
			{contacts ? <>{mapContacts()}</> : null}
		</div>
	);
}

const mapStateToProps = (state) => ({
	contacts: state.contacts.received,
});

const mapDispatchToProps = (dispatch) => ({
	addContact: (list, contact) => dispatch(addContact(list, contact)),
	removeContact: (list, contactId) => dispatch(removeContact(list, contactId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SentContacts);
