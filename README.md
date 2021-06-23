# アプリの起動
## 準備
### Docker
ローカルでのアプリの起動には[Docker](https://ops.jig-saw.com/tech-cate/docker-for-windows-install)と[Docker Compose](https://docs.docker.com/compose/install/)※のインストールが必須です。（FrontとAPIはDockerを使用しなくても立ち上がりますが、DBはDocker必須です。）  
※Docker Desktop for Windows(Mac) や Docker Toolboxを使用している方はDocker Composeのインストールは不要です。

## 開発用のコンテナを起動するパターン
コンテナをdocker-compose.develop.ymlで立ち上げる
```
$ repository\chousei> docker-compose -f docker-compose.develop.yml up -d  
略
```
### Front
コンテナにアクセスし準備する
```
$ repository\chousei> docker-compose -f docker-compose.develop.yml exec chousei-front sh

/usr/src/app # yarn
yarn install v1.21.1
info No lockfile found.
[1/5] Validating package.json...
略

/usr/src/app # quasar dev
```
もしくはこちらで直接実行する（node_modulesがある前提）
```
docker-compose -f docker-compose.develop.yml exec chousei-front quasar dev
```
### Api
コンテナにアクセスし準備する
```
$ repository\chousei> docker-compose -f docker-compose.develop.yml exec chousei-api sh

/usr/src/app # yarn
yarn install v1.21.1
info No lockfile found.
[1/5] Validating package.json...
略

/usr/src/app # nodemon index.js
```
もしくはこちらで直接実行する（node_modulesがある前提）
```
docker-compose -f docker-compose.develop.yml exec chousei-api nodemon index.js
```
API仕様  
http://localhost

## アプリが動作している状態でコンテナが起動する
コンテナをdocker-compose.ymlで立ち上げる
```
$ repository\chousei>docker-compose up -d
Starting chousei-db ... done
Starting chousei-api ... done
Starting chousei-front ... done
```
コンテナ起動後、http://localhost:8080 にアクセス。

docker run -it --name md-build-2 -d -v "$(pwd)":/app android_build