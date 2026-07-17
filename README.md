# 節電チャレンジ！キャンペーンサイト

架空の節電キャンペーンを想定したランディングページです。  
フロントエンドに React (Vite)、バックエンドに Go を使用しています。

## 画面構成

| セクション | 内容 |
|---|---|
| ヘッダー | スティッキーナビゲーション |
| ヒーロー | キャッチコピー + CTAボタン |
| キャンペーンカード | 参加ステップを3枚のカードで説明 |
| 応募フォーム | 名前・メール・同意チェック（バリデーション付き） |
| フッター | 架空キャンペーン表記 |

## 技術スタック

**フロントエンド**
- React 19 / Vite
- CSS Modules

**バックエンド**
- Go 1.22
- 標準ライブラリのみ（`net/http`）

## ディレクトリ構成

```
.
├── backend/                  # Go APIサーバー
│   ├── go.mod
│   └── main.go
└── setsuden-campaign/        # React フロントエンド
    ├── public/
    ├── src/
    │   ├── App.jsx
    │   ├── index.css
    │   ├── main.jsx
    │   └── components/
    │       ├── Header.jsx
    │       ├── Hero.jsx
    │       ├── CampaignCards.jsx
    │       ├── ApplicationForm.jsx
    │       └── Footer.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## API

| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/entries` | 応募データを登録 |
| `GET` | `/api/entries` | 応募一覧を取得 |

**リクエスト例 (POST)**
```json
{
  "name": "山田 太郎",
  "email": "yamada@example.com"
}
```

**レスポンス例**
```json
{
  "id": 1,
  "name": "山田 太郎",
  "email": "yamada@example.com",
  "created_at": "2026-07-17T12:00:00+09:00"
}
```

## 起動方法

**バックエンド（Go）**

```bash
cd backend
go run main.go
# → http://localhost:8080 で起動
```

**フロントエンド（React）**

```bash
cd setsuden-campaign
npm install
npm run dev
# → http://localhost:5173 で起動
```

> Vite の `/api` プロキシ設定により、フロントエンドからの API リクエストは自動的に `:8080` に転送されます。
