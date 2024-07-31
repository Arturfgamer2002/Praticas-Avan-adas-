 

import React from 'react';

//importa 3 objetos da lib 
import { Route, Routes, BrowserRouter } from 'react-router-dom';
 
//Importa a página Home
import Home from '../Paginas/Home';

//Importa a página Cadastro
import Cadastro from '../Paginas/Cadastro';
import ListaRegistros from '../Paginas/ListaRegistros';
 
function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path="/" exact component={Home}/>
                <Route element={<Cadastro />} path="/cadastro" component={Cadastro} />
                <Route element={<ListaRegistros />} path="/lista" component={ListaRegistros} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;