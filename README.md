# discord_bot

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Discord.js-7289DA?style=for-the-badge&logo=discord&logoColor=white" alt="discord.js" />
  <img src="https://img.shields.io/badge/Dotenv-464646?style=for-the-badge&logo=dotenv&logoColor=white" alt="dotenv" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="axios" />
  <img src="https://img.shields.io/badge/DeepL-005FFF?style=for-the-badge&logo=deepl&logoColor=white" alt="DeepL" />
  <img src="https://img.shields.io/badge/n8n-FF3E00?style=for-the-badge&logo=n8n&logoColor=white" alt="n8n" />
</p>

---

## О проекте

`discord_bot` — это многофункциональный Discord-бот, реализованный на JavaScript с использованием библиотеки [discord.js](https://discord.js.org/).

Бот умеет:

-   Переводить сообщения пользователей через API сервиса [DeepL](https://www.deepl.com/pro#developer) и отправлять переводы в специальный Discord-канал.
-   Передавать данные сообщений и другую информацию на автоматизационную платформу [n8n](https://n8n.io/) через вебхуки для последующей обработки и интеграций.

Проект использует `dotenv` для безопасного хранения конфиденциальных данных (токенов, ключей), а `axios` — для HTTP-запросов к внешним API.

---

## Быстрый старт

1. Клонируйте репозиторий и перейдите в папку проекта:

```bash
git clone https://github.com/ManoilAlexandr/discord_bot.git
cd discord_bot
```

2. Установите зависимости:

```bash
npm install
```

3. Создайте .env файл в корне проекта и укажите переменные:

```bash
DISCORD_TOKEN=ваш_токен_бота
DEEPL_AUTH_KEY=ваш_ключ_DeepL_API
TARGET_CHANNEL_ID=ID_канала_для_переводов
```

4. Запустите бота:

```bash
npm start
```
