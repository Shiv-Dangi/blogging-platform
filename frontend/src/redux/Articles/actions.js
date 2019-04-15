import axios from 'axios';

export const getActions = (type, payload = {}) => {
	return {
		type,
		payload
	};
};

export const FETCH_ARTICLES = 'FETCH_ARTICLES';

// just a note, here, in the front end, we use the id key of our data object
// in order to identify which we want to Update or delete.
// for our back end, we use the object id assigned by MongoDB to modify
// data base entries

// get method that uses our backend api to
// fetch data from our data base
export const getDataFromDb = () => dispatch => {
	return fetch('http://localhost:3001/api/getData')
		.then(data => data.json())
		.then(res => {
			dispatch(getActions(FETCH_ARTICLES, res.data));
		});
};

// put method that uses our backend api
// to create new query into our data base
export const addDataToDB = dataToBeAdded => (dispatch, getState) => {
	const {
		data: { articles }
	} = getState();
	let idToBeAdded = 0;
	let currentIds = [];
	if (articles.length) {
		currentIds = articles.map(data => data.id);
	}

	while (currentIds.includes(idToBeAdded)) {
		++idToBeAdded;
	}

	return axios.post('http://localhost:3001/api/putData', {
		id: idToBeAdded,
		title: dataToBeAdded.title,
		desc: dataToBeAdded.desc
	});
};

// delete method that uses our backend api
// to remove existing database information
export const deleteFromDB = idTodelete => (dispatch, getState) => {
	let objIdToDelete = null;
	const {
		data: { articles }
	} = getState();
	articles.forEach(data => {
		if (data.id === idTodelete) {
			objIdToDelete = data._id;
		}
	});

	return axios.delete('http://localhost:3001/api/deleteData', {
		data: {
			id: objIdToDelete
		}
	});
};

//  update method that uses our backend api
//  to overwrite existing data base information
export const updateDB = (idToUpdate, paragraphKey, comment) => (dispatch, getState) => {
	let objIdToUpdate = null,
		articleData = {};
	const {
		data: { articles }
	} = getState();
	articles.forEach(data => {
		if (data.id == idToUpdate) {
			objIdToUpdate = data._id;
			articleData = data;
		}
	});
	articleData.desc[paragraphKey].comments.push(comment);

	return axios.post('http://localhost:3001/api/updateData', {
		id: objIdToUpdate,
		update: articleData
	});
};
