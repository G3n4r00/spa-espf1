import { Link, useLocation } from "react-router-dom";
import "./Cabecalho.scss"


export default function Cabecalho() {

  //Use location sabe a rota que voce está no momento 
  const rotaAtual = useLocation();
  //Vamos comparar um coisa com a aoutra e vamos usar a classe do css para mudar a cor do link atual 
    return (
      <>
        <header className="Cabecalho">
          <nav>
            <ul>
              <li><Link to="/login" className={rotaAtual.pathname == "/login" ? "active" : ""}>Login</Link> </li>
              <li><Link to="/" className={rotaAtual.pathname == "/" ? "active" : ""}>Home</Link> </li>
              <li><Link to="/produtos" className={rotaAtual.pathname == "/produtos" ? "active" : ""}>Produtos</Link> </li>
            </ul>
          </nav>
        </header>
      </>
    );
  }
  