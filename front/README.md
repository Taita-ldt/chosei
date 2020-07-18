# Quasar App (chousei-front)

A Quasar Framework app

### Node.js
[インストール](https://paper.dropbox.com/doc/Node.jsVue--AvqWG0JbiMEd1aLQc~FqYGFWAg-zJQ5kktH0KQZUJwTc1Sir)
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

## Install the dependencies
```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
yarn run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

## ファイル命名規則
| 名前 | 書き方 |
| --- | --- |
| .vueファイル | ケバブケース |
| .jsファイル, メソッド名, 変数名 | キャメルケース |

## フォルダ構成
| Path	| メモ	| リンク|
| --- | --- | --- |
| quasar.conf.js |	ビルド設定等|	[quasar-conf-js](https://quasar.dev/quasar-cli/quasar-conf-js) |
| src/index.template.html|	html、head、bodyタグが記載された一番外枠のファイル（configのhtmlVariablesで変数を使用したりしている)|	 |
| src/App.vue||		 |
| src/boot|	Vueがインスタンス化される前に実行|	[boot-files](https://quasar.dev/quasar-cli/cli-documentation/boot-files) |
| src/store|	ここにstoreを記述（Vuex）|	[vuex-store](https://quasar.dev/quasar-cli/cli-documentation/vuex-store) |
| src/router/routes.js|	ここにルーティングを記述（VueRouter）|	[routing](https://quasar.dev/quasar-cli/cli-documentation/routing) |
| src/components|	自作コンポーネント等（使わないでpagesのみで作るのでもOK）|	 |
| src/layouts|	画面用コンポーネント（pagesを読み込む用）|	 |
| src/pages|	画面用コンポーネント|	 |
| src/assets|	vueファイルからの相対パス./でアクセス可能なもの|[	App Handling Assets](https://quasar.dev/quasar-cli/cli-documentation/handling-assets) |
| src/statics|	ビルド時にdistのstaticsにデプロイされる|	[App Handling Assets](https://quasar.dev/quasar-cli/cli-documentation/handling-assets) |
| src/css|	プロジェクト作成時に設定した形式（Pick your favorite CSS preprocessor）のcssファイルが入る（SCSSやSASS等）|	  |
| src/module|	ここに共通メソッドに記述　|	  |
参考：https://qiita.com/horikeso/items/326a738a402c5871520
