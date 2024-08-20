# 【Cloudflare Workers】今からでも遅くない！！OpenAI API+LangChainを使ったAPIを作る

## YouTube

[!["【Cloudflare Workers】今からでも遅くない！！OpenAI API+LangChainを使ったAPIを作る"](https://i.ytimg.com/vi/ViLEETSKaAI/maxresdefault.jpg)](https://youtu.be/ViLEETSKaAI)

## 技術選定

- Bun
- TypeScript
- Hono
- Zod
- OPENAI API
- LangChain
- Cloudflare Workers

## 初期設定

### NodeModule をインストール

```bash
bun install
```

### OPENAI API KEYを設定

ファイル`.dev.vars.sample`を`.dev.vars`に変更して、OPENAI API KEYを指定する

```sh:.dev.vars
OPENAI_API_KEY=<OPENAI API KEY>
```
