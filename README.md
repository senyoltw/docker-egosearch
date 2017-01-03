# docker-egosearch
Twitterのタイムラインをエゴサしてpushbulletを使って通知するアプリ

# 使い方
apps.twitter.comからConsumer Key / Consumer Secret / Access Token / Access Token Secret を取得  
https://apps.twitter.com/

PushBulletのアカウントを作り、Account SettingsからAccess Tokenを取得  
https://www.pushbullet.com/

docker環境があるところで以下コマンドで実行
```
# docker pull senyoltw/twitter_egosearch
# docker run \
-e keyword="せにょ|senyoltw" \
-e PushBullet_device='取得したやつ' \
-e PushBullet_Access_Token='取得したやつ' \
-e twitter_consumer_key='取得したやつ' \
-e twitter_consumer_secret='取得したやつ' \
-e twitter_access_token_key='取得したやつ' \
-e twitter_access_token_secret='取得したやつ' \
docker.io/senyoltw/twitter_egosearch
```
ちゃんとpsやlogsで動いていたら成功です。あとはよしなにpushbulletアプリを入れて承認欲求をみたしてください。
