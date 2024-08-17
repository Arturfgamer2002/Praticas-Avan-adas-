
//Importa o objeto usuario
const Usuario = require('../modelo/usuario');

//Importar para acessar os operadores do Sequelize
const { Op } = require('sequelize');


// Criar um novo usuário
exports.inserirArtista = async (req, res) => {
  const { Nome, Artista, Genero, Album } = req.body;
  try {
    const novoUsuario = await Usuario.create({ Nome, Artista, Genero, Album});
    res.status(201).json(novoUsuario);
  } catch (err) {
    console.log('Erro ao criar Artista');
    res.status(500).json({ error: 'Erro ao criar Artista'});
  }
};

// Obter todos os usuários
exports.getArtistas = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter Artista' });
  }
};

// Atualizar um usuário
exports.updateArtista = async (req, res) => {
  const { id } = req.params;
  const { Nome, Artista, Genero, Album } = req.body;
  try {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      usuario.Nome = Nome;
      usuario.Artista = Artista;
      usuario.Genero = Genero;
      usuario.Album = Album;
      usuario.updatedAt = new Date();
      await usuario.save();
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ error: 'Artista não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar Artista' });
  }
};



// buscar por ID do usuário
exports.buscarId = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);

    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ error: 'Artista não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar o Artista' });
  }
};


// buscar por nome de usuário
exports.buscarArtistaPorNome = async (req, res) => {
  const {nome} = req.params;
  try {
    const usuario = await Usuario.findAll({ where: { nome: {  [Op.like]: `%${nome}%` } } });

    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ error: 'Nenhum nome de Artista não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar o por nome Artista' });
  }
};



// Deletar um usuário
exports.deleteArtista = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      await usuario.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Artista não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar Artista' });
  }
};