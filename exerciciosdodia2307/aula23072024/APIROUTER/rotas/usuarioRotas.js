
//Importa o modulo Express
const express = require('express');

//Cria o objeto rotas
const router = express.Router();

//Importa o modulo usuarioController
const usuarioController = require('../controllers/usuarioController');

//criar a rota criar usuario
/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               idade:
 *                 type: integer
 *               cidade:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario criado
 *       500:
 *         description: Erro ao criar usuario
 */
router.post('/usuarios', usuarioController.createusuario);



//criar a rota buscar usuarios
/**
 * @swagger
 * tags:
 *   name: Usuario
 *   description: Busca todos os usuários
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Retorna a lista de todos os usuários
 *     tags: [Usuario]
 *     responses:
 *       200:
 *         description: A lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/usuarios', usuarioController.getusuarios);

// Criar a rota buscar usuário pelo nome
/**
 * @swagger
 * /usuarios/nome/{nome}:
 *   get:
 *     summary: Retorna um usuário pelo nome
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: nome
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao buscar usuário
 */
router.get('/usuarios/nome/:nome', usuarioController.getusuarioByName);

// Buscar usuários por cidade
/**
 * @swagger
 * /usuarios/cidade/{cidade}:
 *   get:
 *     summary: Retorna todos os usuários de uma cidade específica
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: cidade
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome da cidade
 *     responses:
 *       200:
 *         description: A lista de usuários na cidade especificada
 *       404:
 *         description: Nenhum usuário encontrado nesta cidade
 *       500:
 *         description: Erro ao buscar usuários por cidade
 */
router.get('/usuarios/cidade/:cidade', usuarioController.getUsuariosByCity);

//criar a rota editar usuarios
/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               idade:
 *                 type: integer
 *               cidade:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao atualizar usuário
 */
router.put('/usuarios/:id', usuarioController.updateusuario);

//criar a rota deletar usuario
/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Deletar um usuário existente
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       204:
 *         description: Usuário deletado
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao deletar usuário
 */
router.delete('/usuarios/:id', usuarioController.deleteusuario);


//exporta as rotas criadas
module.exports = router;