import './App.css';
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Main from './scenes/Main';
import Register from './scenes/Register';
import Login from './scenes/Login';

function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/">
					<h1>Welcome to Sealed</h1>
					{localStorage.token ? (
						<p>
							You're signed in! <Link to="/app">View Chats</Link>
						</p>
					) : (
						<p>
							<Link to="/login">Login</Link> or{' '}
							<Link to="/register">Register</Link>
						</p>
					)}
				</Route>
				<Route
					path="/app"
					render={(routerProps) => <Main {...routerProps} />}
				></Route>
				<Route exact path="/register">
					<Register />
				</Route>
				<Route exact path="/login">
					<Login />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
