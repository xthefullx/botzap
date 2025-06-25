const express = require('express');
const whatsClient = require('./services/whatsClient');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.use('/login', require('./controllers/authController'));
app.use('/clientes', require('./controllers/clienteController'));
app.use('/configuracoes', require('./controllers/configController'));


app.use('/status', (req, res) => {
    res.json({
        conectado: whatsClient.isConectado(),
        qr_code: whatsClient.getQrCode()
    });
});

require('./services/whatsClient').iniciar();

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});