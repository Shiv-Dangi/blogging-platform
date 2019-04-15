import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addDataToDB, getDataFromDb } from '../../../redux/Articles/actions';
import './index.scss';

function tempAlert(msg, duration, textColor) {
	var el = document.createElement('div');
	el.setAttribute(
		'style',
		`position:absolute;top:10%;left:40%;background-color:white;z-index:1;padding:15px;color:${textColor};width:20%;text-align:center;border-radius:8px;font-weight:600;`
	);
	el.innerHTML = msg;
	setTimeout(function() {
		el.parentNode.removeChild(el);
	}, duration);
	document.body.appendChild(el);
}

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
					this.props.history.push('/');
					tempAlert('Article successfully added!', 2000, 'green');
				} else {
					tempAlert('Invalid Inputs', 2000, 'red');
				}
			});
		} else {
			tempAlert('Invalid Inputs', 2000, 'red');
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
					<input type='text' placeholder='add title..' onChange={this.updatetitle} />
				</div>
				<div>
					<label className='label'>Description</label>
					<textarea type='textarea' placeholder='add text here..' onChange={this.updateDesc} />
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
