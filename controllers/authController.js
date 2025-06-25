const express = require('express');
const router = express.Router();
const usuarios = { 'admin': 'admin' };
const usuariosAutenticados = [];

router.post('/', (req, res) => {
    const { usuario, senha } = req.body;
    if (usuarios[usuario] === senha) {
        const token = `${usuario}-${Date.now()}`;
        usuariosAutenticados.push(token);
        return res.json({ message: 'Login bem-sucedido', token });
    }
    res.status(401).json({ message: 'Credenciais inválidas' });
});

module.exports = router;