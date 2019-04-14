import React, { Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, BrowserRouter } from 'react-router-dom';

import AppRouter from './AppRouter';

class App extends Component {
	render() {
		return (
			<Provider store={this.props.store}>
				<BrowserRouter>
					<Route path='/' component={AppRouter} />
				</BrowserRouter>
			</Provider>
		);
	}
}

App.propTypes = {
	store: PropTypes.object
};

export default App;
