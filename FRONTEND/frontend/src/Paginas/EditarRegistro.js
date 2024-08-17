import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../axios/configuracaoAxios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Header';
import BotaoVoltar from '../componentes/BotaoVoltar';

function EditarRegistro() {
 
  const { id } = useParams();
  const navigate = useNavigate();

  //cria novo estado para os campos da tela
  const [campos, setCampos] = useState({
        Nome: '',
        Artista: '', 
        Genero: '', 
        Album: ''
  });

  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState('');

  const [erros, setErros] = useState({});

  useEffect(() => {
    axiosInstance.get(`/buscarId/${id}`)
      .then(response => {
        setCampos(response.data);
        setLoading(false);
      })
      .catch(error => {
        setMensagem('Houve um problema ao buscar o registro.');
        setLoading(false);
      });
  }, [id]);

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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('atualizarArtista',{id});
    if (!validarCampos()) {
      return;
    }
    
    axiosInstance.put(`/atualizarArtista/${id}`, campos)
      .then(response => {
        setMensagem('Dados editados com sucesso!');

        // Limpar mensagem após 3 segundos
        setTimeout(() => {
          setMensagem('');
          navigate(-1);
        }, 3000);


      })
      .catch(error => {
        setMensagem('Houve um problema ao atualizar o registro.');
      });
  };

  if (loading) {
    return <p>Carregando...</p>;
  }
  
  return (
    <div className="App">
      <Header title="Editar Cadastro" />

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>
              <h2>Cadastro de Musicas</h2>
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

            <input type="submit" value="Salvar" />
          </fieldset>
        </form>
        {mensagem && <p>{mensagem}</p>}
        <BotaoVoltar></BotaoVoltar>
      </div>
    </div>
  );
}

export default EditarRegistro;