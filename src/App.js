import './App.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './scenes/Main';
import Register from './scenes/Register';
import Login from './scenes/Login';
import Home from './scenes/Home';

function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/">
					<Home />
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
