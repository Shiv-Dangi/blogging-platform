import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateDB, getDataFromDb } from '../../../redux/Articles/actions';
import './index.scss';

class ArticleDetails extends Component {
	state = {};

	commentInLocalState = event => {
		this.setState({
			...this.state,
			[event._dispatchInstances.key]: event.target.value.trim()
		});
	};

	saveComment = key => {
		if (this.state[key]) {
			this.props.updateDB(this.props.articleData.id, key, this.state[key]).then(res => {
				if (res.data.success) {
					this.props.getDataFromDb();
					console.log('comment added successfully');
				}
			});
		}
	};

	renderUserComments = (comments, key) => {
		let commentHtml = [];
		if (comments.length) {
			for (let i = comments.length; i > 0; i--) {
				commentHtml.push(
					<div key={'comment' + key + i} className='comment-text'>
						{comments[i - 1] + '.'}
					</div>
				);
			}
		}
		return commentHtml;
	};

	renderArticleParas = () => {
		let { articleData } = this.props;
		let paragraphsHtml = [];
		for (let key in articleData.desc) {
			paragraphsHtml.push(
				<div className='description' key={key}>
					<p className='text-paragraph'>{articleData.desc[key].text}</p>
					<div className='add-comment'>
						<input
							key={key}
							className='comment-input-box'
							type='text'
							placeholder='write a response...'
							value={this.state[key] || ''}
							onChange={this.commentInLocalState}
						/>
						<div
							className='submit-comment-btn'
							onClick={() => {
								this.saveComment(key);
							}}
						>
							Add
						</div>
					</div>
					<div className='user-comments'>
						<div className='response-heading'>Responses</div>
						{this.renderUserComments(articleData.desc[key].comments, key)}
					</div>
				</div>
			);
		}
		return paragraphsHtml;
	};

	render() {
		const { articleData } = this.props;
		return (
			<div className='article-details-container'>
				{Object.keys(articleData).length !== 0 && articleData.constructor === Object ? (
					<>
						<div className='title'>{articleData.title}</div>
						{this.renderArticleParas()}
					</>
				) : (
					<div>data not available</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state, props) => {
	let articleid = props.match.params.id,
		articleData = {};
	state.data.articles.forEach(data => {
		if (data.id == articleid) {
			articleData = data;
		}
	});
	return {
		articleData
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateDB, getDataFromDb }, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ArticleDetails);
