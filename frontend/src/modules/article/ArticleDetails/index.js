import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './index.scss';

class ArticleDetails extends Component {
	render() {
		const { articleData } = this.props;
		return (
			<div className='article-details-container'>
				{Object.keys(articleData).length !== 0 && articleData.constructor === Object ? (
					<>
						<div className='title'>{articleData.title}</div>
						<div className='description'>{articleData.desc.p1}</div>
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
