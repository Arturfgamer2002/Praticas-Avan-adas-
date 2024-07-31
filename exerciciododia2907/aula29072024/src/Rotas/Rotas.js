import React from 'react';

//Importar 3 objetos de lib
import {Route, Routes, BrowserRouter } from 'react-router-dom';

//Importar a página Home
import Home from '../Paginas/Home';

//Importar a página Cadastro
import Cadastro from '../Paginas/Cadastro';

function Rotas() {
    return (
        <BrowserRouter>
        <Routes>
            <Route element={<Home />} path='/' exact Component={Home}/>
            <Route element={<Cadastro />} path='/cadastro' Component={Cadastro}/>
        </Routes>
        </BrowserRouter>
    )
}

export default Rotas;