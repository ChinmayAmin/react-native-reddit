var _ = require('lodash');

let BASE_URL = 'http://reddit.com/';

export function getSubredditData(subredditName) {
  return fetch(BASE_URL + 'r/' + subredditName + '/.json')
	.then((response) => response.json())
	.then((response) => {
    if(response.error === '403') {
        return ['No permission'];
    }

    if(!response.data || _.isEmpty(response)) {
      return ['No data'];
    }

		return _.reduce(response.data.children, function(result, value, key) {
			result.push(value.data);
			return result;
		}, []);
	})
	.catch((error) => {
	  console.warn(error);
	});
}

export function getSubredditDataWithFilter(subredditName, filter) {
  return fetch(BASE_URL + 'r/' + subredditName + '/' + filter + '.json')
	.then((response) => response.json())
	.then((response) => {
    if(response.error === '403') {
        return ['No permission'];
    }

    if(!response.data || _.isEmpty(response)) {
      return ['No data'];
    }

		return _.reduce(response.data.children, function(result, value, key) {
			result.push(value.data);
			return result;
		}, []);
	})
	.catch((error) => {
	  console.warn(error);
	});
}

export function getDefaultSubreddits() {
  return fetch(BASE_URL + 'subreddits/default.json')
	.then((response) => response.json())
	.then((response) => {
    if(response.error === '403') {
        return ['No permission'];
    }

    if(!response.data || _.isEmpty(response)) {
      return ['No data'];
    }

    return _.reduce(response.data.children, function(result, value, key) {
			result.push(value.data);
			return result;
		}, []);
	})
	.catch((error) => {
	  console.warn(error);
	});
}
