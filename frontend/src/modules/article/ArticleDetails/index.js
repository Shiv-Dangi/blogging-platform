import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './index.scss';

class ArticleDetails extends Component {
	renderArticleParas = () => {
		let { articleData } = this.props;
		let paragraphsHtml = [];
		for (let key in articleData.desc) {
			paragraphsHtml.push(
				<p className='description' key={key}>
					{articleData.desc[key].text}
				</p>
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
	console.log(articleData);
	return {
		articleData
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({}, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ArticleDetails);
