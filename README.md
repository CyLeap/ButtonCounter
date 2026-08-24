# ButtonCounter

A full-stack web application developed as a team project using SvelteKit, TypeScript, and Turso.

## Overview

ButtonCounter is a simple counter web app built with SvelteKit and TypeScript, using Turso (libSQL) as the database. The click count is persisted to the database so it survives page reloads and is shared across users.

## Tech Stack

- **Framework:** SvelteKit
- **Language:** TypeScript
- **Database:** Turso (libSQL)
- **Database Client:** `@libsql/client`
- **Package Manager:** npm

## Requirements

Before setting up the project, make sure you have:

- Node.js
- npm
- Git
- A Turso account or access to the team's Turso database

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/CyLeap/ButtonCounter.git

cd ButtonCounter
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
TURSO_DATABASE_URL=your_turso_database_url
TURSO_AUTH_TOKEN=your_turso_auth_token
```

> **Note:** Never commit your `.env` file. Make sure it's listed in `.gitignore`.

### 4. Start the development server

```bash
npm run dev
```

Or start the server and open it in the browser automatically:


```bash
npm run dev -- --open
```

The app will be available at `http://localhost:5173` by default.

## Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run build`   | Build the app for production         |
| `npm run preview` | Preview the production build locally |
| `npm run check`   | Run type-checking (svelte-check)     |



# ボタンカウンター

SvelteKit、TypeScript、Tursoを使用してチームで開発したフルスタックWebアプリケーションです。

## 概要

ボタンカウンターは、SvelteKitとTypeScriptで構築したシンプルなカウンターWebアプリです。データベースにはTurso（libSQL）を使用しています。クリック数はデータベースに保存されるため、ページを再読み込みしても保持され、ユーザー間で共有されます。

## 技術スタック

* **フレームワーク:** SvelteKit
* **言語:** TypeScript
* **データベース:** Turso（libSQL）
* **データベースクライアント:** `@libsql/client`
* **パッケージマネージャー:** npm

## 必要な環境

プロジェクトをセットアップする前に、以下がインストールされていることを確認してください。

* Node.js
* npm
* Git
* Tursoアカウント、またはチームのTursoデータベースへのアクセス権

## セットアップ

### 1. リポジトリをクローンする

```bash
git clone https://github.com/CyLeap/ButtonCounter.git

cd ButtonCounter
```

### 2. 依存関係をインストールする

```bash
npm install
```

### 3. 環境変数を設定する

プロジェクトのルートディレクトリに`.env`ファイルを作成してください。

```env
TURSO_DATABASE_URL=your_turso_database_url

TURSO_AUTH_TOKEN=your_turso_auth_token
```

> **注意:** `.env`ファイルは絶対にコミットしないでください。`.gitignore`に`.env`が記載されていることを確認してください。

### 4. 開発サーバーを起動する

```bash
npm run dev
```

または、サーバーを起動して自動的にブラウザで開く場合：

```bash
npm run dev -- --open
```

デフォルトでは、アプリは`http://localhost:5173`で利用できます。

## 利用可能なスクリプト

| コマンド           |  説明                               |
| ----------------- | ------------------------------------|
| `npm run dev`     | 開発サーバーを起動する                |
| `npm run build`   | 本番環境用にアプリをビルドする         |  
| `npm run preview` | 本番用ビルドをローカルでプレビューする |
| `npm run check`   | 型チェック（svelte-check）を実行する  |
