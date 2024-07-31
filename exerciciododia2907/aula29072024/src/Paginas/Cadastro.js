import Header from "../Header";
import "../App.css";
import BotaoVoltar from "../BotaoVoltar";
import axios from "axios";

//Utilizar para auxiliar no controle de outras funcoes da aplicaçao
import { useState } from "react";

//Criar função cadastro
function Cadastro() {
    //Criar novo estado para os campos da tela
    const [campos, setCampos] = useState({
        nome: '',
        idade: 0,
        cidade:''
    });
    
    const [mensagem, setMensagem] = useState('');

    function hadleInputChange(event) {
        campos[event.target.name] = event.target.value;
        setCampos(campos);
    };

    function hadleFormSubmit(event){
        event.preventDefault();
        console.log(campos);
        axios.post('http://localhost3001/api/usuarios', campos).then(response => {
            setMensagem('Formulário enviado com sucesso!');
        })
        //Mostrar mensagem de confirmacao
        setMensagem('Formulário enviado com sucesso!');

        //Limpar mensagem após 3 segundos
        setTimeout(() => {
            setMensagem('');
        }, 3000);
    }

    return(
        <div className="App">
           <Header title="Formula de Cadastro"/>
            
            <form onSubmit={hadleFormSubmit}>
                <fieldset>
                    <legend>
                        <h2>Dados de Cadastro</h2>
                    </legend>

                    <div>
                        <label>Nome:
                            <input type="text" name="nome" id="nome" onSubmit={hadleInputChange}/>
                        </label>
                    </div>

                    <div>
                        <label>Idade:
                            <input type="number" name="idade" id="idade" onSubmit={hadleInputChange}/>
                        </label>
                    </div>

                    <div>
                        <label>Cidade:
                            <input type="text" name="cidade" id="cidade" onSubmit={hadleInputChange}/>
                        </label>
                    </div>
                    
                    <import type="submit" value="Salvar"/>
                </fieldset>
            </form>
            
            <BotaoVoltar></BotaoVoltar>

        </div>
    );
}

export default Cadastro;