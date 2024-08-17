import React from 'react';
//importa 3 objetos da lib 
import { Route, Routes, BrowserRouter } from 'react-router-dom';
//Importa a página Home
import Home from '../Paginas/Home';
//Importa a página Cadastro
import Cadastro from '../Paginas/Cadastro';
import ListaRegistros from '../Paginas/ListaRegistros';
import EditarRegistro from '../Paginas/EditarRegistro';
import Upload from  '../componentes/Upload';
import Login from  '../Paginas/Login';
import { AuthProvider } from '../autenticacao/autenticacao';
import PrivateRoute from '../autenticacao/rotasPrivadas';
import Cadastrodemusica from '../Paginas/Cadastrodemusica';
 
function Rotas() {
    return (
        <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastromusica" element={<Cadastrodemusica />} />
                <Route path="/" element={<PrivateRoute />}>
                    <Route path="/" element={<Home />} />
                </Route>   

                <Route path="/lista" element={<PrivateRoute />}>
                    <Route path="/lista" element={<ListaRegistros />} />
                </Route>
                <Route path="/editar/:id" element={<PrivateRoute />}>
                    <Route path="/editar/:id" element={<EditarRegistro />} />
                </Route>
                <Route path="/upload" element={<PrivateRoute />}>
                    <Route path="/upload" element={<Upload />} />
                </Route>   
            </Routes>
        </BrowserRouter>
    </AuthProvider>
    )
}
export default Rotas;