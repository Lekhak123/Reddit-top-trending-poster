// run `node index.js` in the terminal
const got = require('got');


let subreddit = "" // write the subreddit here to check

got(`https://www.reddit.com/r/${subreddit}/top/.json?t=day`).then(async (response) => {
  console.log(response.body.match(/"url_overridden_by_dest": "https?:\/\/[i?v?.+redd.it]*[gfyvat.com]*[imgur.com]*[redgifs.com]*\/\w+.?[aA-zZ]*/gmisd));
});



//To check if we get a response when using got. 