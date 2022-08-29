# 設定ガイド

---

## 初期設定

スタートガイドと同じ内容を記載する？

### 1. ダウンロードする資料を登録

管理画面にログインします。
管理画面のメニュー「ダウンロード資料 > 資料 > 追加する」にアクセスして資料を登録してください。
仮画像：https://diverta.gyazo.com/667f745e427ac3a121279706d98532a4

### 2. HubSpotとの接続

HubSpot側でアクセストークンを発行します。
管理画面のメニュー「HubSpot連携設定 > APIキーの設定 > 設定画面へ」にアクセスして設定してください。
仮画像：https://diverta.gyazo.com/7376d615350a8534d5604173e45c57d1

### 3. Google Tag Managerの設定

Google Tag Managerの管理画面より、以下のソースを追加してください。
```
const kurocoConfig = {
  "appId": 2, //固定です
  "hubId": 12345678, // 連携するHubSpotのIDを入力してください
};
```

### 4. 完成！動作確認しましょう

---

## カスタマイズ

Google Tag Managerまたは管理画面上で設定変更することでカスタマイズができます。

### カスタマイズできること
- メインカラーの変更（GTMで設定）
- サイト上へ導線ボタンの設置（GTMで設定）
- ロゴ画像の設置（管理画面で設定）
- サイト内のテキストの変更（管理画面で設定）

### Google Tag Managerの設定

#### メインカラーの変更

ボタンやテキストリンクで使用している「メインカラー」を変更できます。

```
const kurocoConfig = {
  "css_vars": {
    "--color-primary": "#1371ff" // メインカラーのカラーコード（6桁）を入力してください
  }
};
```

#### サイト上へ導線ボタンの設置

あなたのサイトに資料ダウンロードサイトへの導線ボタンを設置できます。
仮画像：https://diverta.gyazo.com/0f0152f1785f97973b1711a7974482d3
また、導線ボタンの位置を指定しているcssを変更できます。
仮画像：https://diverta.gyazo.com/69f97f12fbb90b96e84edbc496e6cc6d

```
const kurocoConfig = {
  "use_float_button": true, // 導線ボタンの設置 trueで有効、flaseで無効になります
  "popup_style": "bottom: 24px; right: 24px", // ボタンの設置位置を指定できます
};
```

#### 記述例

すべてのオプションを設定した場合は以下のようになります。

```
const kurocoConfig = {
  "appId": 2,　 //固定です
  "hubId": 12345678, // 連携するHubSpotのIDを入力してください
  "use_float_button": true, // 導線ボタンの設置 trueで有効、flaseで無効になります
  "popup_style": "bottom: 24px; right: 24px", // ボタンの設置位置を指定できます
  "css_vars": {
    "--color-primary": "#1371ff"  // メインカラーのカラーコード（6桁）を入力してください
  }
};
```

### 管理画面の設定

管理画面にログインします。
管理画面のメニュー「ダウンロード資料 > ヘッダーのロゴや文言などの表示部分 > 編集画面へ」にアクセスします。
仮画像：https://diverta.gyazo.com/5e2abeb3e7bc02d7a00cff3dc32a8e8f

仮画像：https://diverta.gyazo.com/96234f77cd62f3d1d80250f00bb2c791

#### 1. ロゴの設置
サイトのヘッダに表示するロゴ画像を設定できます。
仮画像：https://diverta.gyazo.com/aa755333a031f6c0543b1b24b276190f

#### 2. 資料一覧ページのテキスト
資料一覧ページの上部に表示するテキストを設定できます。
仮画像：https://diverta.gyazo.com/a666b0dd1cb1b3dcd8da7e5ff3f430ca

#### 3. ダウンロードページのテキスト
ダウンロードページの上部に表示するテキストを設定できます。
仮画像：https://diverta.gyazo.com/b6b8cbd9f2ed605a675010b753ca8861

#### 4. ダウンロードフォームのテキスト
ダウンロードフォームの下部に表示するテキストを設定できます。
利用規約やプライバシーポリシーなどの注意書きはこちらに設定してください。
仮画像：https://diverta.gyazo.com/4c8a3d58c8dfec2f983339cc564e08aa1

#### 5. ダウンロード完了ページのテキスト
ダウンロード完了後に表示するテキストを設定できます。
箇条書きリストやテキストリンクも設定可能です。
仮画像：https://diverta.gyazo.com/b58d42463b3aa406450ab105018daf53

#### 6. ダウンロード完了ページのボタン設置
ダウンロード完了後に表示するボタンを設置できます。
最大5つのボタンを設置できます。
仮画像：https://diverta.gyazo.com/0a79fb618d797bff0e02c578e08d74da
