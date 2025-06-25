const express = require('express');
const router = express.Router();
const settings = require('../config/settings');

router.get('/', (req, res) => {
    res.json(settings);
});

router.put('/', (req, res) => {
    const { access_token, empresaNome, planos } = req.body;

    if (access_token) settings.ACCESS_TOKEN = access_token;
    if (empresaNome) settings.empresaNome = empresaNome;
    if (planos && planos['1m'] && planos['6m'] && planos['1a']) {
        settings.planos = planos;
    } else if (planos) {
        return res.status(400).json({ message: 'Formato dos planos inválido.' });
    }

    res.json({ message: 'Configurações atualizadas com sucesso!' });
});

module.exports = router;