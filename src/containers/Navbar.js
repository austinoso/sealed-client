import React from 'react';
import { connect } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ContactNav from '../components/ContactNav';
import ChatNav from '../components/ChatNav';

export const Navbar = () => {
	const history = useHistory();

	const logout = () => {
		localStorage.clear();
		history.push('/');
	};

	return (
		<Nav variant="pills" activeKey="1" className="nav">
			<div className="nav-head">
				<NavDropdown title={`@${localStorage.username}`} id="nav-dropdown">
					<NavDropdown.Item eventKey="4.1" disabled>
						Profile
					</NavDropdown.Item>

					<NavDropdown.Divider />
					<NavDropdown.Item eventKey="4.4" onClick={logout}>
						Logout
					</NavDropdown.Item>
				</NavDropdown>
			</div>
			<Route path={`/app/contacts`} render={() => <ContactNav />} />
			<Route path={`/app/chat`} render={() => <ChatNav />} />
		</Nav>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
