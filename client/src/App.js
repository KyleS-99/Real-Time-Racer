import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

// Redux store
import store from './store';

import Landing from './components/Landing/Landing';

import './App.css';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={Landing} />
					</Switch>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
