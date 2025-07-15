const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express();
const PORT = 3000;


app.use(express.json());

app.use(express.static(path.join(__dirname, 'public/css')));


// PÁGINA PRINCIPAL
app.get('/', (req, res) => {
    const fileDirectory = path.resolve(__dirname, 'views/Menu');
    res.sendFile('menu.html', { root: fileDirectory });
});


// GET DADOS LANCES
app.get('/api/lanches', (req, res) => {
    const fileDirectory = path.resolve(__dirname, 'public/data/lanches.json');

    fs.readFile(fileDirectory, (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });
});


// SUGESTÃO RECEBIDA
app.get('/sugestao', (req, res) => {
    const name = req.query.nome;
    const seeds = req.query.ingredientes;

    if (name && seeds) {
        res.send(`<h1>Obrigado por surgerir um lanche!</h1><p>Enviaremos a receita de ${name} feito(a) de ${seeds} para nossa cozinha 🍔</p>`);
    } else {
        res.send('<p>Sugestão inválida</p>');
    }
});


// PÁGINA SUGESTÕES
app.get('/contato', (req, res) => {
    const fileDirectory = path.resolve(__dirname, 'views/Contato');
    res.sendFile('contato.html', { root: fileDirectory });
});


// CONTATO RECEBIDO
app.post('/contato', (req, res) => {
    const jsonData = req.body

    res.send(`<h1>Obrigado pelo contato ${jsonData.nome}!</h1><p>Recebemos sua mensagem e retornaremos assim que possível pelo e-mail: ${jsonData.email}<br/><br/><h2>Conteúdo recebido:</h2><b>${jsonData.assunto}</b><br/>${jsonData.mensagem}</p>`);
});


app.use((req, res) => {
    const fileDirectory = path.resolve(__dirname, 'public');
    res.status(404).sendFile('404.html', { root: fileDirectory });
});


app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});