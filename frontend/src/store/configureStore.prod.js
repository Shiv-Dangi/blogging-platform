import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import StockApp from '../redux';
import ReduxPromise from 'redux-promise';
import { loadState } from './persistStore';

// create a store that has redux-thunk middleware enabled
const createStoreWithMiddleware = applyMiddleware(thunk, ReduxPromise)(createStore);

export default function configureStore() {
	const initialState = loadState() || {};
	const store = createStoreWithMiddleware(StockApp, initialState);
	return store;
}
