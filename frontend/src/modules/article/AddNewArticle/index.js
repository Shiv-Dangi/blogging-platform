import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addDataToDB, getDataFromDb } from '../../../redux/Articles/actions';
import './index.scss';

class AddNewArticle extends Component {
	state = {
		title: '',
		desc: {}
	};

	addNewArticle = () => {
		let { title, desc } = this.state;
		if (title && desc) {
			let articleData = {};
			articleData.title = title;
			articleData.desc = {};
			let paragraphsInDesc = desc.split('\n\n');
			for (let i = 0; i < paragraphsInDesc.length; i++) {
				articleData.desc[`p${i}`] = { text: paragraphsInDesc[i], comments: [] };
			}
			this.props.addDataToDB(articleData).then(res => {
				if (res.data.success) {
					this.props.getDataFromDb();
					alert('successfully added!');
				} else {
					alert('Invalid Inputs');
				}
			});
		} else {
			alert('Invalid Inputs');
		}
	};

	updatetitle = event => {
		this.setState({
			...this.state,
			title: event.target.value
		});
	};

	updateDesc = event => {
		this.setState({
			...this.state,
			desc: event.target.value
		});
	};

	render() {
		return (
			<div className='add-article-container'>
				<div>
					<label className='label'>Title</label>
					<input type='text' placeholder='input title..' onChange={this.updatetitle} />
				</div>
				<div>
					<label className='label'>Description</label>
					<textarea type='textarea' placeholder='input text..' onChange={this.updateDesc} />
				</div>
				<div className='footer-btns'>
					<button className='button' onClick={this.addNewArticle}>
						Submit
					</button>
					<button
						className='button'
						onClick={() => {
							this.props.history.push('/');
						}}
					>
						Back to Article List
					</button>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ addDataToDB, getDataFromDb }, dispatch);
};

export default connect(
	null,
	mapDispatchToProps
)(AddNewArticle);
