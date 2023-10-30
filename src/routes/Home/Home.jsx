import './Home.scss';

export default function Home() {
  return (
    <div className="home-container">
      <div className="banner">
        <h1>Bem-vindo à nossa Página Inicial!</h1>
      </div>
      <div className="content">
        <p>Conteúdo da Página</p>        
      </div>
      <button className="action-button">Saiba Mais</button>
    </div>
  );
}
