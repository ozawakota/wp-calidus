# [nodenv](https://github.com/nodenv/nodenv)

## インストール (Homebrew)

1. Homebrew から nodenv をインストール

   ```sh
   $ brew install nodenv
   ```

2. パスを通す

   利用しているシェルに応じて次のコマンドを実行してください。

   _bash_

   ```sh
   $ echo 'eval "$(nodenv init -)"' >> ~/.bashrc
   ```

   _zsh_

   ```sh
   $ echo 'eval "$(nodenv init -)"' >> ~/.zshrc
   ```

3. ターミナルを再起動し、nodenv のバージョンを確認

   ```sh
   $ nodenv -v
   ```

   nodenv のバージョンが表示されることを確認してください。

4. nodenv 経由で Node.js をインストール

   ```sh
   $ nodenv install <version>
   ```

   \* [M1 Mac で古い Node.js がインストールできない場合](#m1-mac-で古い-nodejs-がインストールできない場合)

5. インストールした Node.js のバージョンを nodenv に認識させる

   **新たに異なるバージョンの Node.js を追加した場合も毎回行ってください。**

   ```sh
   $ nodenv rehash
   ```

6. グローバルに Node.js を設定

   ローカルに `.node-version` が無い場合はグローバルの Node.js を使用するため設定が必要になります。

   ```sh
   $ nodenv global <version>
   ```

7. ターミナルを再起動し、Node.js のバージョンを確認

   ```sh
   $ node -v
   ```

   Node.js のバージョンが表示されることを確認してください。

### インストールしたいバージョンの Node.js が見つからない場合

```sh
$ brew upgrade nodenv node-build
```

## インストール (Homebrew + [anyenv](https://github.com/anyenv/anyenv))

anyenv を使用する場合

1. Homebrew から anyenv をインストール

   ```sh
   $ brew install anyenv
   ```

2. パスを通す

   利用しているシェルに応じて次のコマンドを実行してください。

   _bash_

   ```sh
   $ echo 'eval "$(anyenv init -)"' >> ~/.bashrc
   ```

   _zsh_

   ```sh
   $ echo 'eval "$(anyenv init -)"' >> ~/.zshrc
   ```

3. ターミナルを再起動し、複数の env をインストールするためのセットアップを行う

   ```sh
   $ anyenv install --init
   ```

   Do you want to checkout ? [y/N]: と表示されたら y を入力してください。

4. anyenv のバージョンを確認

   ```sh
   $ anyenv -v
   ```

   anyenv のバージョンが表示されることを確認してください。

5. anyenv 経由で nodenv をインストール

   ```sh
   $ anyenv install nodenv
   ```

6. nodenv のバージョンを確認

   ```sh
   $ nodenv -v
   ```

   nodenv のバージョンが表示されることを確認してください。

7. nodenv 経由で Node.js をインストール

   ```sh
   $ nodenv install <version>
   ```

   \* [M1 Mac で古い Node.js がインストールできない場合](#m1-mac-で古い-nodejs-がインストールできない場合)

8. インストールした Node.js のバージョンを nodenv に認識させる

   **新たに異なるバージョンの Node.js を追加した場合も毎回行ってください。**

   ```sh
   $ nodenv rehash
   ```

9. グローバルに Node.js を設定

   ローカルに `.node-version` が無い場合はグローバルの Node.js を使用するため設定が必要になります。

   ```sh
   $ nodenv global <version>
   ```

10. ターミナルを再起動し、Node.js のバージョンを確認

    ```sh
    $ node -v
    ```

    Node.js のバージョンが表示されることを確認してください。

11. [anyenv-update](https://github.com/znz/anyenv-update) をインストール
    ```sh
    $ mkdir -p $(anyenv root)/plugins # プラグインを格納するディレクトリを作成
    $ git clone https://github.com/znz/anyenv-update.git $(anyenv root)/plugins/anyenv-update # インストール実行
    ```

### インストールしたいバージョンの Node.js が見つからない場合

※ すべての \*\*env 及びすべてのプラグインを更新します。

```sh
$ anyenv update
```

## よく使うコマンド

### ローカルの Node.js バージョンを指定する

`.node-version` が生成 or 更新されます。

```sh
$ nodenv local <version>
```

### インストール済みの Node.js 一覧を確認する

```sh
$ nodenv versions
```

## M1 Mac で古い Node.js がインストールできない場合

古いバージョンの Node.js は arm に対応していないため、Intel コンソールの状態にすることでインストール可能になります。

1. ターミナル.app を右クリック → 情報を見る
2. <!-- prettier-ignore -->"Rosettaを使用して開く" にチェック
3. ターミナルを再起動し `$ nodenv install <version>` を実行
4. <!-- prettier-ignore -->インストール完了後は "Rosettaを使用して開く" のチェックを外す
