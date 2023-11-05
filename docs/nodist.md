# [nodist](https://github.com/nullivex/nodist)

## インストール

**※ Node.js をインストール済みの場合はアンインストールしてから行ってください。**

1. 最新版のインストーラーをダウンロード

   https://github.com/nullivex/nodist/releases

2. インストーラーを起動し画面の指示に従ってインストールを実行

3. nodist のバージョンを確認

   ```sh
   nodist -v
   ```

   nodist のバージョンが表示されることを確認してください。

4. nodist 経由で Node.js をインストール

   ```sh
   nodist add <version>
   ```

5. npm のアップデート

   インストールした Node.js のバージョンに対応する npm をインストールします。

   **新たに異なるバージョンの Node.js を追加した場合も毎回行ってください。**

   **ローカルで `.node-version` に記載されたバージョンに自動で切り替わっても npm のアップデートは毎回行う必要があります。（すでにインストール済みの場合を除く）**

   ```sh
   nodist npm match
   ```

6. グローバルに Node.js を設定

   ローカルに `.node-version` が無い場合はグローバルの Node.js を使用するため設定が必要になります。

   ```sh
   nodist global <version>
   ```

7. Node.js のバージョンを確認

   ```sh
   node -v
   ```

   Node.js のバージョンが表示されることを確認してください。

## よく使うコマンド

### ローカルの Node.js バージョンを指定する

`.node-version` が生成 or 更新されます。

```sh
nodist local <version>
```

### インストール済みの Node.js 一覧を確認する

```sh
nodist list
```
