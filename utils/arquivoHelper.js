const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/data.json');
const messagesPath = path.join(__dirname, '../data/messages.json');

function carregarDados() {
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

function salvarDados(dados) {
    fs.writeFileSync(dataPath, JSON.stringify(dados, null, 2));
}

function carregarMensagens() {
    return JSON.parse(fs.readFileSync(messagesPath, 'utf8'));
}

module.exports = { carregarDados, salvarDados, carregarMensagens };