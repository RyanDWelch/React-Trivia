const API_URL = 'https://opentdb.com';

export const getQuestions = async (amount=10, category=-1, difficulty='Mixed') => {
	difficulty = difficulty.toLowerCase();
	const url = `${API_URL}/api.php?amount=${amount}` + 
		((category !== -1) ? `&category=${category}` : '') +
		((difficulty !== 'mixed') ? `&difficulty=${difficulty}` : '');
	console.log(url);
	return fetch(url)
	.then(res => {
		if (res.status !== 200) {
			return res;
		}
		return res.json();
	})
	
	.then(data => {
		// Only happen if status is 200
		if (data.results) {
			return data.results;
		}
		// Return the object with with http status (error code)
		return {errorCode: data.status};
	});
}

export const getCategories = async () => {
	return fetch(`${API_URL}/api_category.php`)
	.then(res => {
		if (res.status !== 200) {
			return res;
		}
		return res.json();
	})
	.then(data => {
		// Only happen if status is 200
		if (data.trivia_categories) {
			return data.trivia_categories;
		}
		// Return the object with with http status (error code)
		return {errorCode: data.status};
	});
}
