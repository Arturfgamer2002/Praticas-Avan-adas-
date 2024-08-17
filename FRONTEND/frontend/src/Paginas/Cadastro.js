import Header from '../Header';
import '../App.css';
import BotaoVoltar from '../componentes/BotaoVoltar';
//Utilizada para auxiliar no controle de outras funcoes da aplicacao
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../axios/configuracaoAxios';


function Cadastro() { 

    //cria novo estado para os campos da tela
    const [campos, setCampos] = useState({
        Nome: '',
        Email: '',
        Senha: '',
        Confirmarsenha:''
    });

    const [mensagem, setMensagem] = useState('');

    const [erros, setErros] = useState({});

    function handleInputChange(event) {
        const { name, value } = event.target;
        setCampos(prevCampos => ({
            ...prevCampos,
            [name]: value
        }));

        setErros(prevErros => ({
            ...prevErros,
            [name]: ''
        }));
    }

    function validarCampos() {
        const novosErros = {};

        if (!campos.Nome) {
            novosErros.Nome = 'Nome é obrigatório';
        }

        if (!campos.Email) {
            novosErros.Email = 'E-mail é obrigatório';
        }

        if (!campos.Senha) {
            novosErros.Senha = 'Senha é obrigatório';
        }

        if (!campos.Confirmarsenha) {
            novosErros.Confirmarsenha = 'Confirmar Senha é obrigatório';
        }else if (campos.Confirmarsenha!==campos.Senha) {
            novosErros.Senha = 'Senha e Confirmar Senha devem ser iguais!';
        }

        setErros(novosErros);

        return Object.keys(novosErros).length === 0;
    }


    function validaConfirmacaoSenha(){
        const novosErros = {};
        if (!campos.Confirmarsenha) {
            novosErros.Confirmarsenha = 'Confirmar Senha é obrigatório';
        }else if (campos.Confirmarsenha!==campos.Senha) {
            novosErros.Confirmarsenha = 'Senha e Confirmar Senha devem ser iguais!';
        }
        setErros(novosErros);
    }

    function handleFormSubmit(event) {

        event.preventDefault();

        if (!validarCampos()) {
            return;
        }

        console.log('Submetendo:', campos);

        axiosInstance.post('/CadastrarUsuario', campos)
            .then(response => {
                setMensagem('Formulário enviado com sucesso!');
                console.log(response.data);

                // Limpar os campos do formulário após o envio
                setCampos({
                   Nome: '',
                   Email: '',
                   Senha: '',
                   Confirmarsenha:''
                });

                // Limpar mensagem após 3 segundos
                setTimeout(() => {
                    setMensagem('');
                }, 3000);
            })
            .catch(error => {
                console.error('Houve um erro ao enviar o formulário:', error);
                setMensagem('Erro ao enviar o formulário. Tente novamente.');
            });
    }

    return (
        <div className="App">
            <Header title="Formulario de Cadastro de Usuarios de Musicas" />

            <div className="form-container">
                <form onSubmit={handleFormSubmit}>
                    <fieldset>
                        <legend>
                            <h2>Cadastro de Usuarios de Musicas</h2>
                        </legend>

                        <div className="inline-fields">
                            <div className="field-maior">
                                <label>Nome:
                                    <input type="text" name="Nome" id="Nome" value={campos.Nome} onChange={handleInputChange} />
                                    {erros.Nome && <p className="error">{erros.Nome}</p>}
                                </label>
                            </div>
                        </div>
                        
                        <div className="inline-fields">
                            <div className="field-maior">
                                <label>E-mail:
                                    <input type="text" name="Email" id="NomEmaile" value={campos.Email} onChange={handleInputChange} />
                                    {erros.Email && <p className="error">{erros.Email}</p>}
                                </label>
                            </div>

                            <div className="field-menor">
                                <label>Senha:
                                    <input type="password" name="Senha" id="Senha" value={campos.Senha} onChange={handleInputChange} />
                                    {erros.Senha && <p className="error">{erros.Senha}</p>}
                                </label>
                            </div>

                            <div className="field-menor">
                                <label>Confirmar Senha:
                                    <input type="password" name="Confirmarsenha" id="Confirmarsenha" value={campos.Confirmarsenha} onChange={handleInputChange} onBlur={validaConfirmacaoSenha}/>
                                    {erros.Confirmarsenha && <p className="error">{erros.Confirmarsenha}</p>}
                                </label>
                            </div>
                        </div>

                        <input type="submit" value="Salvar" />
                    </fieldset>
                </form>
                {mensagem && <p>{mensagem}</p>}
                <BotaoVoltar></BotaoVoltar>
            </div>
        </div>
    )
}

export default Cadastro;