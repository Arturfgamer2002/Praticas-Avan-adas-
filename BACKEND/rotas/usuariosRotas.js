
//Importa o modulo Express
const express = require('express');

//Cria o objeto rotas
const router = express.Router();

//Importa o modulo usuarioController
const usuarioController = require('../controllers/usuarioController');

//criar a rota inserir artista
/**
 * @swagger
 * /inserirArtistas:
 *   post:
 *     summary: Inseri um novo Artista
 *     tags: [inserirArtistas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nome:
 *                 type: string
 *               Artista:
 *                 type: string
 *               Genero:
 *                 type: string
 *               Album:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario criado
 *       500:
 *         description: Erro ao criar usuario
 */
router.post('/inserirArtistas', usuarioController.inserirArtista);



//criar a rota buscar artista
/**
 * @swagger
 * tags:
 *   name: Artistas
 *   description: Busca todos os artistas
 */

/**
 * @swagger
 * /buscarId/{id}:
 *   get:
 *     summary: Buscar registro por ID
 *     tags: [Artista]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do artista
 *     responses:
 *       200:
 *         description: Buscar registro por ID
 */
router.get('/buscarId/:id', usuarioController.buscarId);





//criar a rota buscar artistas por nome
/**
 * @swagger
 * tags:
 *   name: Artistas
 *   description: Busca todos os artistas por nome
 */

/**
 * @swagger
 * /buscarArtistaPorNome/{nome}:
 *   get:
 *     summary: Busca todos os artistas por nome
 *     tags: [Artistas]
 *     parameters:
 *       - in: path
 *         name: Nome
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome do artista
 *     responses:
 *       200:
 *         description: Busca todos os artistas por nome
 */
router.get('/buscarArtistaPorNome/:nome', usuarioController.buscarArtistaPorNome);



//criar a rota buscar usuarios
/**
 * @swagger
 * tags:
 *   name: Artistas
 *   description: Busca todos os Artistas
 */

/**
 * @swagger
 * /Artistas:
 *   get:
 *     summary: Retorna a lista de todos os artistas
 *     tags: [Artistas]
 *     responses:
 *       200:
 *         description: A lista de artistas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/Artistas', usuarioController.getArtistas);


//criar a rota editar usuarios
/**
 * @swagger
 * /atualizarArtista/{id}:
 *   put:
 *     summary: Atualiza um artista existente
 *     tags: [Artistas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do artista
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nome:
 *                 type: string
 *               Artista:
 *                 type: string
 *               Genero:
 *                 type: string
 *               Album:
 *                 type: string
 *     responses:
 *       200:
 *         description: Artista atualizado
 *       404:
 *         description: Artista não encontrado
 *       500:
 *         description: Erro ao atualizar Artista
 */
router.put('/atualizarArtista/:id', usuarioController.updateArtista);

//criar a rota deletar artista
/**
 * @swagger
 * /excluirArtista/{id}:
 *   delete:
 *     summary: Deletar um artista existente
 *     tags: [Artistas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do artista
 *     responses:
 *       204:
 *         description: Artista deletado
 *       404:
 *         description: Artista não encontrado
 *       500:
 *         description: Erro ao deletar Artista
 */
router.delete('/excluirArtista/:id', usuarioController.deleteArtista);


//exporta as rotas criadas
module.exports = router;