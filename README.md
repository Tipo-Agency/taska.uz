<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1Ww4TeBH2MPLNBARl8L7yKD1jkHqlQad6

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:  
   `npm install`
2. (Optional) Create [.env.local](.env.local) for any future local env vars.
3. Run the app:  
   `npm run dev`

## Deploy

Автодеплой настроен через GitHub Actions (как в `tipa.uz`).

1. В репозитории на GitHub должны быть заданы Secrets:
   - `SERVER_HOST` — домен или IP сервера
   - `SERVER_USER` — пользователь (например, `deploy`)
   - `SERVER_PATH` — путь до папки проекта на сервере (где лежит git‑репозиторий)
   - `SERVER_SSH_KEY` — приватный SSH‑ключ
2. При push в ветку `main` GitHub Action `.github/workflows/deploy.yml`:
   - заходит по SSH на сервер,
   - делает `git fetch && git reset --hard origin/main`,
   - выполняет `npm install` и `npm run build`.
