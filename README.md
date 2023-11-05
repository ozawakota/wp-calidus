# docker template

---

## インストール

### macOS

- [Homebrew](https://brew.sh/index_ja.html)
- [nodenv](docs/nodenv.md)

### Windows

- [nodist](docs/nodist.md)

### VS Code Extensions

- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

---

## 主なディレクトリ構成

```sh
/docker # Docker関連ファイル
/htdocs # Productionモード時に出力するディレクトリ（変更可能）
/htdocs_dev # Developmentモード時に出力するディレクトリ（変更可能）
/src # ソースデータ
/tasks # コンパイルに必要なプログラムが入っているディレクトリ
/web # WordPressのコアファイルやアップロードファイル・プラグイン等
```

- web ディレクトリは`uploads`と`plugins`のみ Git 管理されるようにしています。変更したい場合は`.gitignore`を編集してください。
- `htdocs`と`htdocs_dev`は`.env`で変更することが可能です。

---

## 基本設定

`.env` を編集

| 項目           | 値                               | 説明                                                        |
| :------------- | :------------------------------- | :---------------------------------------------------------- |
| BS_OPEN        | "false" \| "local" \| "external" | BrowserSync 開始時のブラウザの挙動。                        |
| BS_STARTPATH   | string                           | BrowserSync 開始時に開くパス。ルート表示させる場合は空欄。  |
| THEME_PATH     | string                           | ASSETS_DIR を置いているディレクトリのパス                   |
| ASSETS_DIR     | string                           | assets ディレクトリの名称                                   |
| COPY_FILE      | string                           | コピーするファイルタイプ（複数ある場合はカンマ区切り）      |
| JPG_QUALITY    | number                           | JPEGの圧縮品質を0〜100の範囲で指定      |
| PNG_QUALITY    | number                           | PNGの圧縮品質の最小値と最大値を0〜100の範囲で指定      |
| WEBP_QUALITY   | number                           | WebPの圧縮品質を0〜100の範囲で指定      |
| BROWSERSLIST   | string                           | 対象ブラウザの指定                                          |
| VHOST          | string                           | Docker で使用するホスト名を指定                             |
| ENABLE_VHOST   | boolean                          | BrowserSync でバーチャルホストを開く                        |
| SITE_NAME      | string                           | ネットワーク・コンテナ名に使用                              |
| DEV_ROOT       | string                           | Development モードで出力するディレクリ                      |
| DEV_WATCH      | boolean                          | Development モードでのファイル監視                          |
| DEV_BEAUTIFY   | boolean                          | Development モードでの HTML の Beautify                     |
| DEV_DEVTOOL    | string                           | Development モードでのソースマップの出力形式                |
| PRD_ROOT       | string                           | Production モードで出力するディレクトリ                     |
| PRD_WATCH      | boolean                          | Production モードでのファイル監視（静的構築時のみ true 可） |
| PRD_BEAUTIFY   | boolean                          | Production モードでの HTML の Beautify                      |
| MAKE_WEBP      | boolean                          | WebP の出力                                                 |
| PXTOREM        | boolean                          | CSS に記載した px を rem に変換                             |
| WORDPRESS\_`*` | string, boolean                  | WordPress（wp-config）の設定                                |
| MYSQL\_`*`     | string                           | MySql 設定                                                  |
| PMA\_`*`       | string                           | phpMyAdmin 設定                                             |

- `PRD_WATCH` は、静的構築時の場合（`ENABLE_VHOST` が `false`）のみ `true` で正常に表示されます。

---

## 使用するコマンド

### Docker

#### Build

```sh
docker-compose build
```

#### Up

```sh
docker-compose up -d
```

#### Down

```sh
docker-compose down
```

### NPM

#### Package Install

```sh
npm i
```

#### Development

```sh
npm start
```

`npm start local` のように上記コマンドの後ろに `BS_OPEN` の設定を入力することで `.env` に設定した内容を上書きして立ち上げることが可能。

#### Production

```sh
npm run build
```

---

## 機能（コーディング）

- [Pug](https://pugjs.org/api/getting-started.html) ([pug-cli](https://github.com/pugjs/pug-cli)) / [EJS](https://ejs.co/) ([ejs-cli](https://github.com/fnobi/ejs-cli))
- [Sass](https://sass-lang.com/) ([dart-sass](https://github.com/sass/dart-sass))
- [PostCSS](https://postcss.org/) ([postcss-cli](https://github.com/postcss/postcss-cli))
  - [Autoprefixer](https://github.com/postcss/autoprefixer)
  - [clean-css](https://github.com/clean-css/clean-css) ([clean-css-cli](https://github.com/clean-css/clean-css-cli))
- [webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)
- [imagemin](https://github.com/imagemin/imagemin) ([imagemin-cli](https://github.com/imagemin/imagemin-cli))
- [Stylelint](https://stylelint.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Browsersync](https://browsersync.io/)

### コンパイル対象外の指定

ファイル名の先頭に `_` が入るファイルは出力されません。

### HTML - Pug / EJS

テンプレートエンジンはどちらも使用できます。
また、html ファイルで ejs を使用できます。

#### インクルードについて

インクルードのディレクトリに指定はありません。
インクルードファイルの指定は通常通り相対パスで記載することもできますが、`/` から始まるルート相対パスで記載することも可能です。

#### パスの書き換え

ファイルに記載しているパスに `DEV_ROOT` が含まれている場合、パスから削除してコンパイルします。

### webpack

#### 出力する JS / CSS ファイルを追加

_webpack.config.js: Line 32-35_
```
entry: {
  "js/app": paths.src.js + "/index.js",
  "css/app": paths.src.css + "/app.scss",
},
```
JS / CSSファイルを複数出力したい場合は`webpack.config.js`の`entry`の項目に追記します。
書式は下記のようになります。
```
"出力ディレクトリ/拡張子無しの出力ファイル名: srcのファイルパス",
```

### CSS - Sass / PostCSS (Autoprefixer, clean-css) / webpack

`@use`でワイルドカード`*`を使えます。

```scss
@use "pages/*";
```

#### ライブラリの使用

`/` から始まるルート相対パスで記載することができます。

```scss
@use "/node_modules/path/to/file.ext";
```

### 画像圧縮 - imagemin

`*.jpg`, `*.jpeg`, `*.png`, `*.gif`, `*.svg` を圧縮します。
`.env` の `MAKE_WEBP` を `true` にすることでJPEGもしくはPNGファイルからWebPを作成します。
ファイル名は元の拡張子のうしろに `.webp` が付く形 `*.jpg.webp`, `*.jpeg.webp`, `*.png.webp` になります。

### 構文チェック - Stylelint / ESLint

タスクには含まず、エディタ側で機能します。
リンター単体でのコード整形は行いません。  
設定したルールに沿って警告・エラーをコンソールに出力します。

#### 設定変更

デフォルトでは推奨設定を使用しています。  
変更する場合は各設定ファイルを編集してください。

_Stylelint_  
`.stylelintrc.js`

_ESLint_  
`.eslintrc.js`

### コード整形 - Prettier

タスクには含まず、エディタ側で機能します。  
Stylelint / ESLint の設定と Prettier の設定に沿って保存時にコード整形を行います。

### 設定変更

設定を変更する場合はルートの `.prettierrc.js` を編集してください。
※ Prettier は基本的にはデフォルト設定で整形されるようにしていますが `.prettierrc.js` で `printWidth: 999` を設定してコードの自動改行のみ制御しています。必要なければ削除してください。

### コード整形を有効にするファイル

javascript と scss ファイルでコード整形が有効になっています。
他のファイルも有効にしたい場合は `.vscode/settings.json` を編集してください。

### ターゲットブラウザの設定

https://github.com/browserslist/browserslist#queries

ターゲットブラウザは各ブラウザの最新 2 バージョンとしています。  
変更する場合は `.env` を編集してください。

```
BROWSERSLIST="last 2 version"
```

### 同梱ライブラリ

- [normalize.css](https://necolas.github.io/normalize.css/) (v8.0.1)
- [html5-reset](https://github.com/murtaugh/HTML5-Reset) (v2.1.3)
- [jquery](https://jquery.com/) (v3.6.0)

※ jquery はインポート不要で使用可能にしています。

---

## 機能（Docker）

### WordPress の設定

getenv_docker を利用しているので `wp-config.php` ファイルはありません。
`.env` に書かれている情報を読み込んで WordPress が起動しますので、必要な場合は `.env` を編集してください。

### BrowserSync

BrowserSync で Docker のバーチャルホストを開くには、`.env` の `ENABLE_VHOST` を `true` に設定し、hosts ファイルにバーチャルホストを追記します。

### データベースの保存と復元

DB を保存して GitHub でチームメンバーと共有することができます。
DB は `docker/mysql/db_dump` に GZIP で圧縮されて格納されます。
初めてプロジェクトの Docker を立ち上げる場合には、自動的に上記ディレクトリに保存された DB が復元されます。
以降、DB を保存・復元したいタイミングで下記のコマンドを使用してください。

#### データベースのバックアップ

```sh
make dump
```

#### データベースの復元

```sh
make restore
```

- データベースの復元時には確認メッセージが表示されます。

### phpMyAdmin

http://localhost:8000/

### mailhog

http://localhost:8025/

### Xdebug

Xdebug を導入しているので PHP のエラー表示や `var_dump` が見やすく整形された状態で表示されます。
古い PHP で使用する際には Dockerfile の書き換えが必要な場合があります。

### プラグインの自動インストール

- [WP Multibyte Patch](https://ja.wordpress.org/plugins/wp-multibyte-patch/)
- [Classic Editor](https://ja.wordpress.org/plugins/classic-editor/)
- [All-in-One WP Migration](https://ja.wordpress.org/plugins/all-in-one-wp-migration/)
- All-in-One WP Migration File Extension

---

## 更新履歴

### 2.0.0 (2023-01)

- gulp 廃止、npm-scripts & JavaScript に移行

### 2.1.0 (2023-01)

- `app.scss` で、ルート相対パスでライブラリの指定を可能に変更
- コンパイル完了後に自動で BrowserSync が起動するように変更

### 2.2.0 (2023-02)

- `.env` で、画像の圧縮品質を指定できるように変更
- 画像タスクで圧縮前・圧縮後のファイルサイズと圧縮率を表示

### 2.3.0 (2023-02)

- JS / CSSファイルを複数出力可能に変更
