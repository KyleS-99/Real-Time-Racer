import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import io from 'socket.io-client';

// Redux store
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import PrivateRoute from './components/common/PrivateRoute';
import SocketContext from './socket-context';

import Header from './components/Header/Header';
import { 
	Landing,
	Dashboard,
	Practice,
	PracticeResult,
	Profile
} from './code-split';

import './App.css';
import 'normalize.css';

// Check for token in localStorage
if (localStorage.jwtToken) {
	// Decode token and get user info and exp
	const decodedToken = jwt_decode(localStorage.jwtToken);

	const currentTime = Date.now();
	// Check for expired token
	if (decodedToken.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());

		// Redirect to homepage
		window.location.href = '/';
	} else {
		const token = localStorage.jwtToken;

		// Set Authorization header to the token
		setAuthToken(token);

		// Decode token
		const decodedToken = jwt_decode(token);

		const { user, method } = decodedToken;

		// Set id on user object
		user.id = decodedToken.id;

		// Set current user
		store.dispatch(setCurrentUser({ method, user }));
	}
}

const socket = io({
	autoConnect: false
});

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<SocketContext.Provider value={socket}>
					<BrowserRouter>
						<div>
							<Route path="/" render={(props) => (props.location.pathname !== '/') && <Header {...props} />} />
							<Switch>
								<Route exact path="/" component={Landing} />
								<PrivateRoute exact path="/dashboard" component={Dashboard} />
								<PrivateRoute exact path="/race" component={Practice} />
								<PrivateRoute exact path="/race/result/:raceId?" component={PracticeResult} />
								<PrivateRoute exact path="/profile" component={Profile} />
							</Switch>
						</div>
					</BrowserRouter>
				</SocketContext.Provider>
			</Provider>
		);
	}
}

export default App;
