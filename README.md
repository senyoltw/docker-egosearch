# docker-egosearch
Twitterのタイムラインをエゴサしてpushbulletを使って通知するアプリ

# 使い方
apps.twitter.comからConsumer Key / Consumer Secret / Access Token / Access Token Secret を取得  
https://apps.twitter.com/

PushBulletのアカウントを作り、Account SettingsからAccess Tokenを取得  
https://www.pushbullet.com/

docker環境があるところで以下コマンドで実行
```
# git clone https://github.com/senyoltw/docker-egosearch.git
# cd docker-egosearch
# vi app.js

(エゴサーチしたいワードを書き換えたり、上で取得したトークンを記載する)

# docker build -t egosearch .
# docker run --restart=always --name egosearch -d egosearch
# docker ps
# docker logs egosearch
```
ちゃんとpsやlogsで動いていたら成功です。あとはよしなにpushbulletアプリを入れて承認欲求をみたしてください。
