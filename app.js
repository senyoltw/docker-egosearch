// エラー処理は終了にしているのでforeverなどでプロセス監視してください
var keyword = process.env.keyword
var device =  process.env.PushBullet_device
var PushBullet = require('pushbullet');
var pusher = new PushBullet(process.env.PushBullet_Access_Token);
var twitter = require('twitter');
var twit = new twitter({
  consumer_key: process.env.twitter_consumer_key,
  consumer_secret: process.env.twitter_consumer_secret,
  access_token_key: process.env.twitter_access_token_key,
  access_token_secret: process.env.twitter_access_token_secret
});

twit.stream('user',  function(stream) {
  stream.on('data', function (data) {
    if (data && data.user && data.text.search(keyword)!=-1) {
     pusher.link(device, data.user.name+"@"+data.user.screen_name+" : "+data.text, "https://twitter.com/"+data.user.screen_name+"/status/"+data.id_str, function(error, response) {
      if (error) {
        console.log('pushBullet disconnection error. exit.');
        process.exit(1);
      } else {
        console.log(data.user.name+"@"+data.user.screen_name+" : "+data.text);
      }
     });
    }
  });
  stream.on('error', function (response) {
    // Handle a disconnection
    console.log('twitter error. exit.');
    process.exit(1);
  });
});
