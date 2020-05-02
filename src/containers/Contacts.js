import React, { useEffect } from 'react';
import SentContacts from '../components/Contacts/SentContacts';
import CurrentContacts from '../components/Contacts/CurrentContacts';

import { connect } from 'react-redux';
import { setContacts } from '../redux/actions/contacts';

import { API_ROOT, HEADERS } from '../constants/index';
import PendingContacts from '../components/Contacts/PendingContacts';

function Contacts({ setContacts, contacts }) {
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
