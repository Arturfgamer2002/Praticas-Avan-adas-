
const express = require('express');
const sequelize = require('./data_base/db');
const usuariosRotas = require('./rotas/usuariosRotas');
const UploadArquivosRota = require('./rotas/UploadArquivosRota')
const CadastroRota = require('./rotas/CadastroRota')
const ValidarToken = require('./rotas/tokenRotas')


//Importar o modulo Swagger
const setupSwagger = require('./swagger');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT;

app.use(require("cors")())

const corsOptions = {
  origin : 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
}

app.use(cors(corsOptions))
app.use(express.json());
app.use('/api', usuariosRotas,UploadArquivosRota,CadastroRota,ValidarToken);


// Configurar Swagger
setupSwagger(app);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});










