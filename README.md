# 🤖 BotZap

Painel moderno de controle para seu bot de WhatsApp automatizado, feito com Node.js + HTML/CSS + API do WhatsApp 📲

---

## 🚀 Como instalar e rodar

Siga os passos abaixo para iniciar seu painel THEFULLBOT localmente:

### 1️⃣ Instale as dependências

```bash
npm install
```

### 2️⃣ Inicie o bot

```bash
node bot.js
```

> 💡 Certifique-se de que o arquivo principal do seu projeto é `bot.js`. Caso seja `index.js`, `server.js` ou outro, substitua.

### 3️⃣ Acesse o painel no navegador

Abra o navegador e vá até:

```
http://localhost:3000
```

Você verá o painel do THEFULLBOT carregado com sucesso ✅

---

## 📸 Como conectar o WhatsApp

1. Faça login com seu usuário e senha.
2. No menu lateral, clique em **"Status do Bot"**.
3. Escaneie o QR Code usando o WhatsApp no seu celular.
4. Quando o status indicar "Conectado", o bot estará pronto para funcionar 🔄📱

---

## 🗂 Estrutura do Projeto

```
📁 public/
├── index.html        → Interface do painel
├── style.css         → Estilo do painel
├── script.js         → Funcionalidades do painel

📁 controllers/        → Controladores (login, clientes, etc)
📁 services/           → Conexões com API do WhatsApp
📄 bot.js              → Arquivo principal do servidor
```

---

## ⚙️ Requisitos

- Node.js 16 ou superior
- npm (gerenciador de pacotes do Node)

---

## 🙌 Autor

Desenvolvido com ❤️ por [@xthefullx](https://github.com/xthefullx)

© 2025 BotZap – Todos os direitos reservados.
