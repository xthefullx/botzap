const express = require('express');
const router = express.Router();
const { carregarDados, salvarDados } = require('../utils/arquivoHelper');

router.get('/', (req, res) => {
    const data = carregarDados();
    res.json(data.clientes);
});

router.post('/', (req, res) => {
    const { nome, whatsapp, data_expiracao } = req.body;
    const data = carregarDados();
    data.clientes.push({ nome, whatsapp, data_expiracao });
    salvarDados(data);
    res.json({ message: 'Cliente adicionado!' });
});

router.delete('/:whatsapp', (req, res) => {
    const { whatsapp } = req.params;
    const data = carregarDados();
    data.clientes = data.clientes.filter(c => c.whatsapp !== whatsapp);
    data.mensagens_enviadas = data.mensagens_enviadas.filter(msg => msg.whatsapp !== whatsapp);
    salvarDados(data);
    res.json({ message: 'Cliente removido e mensagens excluídas!' });
});

module.exports = router;