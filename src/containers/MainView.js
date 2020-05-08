import React from 'react';
import { connect } from 'react-redux';

import { Route } from 'react-router-dom';

import Chat from '../containers/Chat';
import Welcome from '../components/Welcome';
import Contacts from '../containers/Contacts';

export const MainView = () => {
	return (
		<div className="app-section">
			<Route
				exact
				path={`/app/chat/:chatId`}
				render={(routerProps) => <Chat {...routerProps} />}
			/>
			<Route exact path={`/app`} render={() => <Welcome />} />
			<Route path={`/app/contacts`} render={() => <Contacts />} />
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
