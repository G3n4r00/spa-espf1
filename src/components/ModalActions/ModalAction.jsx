import { useState } from "react";
import "./ModalAction.scss";  
import { useParams } from "react-router-dom";

export default function ModalAction(props) {
  // Obtendo o parâmetro "id" da URL usando o hook useParams do React Router
  const { id } = useParams();

  // Inicializando o estado local "produto" com useState para controlar os campos do formulário
  const [produto, setProduto] = useState({
      nome: "",
      desc: "",
      preco: "",
  });

  // Função para lidar com as mudanças nos campos de input
  const handleChange = (e) => {
      // Destructuring para obter name e value do campo de input
      const { name, value } = e.target;

      // Atualizando o estado do "produto" com os novos valores do campo de input
      setProduto({ ...produto, [name]: value });
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
      e.preventDefault();

      // Enviando uma requisição POST para o servidor com os dados do produto
      fetch(`http://localhost:5000/produtos/${id ? id : ""}`, {
          method: "POST",  // Método da requisição
          headers: {
              "Content-Type": "application/json",  // Tipo de conteúdo da requisição (JSON)
          },
          body: JSON.stringify(produto),  // Convertendo o objeto "produto" em JSON para o corpo da requisição
      })
      .then((response) => {
          if (response.status === 201) {
              console.log("Produto adicionado com sucesso!");  // Se o produto foi adicionado com sucesso
              props.setOpen(false);  // Fechando o modal
          } else {
              console.log("Erro ao adicionar o produto. Status: " + response.status);  // Se ocorreu um erro ao adicionar o produto
          }
      })
      .catch((error) => console.log(error));  // Lidando com erros de requisição

  };

    // Renderizando o modal apenas se "props.open" for verdadeiro
    if (props.open) {
        return ( 
          <div className= "modal">
            <h1>NOVO PRODUTO</h1>
            <div>
              <form onSubmit={handleSubmit}>
                <fieldset>
                  <legend>Dados do Produto</legend>
                  {/* Campo de input para o nome do produto */}
                  <div>
                    <label htmlFor="idNome">Nome</label>
                    <input
                      type="text"
                      name="nome"
                      id="idNome"
                      value={produto.nome}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Campo de input para a descrição do produto */}
                  <div>
                    <label htmlFor="idDesc">Descrição</label>
                    <input
                      type="text"
                      name="desc"
                      id="idDesc"
                      value={produto.desc}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Campo de input para o preço do produto */}
                  <div>
                    <label htmlFor="idPreco">Preço</label>
                    <input
                      type="number"
                      name="preco"
                      id="idPreco"
                      value={produto.preco}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Botões para fechar o modal e confirmar a adição ou edição do produto */}
                  <div className="botoes">
                    <button className="btnVoltar" onClick={() => props.setOpen(false)}>Voltar</button>
                    <button className="btnConfirmar">{id ? "EDITAR" : "Cadastrar"}</button>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        );
      }
}
