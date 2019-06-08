# twitter-egosearch
TwitterのタイムラインをエゴサしてIFTTTのnotificationを使って通知するアプリケーションとそれを運用するdockerコンテナ  
An application that uses the IFTTT notification to notify the  Twitter egosearching. and a docker container that operates it.

# How to USE
apps.twitter.comからConsumer Key / Consumer Secret / Access Token / Access Token Secret を取得  
Get Consumer Key / Consumer Secret / Access Token / Access Token Secret  
https://apps.twitter.com/

IFTTTのアカウントを作り、webhookとnotificationをつなげる。  
Create an IFTTT account and connect webhook and notification.  
https://ifttt.com/maker_webhooks  
https://ifttt.com/if_notifications

docker環境があるところで以下コマンドで実行  
Execute with the following command where there is docker working.  
```
# docker pull senyoltw/twitter_egosearch
# docker run \
-e keyword="エゴサしたい単語|正規表現も大丈夫|egosearchWords" \
-e webhook_url='webhookのURL' \
-e twitter_consumer_key='取得したやつ' \
-e twitter_consumer_secret='取得したやつ' \
-e twitter_access_token_key='取得したやつ' \
-e twitter_access_token_secret='取得したやつ' \
docker.io/senyoltw/twitter_egosearch
```
ちゃんとpsやlogsで動いていたら成功です。あとはよしなに承認欲求をみたしてください。
ちゃんと実行するときはdocker run -d --restart=always にするとよいでしょう。

# How to USE(docker-compose)
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
