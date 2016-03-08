// エラー処理は終了にしているのでforeverなどでプロセス監視してください
var keyword = 'せにょ|セニョ'
var device = '通知するデバイス。登録したメールアドレスならすべてのデバイスに通知'
var PushBullet = require('pushbullet');
var pusher = new PushBullet('PushBulletのAccess Token');
var twitter = require('ntwitter');
var twit = new twitter({
  consumer_key: 'dev.twitter.comで作ったconsumer_key',
  consumer_secret: 'dev.twitter.comで作ったconsumer_secret',
  access_token_key: 'dev.twitter.comで作ったaccess_token_key',
  access_token_secret: 'dev.twitter.comで作ったaccess_token_secret'
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
  stream.on('end', function (response) {
    // Handle a disconnection
    console.log('twitter disconnection error. exit.');
    process.exit(1);
  });
  stream.on('destroy', function (response) {
    // Handle a 'silent' disconnection from Twitter, no end/error event fired
    console.log('twitter disconnection error?(no end/error event fired) exit.');
    process.exit(1);
  });
});
