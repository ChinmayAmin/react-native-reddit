var _ = require('lodash');

let BASE_URL = 'http://reddit.com/';

export function getSubredditData(subredditName) {
  return fetch(BASE_URL + 'r/' + subredditName + '/.json')
	.then((response) => response.json())
	.then((response) => {
		return _.reduce(response.data.children, function(result, value, key) {
			result.push(value.data);
			return result;
		}, []);
	})
	.catch((error) => {
	  console.warn(error);
	}).done();
}

export function getDefaultSubreddits() {
  return fetch(BASE_URL + 'subreddits/default.json')
	.then((response) => response.json())
	.then((response) => {
    return _.reduce(response.data.children, function(result, value, key) {
			result.push(value.data);
			return result;
		}, []);
	})
	.catch((error) => {
	  console.warn(error);
	});
}
