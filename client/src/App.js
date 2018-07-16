import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

// Redux store
import store from './store';

import Header from './components/Header/Header';
import Landing from './components/Landing/Landing';

import './App.css';
import 'normalize.css';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div>
						<Route path="/" render={(props) => (props.location.pathname !== '/') && <Header />} />
						<Switch>
							<Route exact path="/" component={Landing} />
						</Switch>
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
