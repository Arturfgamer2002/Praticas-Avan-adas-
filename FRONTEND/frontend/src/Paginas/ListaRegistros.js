import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios/configuracaoAxios';
import BotaoVoltar from '../componentes/BotaoVoltar';
import { Link } from 'react-router-dom';
//Importar o modal
import Modal from '../componentes/Modal';
import '../App.css';
// Importando o ícone de edicao
import { FaEdit,FaTrash  } from 'react-icons/fa'; 

 
function ListaRegistros() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    axiosInstance.get('/Artistas')
      .then(response => {
        setRegistros(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Houve um problema ao buscar os registros.');
        setLoading(false);
      });
  }, []);


  const handleDelete = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };


  const confirmDelete = () => {
    axiosInstance.delete(`/excluirArtista/${selectedId}`)
      .then(response => {
        setRegistros(registros.filter(registro => registro.id !== selectedId));
        setMensagem('Registro deletado com sucesso!');
        setShowModal(false);
      })
      .catch(error => {
        setError('Houve um problema ao deletar o registro.');
        setShowModal(false);
      });

        // Limpar mensagem após 3 segundos
        setTimeout(() => {
          setMensagem('');
      }, 3000);

  };


  const closeModal = () => {
    setShowModal(false);
    setSelectedId(null);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="lista-registros">
      <h2>Lista de Registros de Musicas</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Artista</th>
            <th>Genero</th>
            <th>Album</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {registros.map(registro => (
            <tr key={registro.id}>
              <td>{registro.Nome}</td>
              <td>{registro.Artista}</td>
              <td>{registro.Genero}</td>
              <td>{registro.Album}</td>
              <td class="action-column">
                <Link to={`/editar/${registro.id}`} className="espaco_coluna">
                   <FaEdit/> Editar  {/* Ícone de edição */}
                </Link>
                
                <Link onClick={() => handleDelete(registro.id)} >
                  <FaTrash /> Deletar {/* Ícone de delete */}
                </Link>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {mensagem && <p>{mensagem}</p>}
      <BotaoVoltar/>
      <Modal
        show={showModal}
        handleClose={closeModal}
        handleConfirm={confirmDelete}
        title="Confirmar Exclusão"
      >
        Tem certeza que deseja deletar este registro?
      </Modal>
    </div>
  );
}

export default ListaRegistros;