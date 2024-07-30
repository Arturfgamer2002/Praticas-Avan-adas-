//Importa as configurações do arquivo de configuração
require('dotenv').config();

//Importa o módulo express
const express = require('express');

const app = express();

//Recebe o valor da porta do servidor
const port = process.env.PORT;

app.use(express.json());

//Importa o módulo db
const db = require('./DATABASE_PRIEX/db');

//Define uma rota para raiz ('/') que responde com 'Hello,World!'
app.get('/', (req,res) => {
    res.send('Hello, World!');
});

//busca todos os usuarios 
app.get('/usuarios', async (req,res) => {
    const results = await db.selectUsuarios(); 
    res.json(results);
});

//Busca usuarios pelo id
app.get('/usuarios/:id', async (req,res) => {
    const results = await db.selectUsuarioPortId(req.params.id);
    res.json(results);
});

// deletar usuarios pelo id
app.delete('/deletarusuario/:id', async (req,res) => {
    const results = await db.deleteUsuarioPortId(req.params.id);
    res.sendStatus(204);
});

//Insere umregistro novo
app.post('/cadastroUsuario', async (req,res) => {
    const {nome, idade, cidade} = req.body
    const usuario = {nome: nome, idade: idade, cidade: cidade};
    await db.insertUsuario(req.body);
    res.sendStatus(201);
});

//Atualizar o registro
app.patch('/editarusuarios/:id', async (req,res) => {
    await db.updateUsuario(req.params.id, req.body);
    res.sendStatus(200);
});

//Iniciar o servidor e escutar na porta definida
app.listen(port,() => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
});