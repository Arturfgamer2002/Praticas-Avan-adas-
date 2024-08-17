import '../App.css';
//Importa o componente Header
import Header from '../Header';
//Importa o componente Header
import Footer from '../Footer';
//Importa o recurso para criar link do react
import {Link} from 'react-router-dom';


function Home() {
  return (
    <div className="App">
      {/* Importamos o componente Header criado como HTML */}
      <Header title="Projeto de Cadastro de Musicas" />

      <header className="App-header">

        <p>Musicas</p>

        <Link to="/cadastro">Cadastro de Usuarios de Musicas</Link>
        <Link to="/cadastromusica">Cadastro de Generos de Musicas</Link>
        <Link to="/lista">Listagem de Cadastro de Musicas</Link>
      </header>

       {/* Importamos o componente Footer  criado como HTML */}
      <Footer/>

    </div>
  );
}

export default Home;