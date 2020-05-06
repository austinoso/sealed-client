import React, { useEffect } from 'react';
import SentContacts from '../components/Contacts/SentContacts';
import CurrentContacts from '../components/Contacts/CurrentContacts';

import { connect } from 'react-redux';
import { setContacts, addContact } from '../redux/actions/contacts';

import { API_ROOT, HEADERS, cable } from '../constants/index';
import PendingContacts from '../components/Contacts/PendingContacts';

function Contacts({ setContacts, contacts, addContact }) {
	const setData = (user) => {
		setContacts({
			current: user.contacts,
			received: user.received_requests,
			sent: user.pending_requests,
		});
	};

	useEffect(() => {
		fetch(`${API_ROOT}/users/${localStorage.userId}`, {
			headers: HEADERS,
		})
			.then((r) => r.json())
			.then((user) => setData(user));

		cable.subscriptions.create(
			{ channel: 'ContactsChannel' },
			{
				received: function (data) {
					console.log(data);
					if (!data.contact.status) {
						addContact('received', data.contact);
					} else if (data.contact.status) {
						addContact('current', data.contact);
					}
				},
			}
		);
	}, []);

	return (
		<div>
			<h5>Contacts:</h5>
			{contacts ? (
				<>
					<PendingContacts />
					<hr></hr>
					<CurrentContacts />
					<hr></hr>
					<SentContacts />
				</>
			) : null}
		</div>
	);
}

const mapStateToProps = (state) => ({
	contacts: state.contacts,
});

const mapDispatchToProps = (dispatch) => ({
	setContacts: (contacts) => dispatch(setContacts(contacts)),
	addContact: (list, contact) => dispatch(addContact(list, contact)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
