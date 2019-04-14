import { combineReducers } from 'redux';
import ArticleReducer from './Articles';

const rootReducer = combineReducers({ data: ArticleReducer });

export default rootReducer;
