## Node.js
[インストール](https://paper.dropbox.com/doc/Node.jsVue--AvqWG0JbiMEd1aLQc~FqYGFWAg-zJQ5kktH0KQZUJwTc1Sir)
```
$ node -v
v12.1.0
```

## Install the dependencies
```
$ yarn
```

### Start the app(hotreload)
```
$ nodemon index.js
```

## 開発
### sequelize（node.jsのORM）インストール
```
$ yarn grobal add sequelize-cli
$ yarn add sequelize
```

### model作成
```
$ sequelize model:create --underscored --name <テーブル名> --attributes "<カラム名>:<データ型>"
```

## フォルダ構成
| Path	| メモ	| リンク|
| --- | --- | --- |
| index.js | nodeサーバーの設定	|	 |
| ./config | index.js以外の追加設定 |	 |
| ./controllers | コントローラーモジュール。サービスモジュールを呼び出して実行する。 |
| ./service |	サービスモジュール。ビジネスロジックを記述する。 |  |
| ./models | sequelize用のモデルモジュール。テーブル定義を記述する。 |  |
| ./migrations | sequelize-cliでモデルを生成すると自動で追加される。DBにテーブルがなかった場合、このファイルを参照し、自動でcreate tableしてくれる。 |  |
| ./routes | APIのルーティングを記述する。 |	 |
| ./seeders　| 調査中。。。 |  |
参考：https://sequelize.org/master/manual/migrations.html