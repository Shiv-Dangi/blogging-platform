import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getDataFromDb } from './redux/Articles/actions';

import Loadable from 'react-loadable';
import Loader from './modules/shared/Loader';

let ArticleList = Loadable({
	loader: () => import(/* webpackChunkName: "article-list" */ './modules/article'),
	loading: Loader
});

let AddNewArticle = Loadable({
	loader: () => import(/* webpackChunkName: "add-article" */ './modules/article/AddNewArticle'),
	loading: Loader
});

let ArticleDetails = Loadable({
	loader: () => import(/* webpackChunkName: "article-detail" */ './modules/article/ArticleDetails'),
	loading: Loader
});

class AppRouter extends Component {
	componentWillMount() {
		this.props.getDataFromDb();
	}

	render() {
		return (
			<>
				<div className='sticky-header'>
					<span
						onClick={() => {
							this.props.history.push('/');
						}}
						className='nav-menu-item'
					>
						Home
					</span>
					<span
						onClick={() => {
							this.props.history.push('/add-new-article');
						}}
						className='nav-menu-item'
					>
						Add new article
					</span>
				</div>
				<Switch onChange={this.onRouteChange}>
					<Route exact path='/article/:id' component={ArticleDetails} />
					<Route exact path='/add-new-article' component={AddNewArticle} />
					<Route exact path='/' component={ArticleList} />
					{/* <Route exact path='*' component={PageNotFound}/> */}
				</Switch>
			</>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ getDataFromDb }, dispatch);
};

export default connect(
	null,
	mapDispatchToProps
)(AppRouter);
