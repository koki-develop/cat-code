<p align="center">
<img src="./assets/screenshot.png" alt="Cat Code" width="600px" />
</p>

<p align="center">
<a href="https://www.npmjs.com/package/cat-code">
  <img src="https://img.shields.io/npm/v/cat-code" alt="NPM Version" />
</a>
<a href="https://github.com/koki-develop/cat-code/actions/workflows/release-please.yml">
  <img src="https://img.shields.io/github/actions/workflow/status/koki-develop/cat-code/release-please.yml" alt="GitHub Actions Workflow Status" />
</a>
<a href="./LICENSE">
  <img src="https://img.shields.io/github/license/koki-develop/cat-code" alt="GitHub License" />
</a>
</p>

<p align="center">
Cat Code は猫とともに開発ができる次世代のコーディングエージェントです。
</p>

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
