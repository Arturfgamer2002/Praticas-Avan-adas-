
//Importa o modulo Express
const express = require('express');

//Cria o objeto rotas
const router = express.Router();

//Importa o modulo 
const usuarioController = require('../controllers/cadastroController');


router.post('/CadastrarUsuario', usuarioController.CadastrarUsuario);

router.post('/login', usuarioController.login);


module.exports = router;