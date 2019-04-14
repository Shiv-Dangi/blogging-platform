const key = 'STATE';
//TODO: set this for clearing localstorage and increase the version number
const shouldClearLocalStorage = true;
const version = '3';

export const loadState = () => {
	try {
		if (
			process.env.API_ENV === 'development' &&
			shouldClearLocalStorage &&
			localStorage.getItem('version') !== version
		) {
			localStorage.removeItem(key);
			localStorage.setItem('version', version);
		}
		const serialized = localStorage.getItem(key);
		return JSON.parse(serialized);
	} catch (err) {
		return undefined;
	}
};

export const saveState = state => {
	try {
		const serialized = JSON.stringify(state);
		localStorage.setItem(key, serialized);
	} catch (err) {
		console.log('write to store failed...');
		// ignore write errors...
	}
};
