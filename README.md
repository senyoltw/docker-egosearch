# docker-egosearch
Twitterのタイムラインをエゴサしてpushbulletを使って通知する dockerコンテナ

# 使い方
apps.twitter.comからConsumer Key / Consumer Secret / Access Token / Access Token Secret を取得  
https://apps.twitter.com/

PushBulletのアカウントを作り、Account SettingsからAccess Tokenを取得  
https://www.pushbullet.com/

docker環境があるところで以下コマンドで実行
```
# docker pull senyoltw/twitter_egosearch
# docker run \
-e keyword="エゴサしたい単語|正規表現も大丈夫" \
-e PushBullet_device='プッシュしたいデバイス' \
-e PushBullet_Access_Token='取得したやつ' \
-e twitter_consumer_key='取得したやつ' \
-e twitter_consumer_secret='取得したやつ' \
-e twitter_access_token_key='取得したやつ' \
-e twitter_access_token_secret='取得したやつ' \
docker.io/senyoltw/twitter_egosearch
```
ちゃんとpsやlogsで動いていたら成功です。あとはよしなにpushbulletアプリを入れて承認欲求をみたしてください。
ちゃんと実行するときはdocker run -d --restart=always にするとよいでしょう。

# docker-composeで実行する場合
```
# pwd
/docker/twitter_egosearch
# ls
docker-compose.yml
# vi docker-compose.yml
# docker-compose up -d
Creating network "twitteregosearch_default" with the default driver
Creating twitteregosearch_twitter_egosearch_1 ... 
Creating twitteregosearch_twitter_egosearch_1 ... done

```
適当に情報変更してdocker-compose upで起動します。良かったですね。
