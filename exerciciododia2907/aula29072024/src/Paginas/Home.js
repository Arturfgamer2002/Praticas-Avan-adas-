import logo from '../logo.svg';
import '../App.css';

import Header from '../Header';
import Footer from '../Footer';
import {Link} from 'react-router-dom';
function Home() {
  return (
    <div className="App">
      {/*Importamos o componente Header criado*/}
      <Header/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to="/Cadastro">Acwssar cadastro</Link>
      </header>
      {/*Importamos o componente Footer criado como HTML*/}
      <Footer/>
    </div>
  );
}

export default Home;
