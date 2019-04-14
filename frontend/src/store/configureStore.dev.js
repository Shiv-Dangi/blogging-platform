import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../redux';
import ReduxPromise from 'redux-promise';
import { loadState } from './persistStore';

export default function configureStore(initialState = loadState() || {}) {
	const store = createStore(
		reducer,
		initialState,
		compose(
			applyMiddleware(thunk, ReduxPromise),
			window.__REDUX_DEVTOOLS_EXTENSION__
				? window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 })
				: f => f
		)
	);

	if (module.hot) {
		// Enable hot module replacement for reducers
		module.hot.accept(() => {
			const nextRootReducer = require('../redux/index').default;
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}
