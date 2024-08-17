import Header from '../Header';
import '../App.css';
import BotaoVoltar from '../componentes/BotaoVoltar';
//Utilizada para auxiliar no controle de outras funcoes da aplicacao
import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios/configuracaoAxios';

 
function Cadastrodemusica() {

//criar o estado do arquivo selecionado  
const [arquivoSelecionado, setArquivoSelecionado] = useState(null);

//cria o estada da funcao de previsuar
const [preVisualizacao, setPreVisualizacao] = useState(null);

//cria o estado do progresso do upload
const [uploadProgress, setProgressoUpload] = useState(0);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  setArquivoSelecionado(file);
  setPreVisualizacao(URL.createObjectURL(file));
}

    //cria novo estado para os campos da tela
    const [campos, setCampos] = useState({
        Nome: '',
        Artista: '', 
        Genero: '', 
        Album: ''
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
            novosErros.nome = 'Nome é obrigatório'; 
        }

        if (!campos.Artista) {
            novosErros.Artista = 'Artista de musica é obrigatório';
        }

        if (!campos.Genero) {
            novosErros.Genero = 'Genero de musica é obrigatório';
        }
        
        if (!campos.Album) {
            novosErros.Album = 'Album de musica é obrigatório';
        }

        setErros(novosErros);

        return Object.keys(novosErros).length === 0;
    }

    function handleFormSubmit(event) {

        event.preventDefault();
  
        const formData = new FormData();
        formData.append('image', arquivoSelecionado);
    
        try {
          const response = axiosInstance.post('/uploadarquivo', formData, {         
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setProgressoUpload(progress);
            },
          });
          console.log('Upload sucesso:', response.data);
        } catch (error) {
          console.error('Error no uploading:', error);
        }

        if (!validarCampos()) {
            return;
        }

        console.log('Submetendo:', campos);

        axiosInstance.post('/inserirArtistas', campos)
            .then(response => {
                setMensagem('Formulário enviado com sucesso!');
                console.log(response.data);

                // Limpar os campos do formulário após o envio
                setCampos({
                    Nome: '',
                    Artista: '', 
                    Genero: '', 
                    Album: ''
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
            <Header title="Formulario de Generos de Musicas" />

            <div className="form-container">
                <form onSubmit={handleFormSubmit}>
                    <fieldset>
                        <legend>
                            <h2>Cadastro de Generos de Musicas</h2>
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
                                <label>Artista:
                                    <input type="text" name="Artista" id="Artista" value={campos.Artista} onChange={handleInputChange} />
                                    {erros.Artista && <p className="error">{erros.Artista}</p>}
                                </label>
                            </div>

                            <div className="field-menor">
                                <label>Genero:
                                <input type="text" name="Genero" id="Genero" value={campos.Genero} onChange={handleInputChange} />
                                    {erros.Genero && <p className="error">{erros.Genero}</p>}
                                </label>
                            </div>
                        </div>
                        
                        <div className="field-menor">
                                <label>Album:
                                    <input type="text" name="Album" id="Album" value={campos.Album} onChange={handleInputChange} />
                                    {erros.Album && <p className="error">{erros.Album}</p>}
                                </label>
                            </div>

                            <div className="form-container">
      <h3>Upload de arquivos</h3>
      <label>
        <input type="file" onChange={handleFileChange} />
        {preVisualizacao && <img src={preVisualizacao} alt="preVisualizacao" style={{ width: '100px' }} className="preview-image"/>}
        </label>
    
      {uploadProgress > 0 && (
        <div className="upload-progress">
          <h3>Progresso do Upload</h3>
          <progress value={uploadProgress} max="50" />
          <span>{uploadProgress}%</span>
        </div>
      )}
      
         <div>
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

export default Cadastrodemusica;