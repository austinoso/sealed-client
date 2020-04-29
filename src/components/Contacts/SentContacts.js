import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { API_ROOT } from '../../constants/index';

import { setContacts } from '../../redux/actions/contacts';

function SentContacts({ contacts, setContacts }) {
	const handleClick = (id) => {
		fetch(`${API_ROOT}/contacts/${id}`, {
			method: 'DELETE',
		}).then(
			setContacts({
				...contacts,
				sent: contacts.splice(id, 1),
			})
		);
	};

	const mapContacts = () => {
		return contacts.map((contact) => (
			<div>
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

function mapStateToProps(state) {
	return {
		contacts: state.contacts.sent,
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		setContacts: (contacts) => {
			dispatch(setContacts(contacts));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SentContacts);
