import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export const ContactNav = ({ contacts }) => {
	const pendingContacts = () => {
		return contacts && contacts.received && contacts.received.length ? (
			<Button size="sm" className="primary-btn">
				{contacts.received.length}
			</Button>
		) : null;
	};
	return (
		<>
			<Nav.Item>
				<Nav.Link>
					<Link to="/app/contacts">Contacts</Link>
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link eventKey="2" title="Item">
					<Link to="/app/contacts/pending">Pending {pendingContacts()}</Link>
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link eventKey="3">
					<Link to="/app/contacts/sent">
						<Button size="sm" className="primary-btn">
							Add Contact
						</Button>
					</Link>
				</Nav.Link>
			</Nav.Item>
		</>
	);
};

const mapStateToProps = (state) => ({
	contacts: state.contacts,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ContactNav);
