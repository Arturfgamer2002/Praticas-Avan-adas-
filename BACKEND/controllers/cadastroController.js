
//Importa o objeto usuario
const Usuario = require('../modelo/Cadastro');

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

//Importar para acessar os operadores do Sequelize



// Criar um novo usuário
exports.CadastrarUsuario = async (req, res) => {
  const { Nome, Email, Senha } = req.body;
  const  HashedPassword =  getHashedPassword(Senha)
  try {
    const novoCadastro = await Usuario.create({ Nome, Email, Senha:HashedPassword});
    res.status(201).json(novoCadastro);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar Cadastro', err});
  }
};


exports.login = async (req,res) => {

    const {Email,Senha} = req.body

    console.log('login',Email)
    try{
      const usuario = await Usuario.findOne({where: {Email}})
      console.log('usuario...',usuario)
      if(usuario===null) {
        return res.status(400).send('Dados incorretos - cod 001!')
      }
      else{
        console.log('usuario email não encontrado', usuario.Email)
        const isPasswordValid = bcrypt.compareSync(Senha,usuario.Senha)

        if(!isPasswordValid){
          console.log('Dados incorretos - cod 002!')
          return res.status(400).send('Dados incorretos')
        }
        const token = jwt.sign({usuarioId: usuario.id}, process.env.JWT_KEY, { expiresIn: '60m' })
        res.send({token})
      }
    } catch (err) {
      console.log('error no login',err)
      res.status(400).send('Erro no login :' + err.message)
    }
  }

function getHashedPassword(Senha) {
    console.log('getHashedPassword', Senha)

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(Senha, salt)
    console.log('getHashedPassword.hashedPassword:',hashedPassword)
    return hashedPassword
  }