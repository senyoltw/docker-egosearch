// エラー処理は終了にしているので適当にプロセス監視してください
const keyword = process.env.keyword
const axios = require('axios');
const webhook_url = process.env.webhook_url
const twitter = require('twitter');
const client = new twitter({
  consumer_key: process.env.twitter_consumer_key,
  consumer_secret: process.env.twitter_consumer_secret,
  access_token_key: process.env.twitter_access_token_key,
  access_token_secret: process.env.twitter_access_token_secret
});

function post_webhook(data) {
  axios.post(webhook_url, data)
  .catch(function (error) {
    console.log('webhook error.');
    console.log(error);
    process.exit(1);
  })
}

function get_home_timeline (params) {
  return client.get('statuses/home_timeline', params)
  .then(function (tweets) {
    return tweets;
  })
  .catch(function (error) {
    console.log('twitter error.');
    console.log(error);
    process.exit(1);
  })
}

function search_tweet (data, keyword) {
  if (data.full_text.search(keyword)!=-1) {
    let body = { value1 : data.user.name+"@"+data.user.screen_name, value2 : data.full_text, value3 : "https://twitter.com/"+data.user.screen_name+"/status/"+data.id_str };
    return body;
  }else{
    return {};
  }
}

async function main () {
  console.log('twitter search start!');
  let params = {count:1, tweet_mode:'extended'};
  let timeline = await get_home_timeline(params)
  let since_id = timeline[0].id_str
  while (true){
    // twitter api 15times/15min
    await new Promise(r => setTimeout(r, 61000));
    // next search from since_id  (that is, more recent than) 
    since_id = timeline[0].id_str
    params = {count:200, since_id: since_id, tweet_mode:'extended'};
    timeline = await get_home_timeline(params);
    if (Object.keys(timeline).length) {
      // There are new tweets.
      Object.keys(timeline).forEach(function(key) {
        // analysis new tweet. one by one.
        let tweet = this[key];
        let hit = search_tweet(tweet, keyword);
        if (Object.keys(hit).length) {
          // keyword hit
          console.log(hit);
          post_webhook(hit);
        }
      }, timeline);
    }else{
      // There are no new tweets.
    }
  }
}

main();
