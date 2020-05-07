import React from 'react';
import { connect } from 'react-redux';

import { Route, Redirect } from 'react-router-dom';

import Chat from '../containers/Chat';
import Welcome from '../components/Welcome';

export const MainView = () => {
	return (
		<div className="app-section">
			<Route
				exact
				path={`/app/chat/:chatId`}
				render={(routerProps) => <Chat {...routerProps} />}
			/>
			<Route exact path={`/app`} render={() => <Welcome />} />
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
