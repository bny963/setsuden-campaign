# 節電チャレンジ！キャンペーンサイト

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Go](https://img.shields.io/badge/Go-1.22-00ADD8?logo=go&logoColor=white)

架空の節電キャンペーンを想定したランディングページです。  
フロントエンドに React (Vite)、バックエンドに Go を使用しています。

## 機能

- ヒーローセクション（キャッチコピー + CTAボタン）
- キャンペーン参加ステップをカードで表示
- 応募フォーム（バリデーション + Go APIへのPOST送信）
- 送信後のサンクス画面
- レスポンシブ対応

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

**1. バックエンド（Go）を起動**

```bash
cd backend
go run main.go
# → http://localhost:8080 で起動
```

**2. フロントエンド（React）を起動**

```bash
cd setsuden-campaign
npm install
npm run dev
# → http://localhost:5173 で起動
```

ブラウザで http://localhost:5173 を開きます。

> Vite の `/api` プロキシ設定により、フロントエンドからの API リクエストは自動的に `:8080` に転送されます。

## 注意事項

このサイトはポートフォリオ用の架空キャンペーンサイトです。  
応募データはサーバーのメモリ上にのみ保存されます（再起動でリセット）。
