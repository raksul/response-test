## Getting Started

blog: https://tech.raksul.com/2016/09/20/start_testing_from_here/

### 環境

- node >= 5.0

### 1. 環境構築

#### osx の場合

```sh
brew update
brew install node
npm install
```

### 2. テスト環境の設定

##### .env の作成

env.example から .env の作成

```sh
cp env.example .env
```

##### 各種設定

.env ファイルを編集する。それぞれの変数の意味は以下の通り

```sh
# env.example の説明
DEV_BASIC_AUTH_USERNAME=yamamoto     # Basic ユーザー名
DEV_BASIC_AUTH_PASSWORD=password     # Basic パスワード

LOGIN_FORM_PARAM_NAME_USER=mail      # 1. login form の post パラメータ(name=username、mailなどにあたる)
LOGIN_FORM_PARAM_NAME_PASSWORD=pass  # 2. login form の post パラメータ2(name=password)
LOGIN_USER=                          # 3. login するアカウント(1. のvalue にあたる)
LOGIN_USER_PASSWORD=                 # 4. login するアカウントのパスワード(2. のvalue にあたる)

PROTOCOL=https                       # https or http
BASE_DOMAIN=example.com              # テスト対象のドメイン
DEV_SUBDOMAIN=dev                    # 開発環境用のサブドメイン
STG_SUBDOMAIN=stage                  # stage用のサブドメイン

NODE_TLS_REJECT_UNAUTHORIZED=0       # 証明書のエラーを無視
```

### 3. テスト対象URLの設定

urls.js ファイルを編集する。それぞれの変数の意味は以下の通り

```JavaScript
# urls.js の説明
module.exports = {
  login: '/login/',  // login フォームのあるURL
  withoutAuth: [     // login 不要ページ一覧
    '/',
    '/privacy/',
  ],
  withAuth: [        // login 必要ページ一覧
    '/mypage/',
  ]
};
```

### 4. テスト実行

```sh
npm run test:prod #https://example.com
npm run test:dev  #https://dev.example.com
```

### 5. 参考

#### ディレクトリ構成


```sh
./
├── env.example                # 環境変数の設定例
├── global.conf.js             # 共通で利用する設定
├── mocha.init.js              # mocha で利用するライブラリなどの読み込み
├── mocha.opts                 # mocha のオプション
├── package.json               # 実行スクリプトの設定など
├── readme.md
├── test                       # テストコードのディレクトリ
│   ├── withAuth.spec.js
│   └── withNoAuth.spec.js
└── urls.js                    # 対象URL一覧 (ここにすべてのURLを書く)

```

#### 実行順序

テストを実行すると以下のように読み込まれる

1. mocha.opts (mocha オプション設定）
2. mocha.init.js (mocha で利用する共通部分）
  - global.conf.js を読み込んでテストで全体で利用する globals に格納する
    - global.conf.js では以下を実施
        - テスト対象の url を設定する (urls.js)
        - .env 環境変数を設定する
        - NODE_ENV から ベースのURLを設定する
  - 利用するライブラリの設定
3. test/*.spec.js を実行する
