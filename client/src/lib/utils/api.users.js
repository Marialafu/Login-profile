const URL_BASE = 'http://localhost:3000';
const URL_API = '/api/users';

export const createUser = async body => {
	try {
		const response = await fetch(URL_BASE + URL_API, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: { 'Content-Type': 'application/json' }
		});

		const user = await response.json();
		return user;
	} catch (error) {
		console.log(error);
	}
};
