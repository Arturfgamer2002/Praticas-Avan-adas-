// Sync do sequilize com nosso banco de dados, as tabelas sejrep mapeandas de forma correta
// IIFE (Immediately invoked Function Expression) função em JavaScript que é executada assim que definida

(async () => {
    const DATABASE = require('./DATA_BASE/db');
    const Usuario = require('./modelo/usuarios');

    try {
        const resultado = await DATABASE.sync();
        console.log(resultado);
    } catch (error) {
        console.log(error);
    }

    //Insere registro via sequelize
    const resultadoCreate = await Usuario.create({
        nome:'ARTUR',
        idade: 24,
        cidade: 'SÃO PAULO'
    })
    console.log(resultadoCreate);
    
    //Buscar os registros inseridos
    const usuarios = await Usuario.findAll();
    console.log(usuarios);


    const usuario = await Usuario.findByPk(1);
    console.log(usuario);

    //Alterar registro
    const alterarUsuario = await Usuario.findByPk(1);
    alterarUsuario.nome = "REGISTRO ALTERADO";
     
    const resultadoSave = await alterarUsuario.save();
    console.log(resultadoSave);

    //Deletar registro
    const deletarRegistro = await Usuario.findByPk(2);
    deletarRegistro.destroy();
    console.log(deletarRegistro);

})();
