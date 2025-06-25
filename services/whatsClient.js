const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const { verificarVencimentos, lidarComMensagem } = require('./mensagemService');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
});

let qrCodeData = null;
let conectado = false;

client.on('qr', qr => {
    console.log("🔁 Novo QR code gerado");
    qrcode.toDataURL(qr, (err, url) => {
        if (!err) {
            qrCodeData = url;
        } else {
            console.error("Erro ao gerar QR:", err);
        }
    });
});

client.on('ready', () => {
    conectado = true;
    qrCodeData = null;
    console.log("✅ Bot conectado!");
    setInterval(verificarVencimentos, 5000);
});

client.on('disconnected', () => {
    conectado = false;
    qrCodeData = null;
    console.log("❌ Bot desconectado");
    client.initialize();
});

client.on('message', lidarComMensagem);

module.exports = {
    iniciar: () => client.initialize(),
    getQrCode: () => qrCodeData,
    isConectado: () => conectado
};
