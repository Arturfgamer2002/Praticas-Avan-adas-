//Importa o modulo do mysql
const mysql = require('mysql2/promise');

const client = mysql.createPool(process.env.CONNECTION_STRING);
 
//Busca todos os usuarios
async function selectUsuarios() {
    const res = await client.query('SELECT * FROM USUARIOS');
    return res[0];
}

//Buscar usuario pelo ID
async function selectUsuaroPorId(id) {
    const res = await client.query('SELECT * FROM USUARIOS WHERE ID=?', [id]);
    return res[0];
}

//Deleta o usuario pelo id
async function deleteUsuaroPorId(id) {
    const res = await client.query('DELETE FROM USUARIOS WHERE ID=?', [id]);
}

//Insere novo registro
async function insertUsuario(usuario) {
    const sql = 'INSERT INTO USUARIOS(nome,idade,cidade) VALUES (?,?,?);';
    const values = [usuario.nome,usuario.idade,usuario.cidade];
    await client.query(sql, values);
}

//Atualizar usuario
async function updadeUsuario(id, usuario) {
    const sql = 'UPDATE USUARIOS SET nome=?, idade=?, cidade=? WHERE id=?';
    const values = [usuario.nome,usuario.idade,usuario.cidade];
    await client.query(sql, values);  
}

module.exports = { selectUsuarios, selectUsuaroPorId, deleteUsuaroPorId, insertUsuario, updadeUsuario};