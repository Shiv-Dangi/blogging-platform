import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteFromDB, getDataFromDb } from '../../redux/Articles/actions';
import './index.scss';

class ArticleList extends Component {
	deleteArticle = articleid => {
		this.props.deleteFromDB(articleid).then(res => {
			if (res.data.success) {
				this.props.getDataFromDb();
			}
		});
	};

	renderArticles = () => {
		let articleListHtml = [];
		let { articleList } = this.props;
		for (let i = 0; i < articleList.length; i++) {
			let article = articleList[i];
			articleListHtml.push(
				<div key={'article' + article.id} className='article'>
					<div
						className='title'
						onClick={() => {
							this.props.history.push(`/article/${article.id}`);
						}}
					>
						{article.title}
					</div>
					<div className='action-btn' onClick={() => this.deleteArticle(article.id)}>
						delete
					</div>
				</div>
			);
		}
		return <div className='list-wrapper'>{articleListHtml}</div>;
	};

	render() {
		const { articleList } = this.props;
		return (
			<div className='article-list-container'>
				{articleList.length <= 0 ? <div>NO Articles YET</div> : this.renderArticles()}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		articleList: state.data.articles
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ deleteFromDB, getDataFromDb }, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ArticleList);
