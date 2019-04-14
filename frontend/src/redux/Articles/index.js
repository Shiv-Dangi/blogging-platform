import { FETCH_ARTICLES } from './actions';

const initialState = { articles: [] };

export default function ArticleReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_ARTICLES:
			return { ...state, articles: action.payload };
		default:
			return state;
	}
}
