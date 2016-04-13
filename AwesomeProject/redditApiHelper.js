/*
 * Very naieve implementation of a reddit api helper
 * uses react-native fetch..because there isn't anything else... :'(
 * NOTE: 
	t1_	Comment
	t2_	Account
	t3_	Link
	t4_	Message
	t5_	Subreddit
	t6_	Award
	t8_	PromoCampaign
*/

import React, {
} from 'react-native';

//GET
export default class API extends React.Component {
	async getSubredditData(subredditName) {
	  try {
	    let response = await fetch('http://reddit.com/r/' + subredditName + '/.json');
	    let responseJson = await response.json();
	    return responseJson;
	  } catch(error) {
	    // Handle error
	    console.error(error);
	  }
	}
}

// getSubredditData = function(subredditName) {
// 	fetch('http://reddit.com/r/' + subredditName + '/.json')
// 	.then((response) => response.text())
// 	.then((responseText) => {
// 	  	return responseText;
// 	})
// 	.catch((error) => {
// 	  console.warn(error);
// 	}); 
// }

//PUT
//POST
//DEL