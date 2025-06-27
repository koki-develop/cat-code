[![NPM Version](https://img.shields.io/npm/v/cat-code)](https://www.npmjs.com/package/cat-code)
[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/koki-develop/cat-code/release-please.yml)](https://github.com/koki-develop/cat-code/actions/workflows/release-please.yml)
[![GitHub License](https://img.shields.io/github/license/koki-develop/cat-code)](./LICENSE)

<img src="./assets/screenshot.png" width="600px" />

_**Cat Code**_ は猫とともに開発ができる次世代のコーディングエージェントです。

## 使い方

```sh
$ npx cat-code@latest

# セーフモード
$ npx cat-code@latest --safe
```

## 機能

Cat Code にメッセージを送信すると、猫は一定確率でランダムなテキストファイルを書き換えます。  
書き換えられるファイルの選択方法は作業ディレクトリの状態によって異なります。

- **git が初期化されているディレクトリの場合**
  - git 管理されているテキストファイルをランダムで選択して編集します
  - `.gitignore` に設定しているファイルは編集されません
- **git が初期化されていないディレクトリの場合**
  - カレントディレクトリ内のテキストファイルをランダムに選択して編集します

セーフモードが有効になっている場合 ( `--safe` フラグ ) はファイルの編集は実行されません。

## ライセンス

[MIT](./LICENSE)
