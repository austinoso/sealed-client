import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { API_ROOT, HEADERS } from '../../constants/index';

import { removeContact } from '../../redux/actions/contacts';

function SentContacts({ contacts, removeContact }) {
	const handleClick = (id) => {
		fetch(`${API_ROOT}/contacts/${id}`, {
			method: 'DELETE',
			headers: HEADERS,
		}).then(removeContact('sent', id));
	};

	const mapContacts = () => {
		return contacts.map((contact) => (
			<div>
				<h6>Sent:</h6>

				<p>
					<Button
						onClick={() => handleClick(contact.id)}
						variant="outline-danger"
						size="sm"
					>
						{contact.receiver.username} X
					</Button>
				</p>
			</div>
		));
	};

	return <div>{contacts ? mapContacts() : null}</div>;
}

const mapStateToProps = (state) => ({
	contacts: state.contacts.sent,
});

const mapDispatchToProps = (dispatch) => ({
	removeContact: (list, contactId) => dispatch(removeContact(list, contactId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SentContacts);
