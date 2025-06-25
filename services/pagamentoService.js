const axios = require('axios');
const { ACCESS_TOKEN } = require('../config/settings');

async function criarPagamentoPix(numero, valor) {
    const url = "https://api.mercadopago.com/v1/payments";
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ACCESS_TOKEN}`
    };
    const data = {
        transaction_amount: valor,
        description: "Pix - Pagamento THEFULLNET",
        payment_method_id: "pix",
        payer: {
            email: "cliente@email.com",
            first_name: "Cliente",
            last_name: "Sobrenome",
            identification: {
                type: "CPF",
                number: "19119119100"
            },
            phone: {
                area_code: "11",
                number: numero
            }
        }
    };

    const response = await axios.post(url, data, { headers });
    return response.data.point_of_interaction.transaction_data.qr_code;
}

function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
}

module.exports = { criarPagamentoPix, delay };