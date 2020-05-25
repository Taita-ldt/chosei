# アプリの起動
## 準備
### Docker
ローカルでのアプリの起動には[Docker](https://ops.jig-saw.com/tech-cate/docker-for-windows-install)と[Docker Compose](https://docs.docker.com/compose/install/)※のインストールが必須です。（FrontとAPIはDockerを使用しなくても立ち上がりますが、DBはDocker必須です。）  
※Docker Desktop for Windows(Mac) や Docker Toolboxを使用している方はDocker Composeのインストールは不要です。
### Node.js
APIはNode.js, FrontはVue.js,Quasar(JavaScriptのフレームワーク)を使用しているので、[Node.jsのインストール](https://paper.dropbox.com/doc/Node.jsVue--AvqWG0JbiMEd1aLQc~FqYGFWAg-zJQ5kktH0KQZUJwTc1Sir)が必須です。バージョンは12.1.0です。
```
$ node -v
v12.1.0
```
### Yarn
Nodeのパッケージマネージャー。npmの親戚。npmを絶対使いたいという人はYarnをインストールする必要はないです。
インストール方法は色々あります。  
https://classic.yarnpkg.com/ja/docs/install#alternatives-stable  

おすすめは[chocolaty](https://qiita.com/NaoyaOura/items/1081884068fe3ea79570)でインストールする方法です。yarnコマンドを使用するのにPATHを通す必要がない分楽です。
```
choco install yarn -y
```

### Vue.js
```
$ yarn global add @vue/cli 4.2.2
$ vue -V
@vue/cli 4.2.2
```

### Quasar
```
$ yarn global add @quasar/cli@1.0.5
$ quasar -v
1.0.5
```

## Front,API,DBをDockerコンテナで起動する
初回はimageのpull,コンテナの起動に時間がかかります。
```
$ repository\chousei>docker-compose up -d
Starting chousei-db ... done
Starting chousei-api ... done
Starting chousei-front ... done
```
コンテナ起動後、http://localhost:8080 にアクセス。

## Frontのみを開発用のコンテナで起動するパターン
コンテナをdocker-compose.develop.ymlで立ち上げる
```
$ repository\chousei> docker-compose -f docker-compose.develop.yml up -d  
略
```

コンテナにアクセスし準備する
```
$ repository\chousei> docker-compose exec chousei-front sh

/usr/src/app # yarn
yarn install v1.21.1
info No lockfile found.
[1/5] Validating package.json...
略

/usr/src/app # quasar dev
```
もしくはこちらで直接実行する（node_modulesがある前提）
```
docker-compose exec chousei-front quasar dev
```
## Front,APIのローカルデバッグ方法
各ディレクトリのREADMEに書いてあります。