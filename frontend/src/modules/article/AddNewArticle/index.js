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
		if (title && Object.keys(desc).length !== 0 && desc.constructor === Object) {
			this.props.addDataToDB(this.state).then(res => {
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
			desc: { p1: event.target.value }
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
						submit
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
