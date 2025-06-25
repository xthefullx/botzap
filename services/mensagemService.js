const { client } = require('./whatsClient');
const { carregarDados, salvarDados, carregarMensagens } = require('../utils/arquivoHelper');
const { empresaNome, planos } = require('../config/settings');
const { criarPagamentoPix, delay } = require('./pagamentoService');

function verificarVencimentos() {
    const data = carregarDados();
    const mensagens = carregarMensagens();
    const hoje = new Date();

    data.clientes.forEach(cliente => {
        const expira = new Date(cliente.data_expiracao);
        const diff = Math.ceil((expira - hoje) / (1000 * 60 * 60 * 24));
        let tipo = null;
        if (diff === 2) tipo = 'faltando_2_dias';
        if (diff <= 0) tipo = 'vencido';

        const jaEnviado = data.mensagens_enviadas.find(msg => msg.whatsapp === cliente.whatsapp && msg.tipo === tipo);
        if (tipo && !jaEnviado) {
            enviarMensagem(cliente, tipo);
            data.mensagens_enviadas.push({ whatsapp: cliente.whatsapp, tipo, data_envio: hoje.toISOString().split('T')[0] });
        }
    });

    salvarDados(data);
}

async function enviarMensagem(cliente, tipo) {
    let mensagem;
    if (tipo === 'vencido') {
        mensagem = `🤖 *${empresaNome}*
Olá ${cliente.nome}, sua assinatura expirou.
1️⃣ - ${planos['1m']}
2️⃣ - ${planos['6m']}
3️⃣ - ${planos['1a']}`;
    } else {
        mensagem = `🤖 *${empresaNome}*
Olá ${cliente.nome}, sua assinatura vence em 2 dias.
1️⃣ - ${planos['1m']}
2️⃣ - ${planos['6m']}
3️⃣ - ${planos['1a']}`;
    }
    try {
        await client.sendMessage(`${cliente.whatsapp}@c.us`, mensagem);
    } catch (e) {
        console.error("Erro ao enviar mensagem:", e);
    }
}

async function lidarComMensagem(message) {
    const from = message.from;
    const body = message.body.trim();
    const valores = { '1': 17.90, '2': 88.00, '3': 135.00 };

    if (valores[body]) {
        const valor = valores[body];
        const qr = await criarPagamentoPix(from.replace('@c.us', ''), valor);
        await delay(1000); client.sendMessage(from, `✅ Pix de R$ ${valor} gerado!`);
        await delay(1000); client.sendMessage(from, `Copia e Cola:
${qr}`);
    }
}

module.exports = { verificarVencimentos, enviarMensagem, lidarComMensagem };