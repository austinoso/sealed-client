import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import SentContacts from '../components/Contacts/SentContacts';
import CurrentContacts from '../components/Contacts/CurrentContacts';
import PendingContacts from '../components/Contacts/PendingContacts';

import {
	setContacts,
	addContact,
	removeContact,
} from '../redux/actions/contacts';
import { API_ROOT, HEADERS, cable } from '../constants/index';

function Contacts({ setContacts, contacts, addContact, removeContact }) {
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
					if (data.action === 'DEL') {
						console.log(data);
						removeContact('sent', data.contact.id);
						removeContact('received', data.contact.id);
						removeContact('current', data.contact.id);
					} else if (data.contact.status) {
						addContact('current', data.contact);
						removeContact('sent', data.contact.id);
					} else if (data.contact.status === false) {
						addContact('received', data.contact);
					}
				},
			}
		);
	}, []);

	return (
		<div className="main-reduced">
			{contacts ? (
				<div className="contacts">
					<Route
						exact
						path={`/app/contacts/pending`}
						render={(routerProps) => <PendingContacts />}
					/>
					<Route
						exact
						path={`/app/contacts/sent`}
						render={(routerProps) => <SentContacts />}
					/>
					<Route
						exact
						path={`/app/contacts`}
						render={(routerProps) => <CurrentContacts />}
					/>
				</div>
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
	removeContact: (list, contact) => dispatch(removeContact(list, contact)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
