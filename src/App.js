import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
//import Chats from './scenes/Chats';
import Chat from './components/Chat';

function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/">
					<Chat id={1} />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
